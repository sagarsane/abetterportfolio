import webapp2
import os
import jinja2
from projects import projects_function
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

class Projects(Handler):
    def get(self):
        self.render_front(projects_function())

app = webapp2.WSGIApplication([('/home', MainPage), ('/projects', Projects)], debug=True)