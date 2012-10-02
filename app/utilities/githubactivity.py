'''
Created on Oct 1, 2012

@author: Sagar
'''
import json
from mainhandler import Handler
from app.utilities.utils import setUser, getFollowers, getFollowing, getWatchedRepos 

class GithubActivity(Handler):
    def get(self):
        activity = {}
        entries = []
        user = setUser("<username>", "<password>")
        entries = entries + getFollowers(user)
        entries = entries + getFollowing(user)
        entries = entries + getWatchedRepos(user)
        activity['activities'] = entries
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(activity))
