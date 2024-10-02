import os
import time
from pytube import Playlist
from pytube.exceptions import VideoUnavailable

# URL of the YouTube playlist
playlist_url = "https://www.youtube.com/watch?v=QMNYzhN_MDo&list=PLfzBO7vcQZ1J3-Tela6uy5VQo3hb3rAmv"

# Directory to save the videos
save_path = "F:\Bharat Acharaya Complete Collection"

# Create a Playlist object
playlist = Playlist(playlist_url)

# Ensure the save directory exists
if not os.path.exists(save_path):
    os.makedirs(save_path)

# Print the title of the playlist
print(f'Downloading playlist: {playlist.title}')


# Function to check if a video is already downloaded
def is_video_downloaded(prefix, video, save_path):
    video_title = f"{prefix}_{video.title}.mp4"
    return os.path.exists(os.path.join(save_path, video_title))


# Retry logic
def download_video_with_retries(video, prefix, save_path, retries=3):
    for attempt in range(retries):
        try:
            print(f'Downloading video: {prefix}_{video.title} (Attempt {attempt + 1}/{retries})')
            video.streams.get_highest_resolution().download(output_path=save_path,
                                                            filename=f"{prefix}_{video.title}.mp4")
            print(f'Successfully downloaded: {prefix}_{video.title}')
            return True
        except Exception as e:
            print(f'An error occurred: {e}')
            time.sleep(5)  # Wait before retrying
    return False


# Iterate through all the video URLs in the playlist
for index, video in enumerate(playlist.videos):
    try:
        prefix = f"{index:03d}"  # Pads the index to 3 digits (e.g., "000", "001")

        if is_video_downloaded(prefix, video, save_path):
            print(f'Already downloaded: {prefix}_{video.title}')
        else:
            success = download_video_with_retries(video, prefix, save_path)
            if not success:
                print(f'Failed to download: {prefix}_{video.title} after multiple attempts.')
    except VideoUnavailable:
        print(f'Video unavailable: {video.title}')
    except Exception as e:
        print(f'An unexpected error occurred: {e}')

print("Download complete!")
