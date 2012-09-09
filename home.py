import webapp2
import os
import jinja2
import json
from projects import get_project_data
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
        experience = {
                      "Bank of America" : ["Technology Associate", "June 2012 - Current", " Java Servlets/AJAX/jQuery/MetaData"],
                      "I-Cubed" : ["Software Programmer (Part-time)", "August 2011 - May 2012", " JS/jQuery/Sencha Touch/Web Scraping/Adobe CQ5 CMS"],
                      "Bank of America" : ["Technology Analyst Intern", "June 2011 - August 2012", " Very Large DB Management/Windows Java Services/SQL/Batch Scripting"],
                      "NCSU: College of Design" : ["Software Programmer (Part-time)", "February 2011 - May 2011", "PHP/MySQL/Actionscript/Javascript"],
                      "NCSU: BTEC" : ["Volunteer Web Developer", "December 2010 - March 2011", "LAMP Stack"]
                      }
        
        self.write(json.dumps(experience))
        
class Education(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        education = {
                     "North Carolina State University" : ["Masters in Computer Networking - CS", "GPA: 3.63/4.00"],
                     "Pune Institute of Computer Technology" : ["Bachelors in Information Technology", "GPA: 3.89/4.00"]
                     }
        self.write(json.dumps(education))

class Projects(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        projects = {
                    "Diverse Routing Algorithms (2012)" : "C, Networking",
                    "Reliable Multicast System (2012)" : "C, Networking",
                    "Web Based Mashup (2011)" : "HTML5, JS/AJAX/jQuery, PHP, Open APIs",
                    "Integrity Attestation for Web Services Framework (2011)" : "C, Java, Distributed Systems",
                    "Collaborative Drawing Android App (2011)" : "Android/Java",
                    "OS Projects (2010)" : "C, OS",
                    "Web Based Dashboard for Security Assessment (2009 - 2010)" : "PHP, MySQL, Flex, HTML, XML"  
                    }
        self.write(json.dumps(projects))

class Project_data(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(get_project_data()))

class TestPage(Handler):
    def get(self):
        self.render_front("onePageTest.html")
        
app = webapp2.WSGIApplication([('/', MainPage),
                               ('/home', MainPage), 
                               ('/test_home', TestPage),                               
                               ('/projects', Projects), 
                               ('/experience', Experience),
                               ('/education', Education),
                               ('/project_data', Project_data)], debug=True)