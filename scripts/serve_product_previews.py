"""Serve the complete 14-product draft overlay on loopback only."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit,unquote
import argparse
import mimetypes
from build_all_product_previews import ROOT,OUT,local_only


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):self.respond(False)
    def do_HEAD(self):self.respond(True)

    def respond(self,head):
        route=unquote(urlsplit(self.path).path)
        if route=='/':route='/review.html'
        overlay=(OUT/route.lstrip('/')).resolve()
        source=(ROOT/route.lstrip('/')).resolve()
        overlay_allowed=overlay.is_relative_to(OUT) and (overlay.parent==OUT and (overlay.suffix=='.html' or overlay.name=='catalog.json') or overlay.parent==OUT/'before' and overlay.suffix=='.html')
        source_allowed=source.is_relative_to(ROOT) and (source.parent==ROOT and source.suffix=='.html' or any(source.is_relative_to(ROOT/f) for f in ['assets','images','videos','partials']))
        if route=='/assets/analytics.js':data=b'/* Analytics disabled in local review. */';mime='text/javascript'
        elif route=='/robots.txt':data=b'User-agent: *\nDisallow: /\n';mime='text/plain'
        elif route=='/assets/site.js':data=(OUT/'site-preview.js').read_bytes();mime='text/javascript'
        else:
            path=overlay if overlay_allowed and overlay.is_file() else source if source_allowed else None
            if path is None or not path.is_file():self.send_error(404);return
            data=path.read_bytes();mime=mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
            if path.parent==ROOT and path.suffix=='.html':data=local_only(data.decode('utf-8'),'Unchanged shared page').encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type',mime+('; charset=utf-8' if mime.startswith('text/') or mime=='application/json' else ''))
        self.send_header('Content-Length',str(len(data)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Robots-Tag','noindex, nofollow')
        self.send_header('Content-Security-Policy',"connect-src 'self'; worker-src 'none'; object-src 'none'; frame-ancestors 'self'")
        self.end_headers()
        if not head:self.wfile.write(data)


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8028);args=parser.parse_args()
    print(f'All product previews: http://127.0.0.1:{args.port}/review.html',flush=True)
    ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
