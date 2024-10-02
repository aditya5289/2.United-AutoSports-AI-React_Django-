import libtorrent as lt
import time
import sys
import os


def download_torrent(magnet_link, save_path):
    ses = lt.session()
    ses.listen_on(6881, 6891)

    params = {
        'save_path': save_path,
        'storage_mode': lt.storage_mode_t(2),
        'paused': False,
        'auto_managed': True,
        'duplicate_is_error': True
    }

    handle = lt.add_magnet_uri(ses, magnet_link, params)
    ses.start_dht()

    print(f'Downloading Metadata... {handle.name()}')

    while not handle.has_metadata():
        time.sleep(1)

    print(f'Downloading: {handle.name()}')

    while handle.status().state != lt.torrent_status.seeding:
        s = handle.status()
        state_str = [
            'queued', 'checking', 'downloading metadata',
            'downloading', 'finished', 'seeding', 'allocating', 'checking fastresume'
        ]
        print(
            f'\r{s.progress * 100:.2f}% complete (down: {s.download_rate / 1000:.1f} kB/s up: {s.upload_rate / 1000:.1f} kB/s peers: {s.num_peers})',
            end=' ')
        sys.stdout.flush()
        time.sleep(1)

    print('\nDownload complete!')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python download_torrent.py <magnet_link> <save_path>')
        sys.exit(1)

    magnet_link = sys.argv[1]
    save_path = sys.argv[2]

    if not os.path.isdir(save_path):
        print(f'Save path {save_path} not found.')
        sys.exit(1)

    download_torrent(magnet_link, save_path)
