"""Loopback-only preview overlay. Production source is read-only and unchanged."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote
import argparse
import mimetypes
from build_pdrn_design_preview import ROOT, OUT, PAGE, sanitize


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.respond(False)

    def do_HEAD(self):
        self.respond(True)

    def respond(self, head):
        route = unquote(urlsplit(self.path).path)
        if route == '/': route = '/review.html'
        if route in ['/review.html','/before.html','/'+PAGE]:
            path = OUT / route.lstrip('/')
        else:
            path = (ROOT / route.lstrip('/')).resolve()
            allowed = path.is_relative_to(ROOT) and (path.parent == ROOT and path.suffix == '.html' or any(path.is_relative_to(ROOT/d) for d in ['assets','images','videos','partials']))
            if not allowed or route == '/sw.js':
                self.send_error(404); return
        if route == '/assets/analytics.js':
            data = b'/* Analytics disabled in this local preview. */'
            mime = 'text/javascript'
        elif not path.is_file():
            self.send_error(404); return
        else:
            data = path.read_bytes()
            mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
            if path.suffix == '.html' and path.parent == ROOT:
                data = sanitize(data.decode('utf-8'),'Unchanged reference').encode('utf-8')
            if route == '/assets/site.js':
                # Keep navigation/search behavior; omit only the analytics-loader prefix.
                script = data.decode('utf-8').split('/* ===== Partials inject ===== */',1)[1]
                old = 'id:"pdrn-12-egf", name:"PDRN 12% + EGF Peptide Serum", subtitle:"Total Anti-aging"'
                new = 'id:"pdrn-12-egf", name:"PDRN 12% + EGF Peptide Serum", subtitle:"Face serum · Before moisturizer · 30 ml"'
                assert script.count(old) == 1, 'Search catalog source changed; review preview mapping.'
                data = script.replace(old,new).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type',mime+('; charset=utf-8' if mime.startswith('text/') else ''))
        self.send_header('Content-Length',str(len(data)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Robots-Tag','noindex, nofollow')
        self.send_header('Content-Security-Policy',"connect-src 'self'; worker-src 'none'; object-src 'none'; frame-ancestors 'self'")
        self.end_headers()
        if not head: self.wfile.write(data)


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--port',type=int,default=8027)
    args=parser.parse_args()
    print(f'PDRN preview: http://127.0.0.1:{args.port}/review.html',flush=True)
    ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
