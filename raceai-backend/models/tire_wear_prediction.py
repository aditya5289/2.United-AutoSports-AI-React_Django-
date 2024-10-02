from pytube import Playlist
import re


# Function to sanitize filenames
def sanitize_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "_", name)


# Function to download YouTube playlist with prefixed filenames in 720p HD
def download_playlist_with_prefix(playlist_url, download_path, prefix):
    # Create a Playlist object
    playlist = Playlist(playlist_url)

    # Display playlist title
    print(f'Downloading playlist: {playlist.title}')

    # Loop through all videos in the playlist
    for index, video in enumerate(playlist.videos):
        # Clean up the video title
        clean_title = sanitize_filename(video.title)

        # Define the new filename with sequential prefix
        video_title = f"{prefix}{index:03d}_{clean_title}"
        print(f'Downloading video: {video_title}')

        # Get the 720p stream
        stream = video.streams.filter(res="720p").first()

        if stream:
            # Download the video and rename it
            stream.download(output_path=download_path, filename=video_title)
        else:
            print(f'720p stream not available for {video_title}')

    print('Download complete.')


# Specify the URL of the YouTube playlist
playlist_url = 'https://www.youtube.com/watch?v=YpsFT50mths&list=PLd3UqWTnYXOlc93disyBjyFv-r1Vq-5zh&index=1&ab_channel=DurgaSoftwareSolutions'

# Specify the download path
download_path = r'F:\Naveen Spring Framework'

# Specify the prefix
prefix = ''

# Call the function to download the playlist with prefixed filenames
download_playlist_with_prefix(playlist_url, download_path, prefix)
