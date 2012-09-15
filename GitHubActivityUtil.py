'''
Created on Sep 14, 2012

@author: Sagar
'''
from github import Github

def setUser(user="", password=""):
    return Github(user, password).get_user()

def getFollowers(user):
    followers = []
    for f in user.get_followers():
        ret = {}
        ret['type'] = "Followers"
        ret['name'] = f.login
        ret['url'] = "https://github.com/" + f.login #f.url
        followers.append(ret)
    return followers

def getFollowing(user):
    following = []
    for f in user.get_following():
        ret = {}
        ret['type'] = "Following"
        ret['name'] = f.login
        ret['url'] = "https://github.com/" + f.login #f.url
        following.append(ret)
    return following

def getWatchedRepos(user):
    watched = []
    for w in user.get_watched():
        ret = {}
        ret['type'] = "Watched"
        ret['name'] = w.name #+ " - " + w.description
        ret['url'] = w.html_url
        watched.append(ret)
    return watched