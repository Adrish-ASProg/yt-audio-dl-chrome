#!/usr/bin/env python

import json
import struct
import sys
import os

# On Windows, the default I/O mode is O_TEXT. Set this to O_BINARY
# to avoid unwanted modifications of the input/output streams.
if sys.platform == "win32":
  import os, msvcrt
  msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
  msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)

def downloadAudio(url):
    command = ("echo You are about to download from this url: {}"
    "^& echo. ^& pause"
    "^& youtube-dl -o ../downloads/%(title)s.%(ext)s --no-playlist --extract-audio --audio-format mp3 {}"
    "^& pause")
    os.system("start cmd /c " + command.format(url, url))
    sys.exit(0)

# Thread that reads messages from the webapp.
def read_thread_func(queue):
  message_number = 0
  while 1:
    # Read the message length (first 4 bytes).
    text_length_bytes = sys.stdin.read(4)

    if len(text_length_bytes) == 0:
      sys.exit(0)

    # Unpack message length as 4 byte integer.
    text_length = struct.unpack('i', text_length_bytes)[0]

    # Read the text (JSON object) of the message.
    text = sys.stdin.read(text_length)
    url = json.loads(text)['text']
    downloadAudio(url)


def Main():
  read_thread_func(None)
  sys.exit(0)

if __name__ == '__main__':
  Main()
