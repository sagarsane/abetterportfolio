from google.appengine.api import urlfetch
import json

def get_gist_data(gist_id, gist_filename):
    gist_data = urlfetch.fetch("https://raw.github.com/gist/" + gist_id + "/" + gist_filename + ".json").content
    gist_data = json.loads(gist_data)                 
    return gist_data