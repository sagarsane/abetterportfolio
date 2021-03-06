from google.appengine.api import urlfetch
import json

from github import Github

def setUser(user="", password=""):
    return Github(user, password).get_user()

def getFollowers(user):
    followers = []
    for f in user.get_followers():
        ret = {}
        ret['type'] = "Followers"
        namedUser = Github().get_user(f.login)
        if namedUser.name: 
            ret['name'] = namedUser.name + " - (" + f.login + ")"
        else:
            ret['name'] = f.login
        ret['url'] = "https://github.com/" + f.login
        followers.append(ret)
    return followers

def getFollowing(user):
    following = []
    for f in user.get_following():
        ret = {}
        ret['type'] = "Following"
        namedUser = Github().get_user(f.login)
        if namedUser.name: 
            ret['name'] = namedUser.name + " - (" + f.login + ")"
        else:
            ret['name'] = f.login
        ret['url'] = "https://github.com/" + f.login
        following.append(ret)
    return following

def getWatchedRepos(user):
    watched = []
    for w in user.get_watched():
        ret = {}
        ret['type'] = "Watched"
        ret['name'] = w.name + " - " + w.description
        ret['url'] = w.html_url
        watched.append(ret)
    return watched

def get_gist_data(gist_id, gist_filename):
    gist_data = urlfetch.fetch("https://gist.github.com/sagarsane/" + gist_id + "/raw/" + gist_filename + ".json").content
    gist_data = json.loads(gist_data)                 
    return gist_data