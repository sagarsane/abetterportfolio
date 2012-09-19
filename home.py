import webapp2
import os
import jinja2
import json
from utils import get_gist_data
from GitHubActivityUtil import *
from github_archive_bigquery_handler import *
#import logging
#import urllib2

#from google.appengine.ext.webapp.util import run_wsgi_app
template_dir = os.path.join(os.path.dirname(__file__), 'allhtml')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir), autoescape = True)


class Handler(webapp2.RequestHandler):
    
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

    def render_front(self, template):
        self.render(template)        
        
class MainPage(Handler):
    def get(self):
        self.render_front("index.html")

class Experience(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(get_gist_data('3735396','experience_data')))
        
class Education(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json' 
        self.write(json.dumps(get_gist_data('3735401','education_data')))
        
class Projects(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(get_gist_data('3734919','projects_data')))

class GithubActivity(Handler):
    def get(self):
        activity = {}
        entries = []
        user = setUser("username", "password")
        entries = entries + getFollowers(user)
        entries = entries + getFollowing(user)
        entries = entries + getWatchedRepos(user)
        activity['activities'] = entries
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(activity))
        
class GithubArchiveBigQuery(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'        
        self.write(json.dumps(execute_bigquery_githubarchive()))
        
app = webapp2.WSGIApplication([('/', MainPage),
                               ('/home', MainPage),                                
                               ('/projects', Projects), 
                               ('/experience', Experience),
                               ('/education', Education),
                               ('/github_activity', GithubActivity),
                               ('/github_archive', GithubArchiveBigQuery)], debug=True)