#!/usr/bin/env python3

import os
import urllib.parse
from time import sleep

from spotify_api_client import SpotifyApiClient
from youtube_data_api_client import YoutubeDataApiClient

SPOTIFY_USERNAME = os.environ['SPOTIPY_USERNAME']
SPOTIFY_CLIENT_ID = os.environ['SPOTIPY_CLIENT_ID']
SPOTIFY_CLIENT_SECRET = os.environ['SPOTIPY_CLIENT_SECRET']
SPOTIFY_REDIRECT_URI = os.environ['SPOTIPY_REDIRECT_URI']
SPOTIFY_API_CLIENT_SCOPE = 'user-read-currently-playing'

YOUTUBE_DATA_API_CLIENT_SCOPES = [
    'https://www.googleapis.com/auth/youtube.force-ssl']
YOUTUBE_DATA_CLIENT_SECRETS_FILE = "client_secrets.json"

WAIT_SEC = 60


def main():
    spotify = SpotifyApiClient(
        SPOTIFY_USERNAME,
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REDIRECT_URI,
        SPOTIFY_API_CLIENT_SCOPE)

    youtube = YoutubeDataApiClient(
        YOUTUBE_DATA_CLIENT_SECRETS_FILE,
        YOUTUBE_DATA_API_CLIENT_SCOPES)

    url = input('YouTube Live URL: ')
    live_id = urllib.parse.urlparse(url).path[1:]
    live_chat_id = youtube.get_live_chat_id(live_id)
    prev_track = None

    try:
        while True:
            track = spotify.get_now_playing_track()
            if track is not None and track != prev_track:
                message = '♪ {} / {} #nowplaying'.format(
                    track['title'], track['singer'])
                youtube.send_message_to_live_chat(live_chat_id, message)

                print(message)
                prev_track = track

            sleep(WAIT_SEC)
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
