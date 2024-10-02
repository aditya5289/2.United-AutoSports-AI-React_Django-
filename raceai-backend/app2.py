import os
from pytube import YouTube
import re

# Function to sanitize filenames
def sanitize_filename(filename):
    return re.sub(r'[\\/*?:"<>|]', "", filename)

# Function to download a single video in 720p
def download_video(video_url, download_path):
    try:
        yt = YouTube(video_url)
        stream = yt.streams.filter(res="720p", file_extension='mp4').first()
        if stream:
            video_title = yt.title
            sanitized_title = sanitize_filename(video_title)
            filename = f"{sanitized_title}.mp4"
            stream.download(output_path=download_path, filename=filename)
            print(f"Downloaded: {filename}")
            return True
        else:
            print(f"720p stream not available for {yt.title}. Skipping...")
            return False
    except Exception as e:
        print(f"Error downloading {video_url}: {e}")
        return False

if __name__ == "__main__":
    # URL of the video
    video_url = "https://www.youtube.com/watch?v=ei6fK9StzMM&t=2s"  # Replace with your video URL
    # Path to download the video
    download_path = r"F:\Durgesh Complete Course\4.Apache Kafka"  # Replace with your desired download path

    # Start downloading the video
    download_video(video_url, download_path)
