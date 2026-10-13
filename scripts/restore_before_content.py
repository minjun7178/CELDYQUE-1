"""Restore only this content release's production files; dry run by default."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def restore(target, apply=False):
    record = json.loads((ROOT/'docs/before-after-backup.json').read_text(encoding='utf8'))
    target = target.resolve()
    contents = {}
    with zipfile.ZipFile(Path(record['backup_directory'])/'before.zip') as archive:
        for name, hashes in record['files'].items():
            path = (target/name).resolve()
            assert path.is_relative_to(target), 'Unsafe backup path'
            data = archive.read(name)
            assert hashlib.sha256(data).hexdigest() == hashes['before_sha256'], 'Backup integrity failure'
            current = hashlib.sha256(path.read_bytes()).hexdigest()
            assert current in {hashes['before_sha256'], hashes.get('after_sha256')}, 'Later edits detected; refusing to overwrite: '+name
            contents[path] = data
    if apply:
        for path, data in contents.items(): path.write_bytes(data)
    print(('RESTORED' if apply else 'DRY RUN VERIFIED')+': '+str(len(contents))+' files. No commit, push or deployment.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true')
    restore(ROOT, parser.parse_args().apply)
