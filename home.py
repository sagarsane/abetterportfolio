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

class Experience(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.write("<div class='tile-text'><h2>Bank of America</h2><br/><p>Technology Associate</p><p>June 2012 - Current</p></div>" +
                   "<div class='tile-text'><h2>I-Cubed</h2><br/><p>Software Programmer (Part-time)</p><p>August 2011 - May 2012</p></div>" +
                   "<div class='tile-text'><h2>Bank of America</h2><br/><p>Technology Analyst Intern</p><p>June 2011 - August 2012</p></div>")
        
class Education(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.write("<div class='tile-text'><h2>North Carolina State University</h2><br/><p>Masters in Computer Networking - CS</p><p>GPA : 3.63/4.00</p></div>" +
                   "<div class='tile-text'><h2>Pune Institute of Computer Technology</h2><br/><p>Bachelors in Information Technology</p><p>GPA: 3.88/4.00</p></div>")
        
app = webapp2.WSGIApplication([('/home', MainPage), 
                               ('/projects', Projects), 
                               ('/experience', Experience),
                               ('/education', Education)], debug=True)