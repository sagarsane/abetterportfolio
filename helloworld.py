import webapp2
import os
import jinja2
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
        
class MainPage(Handler):
    def render_front(self):
        self.render("index.html")
        
    def get(self):
        #self.response.headers['Content-Type'] = 'text/plain'
        #self.response.out.write('Hello, webapp World!')
        self.render_front()

app = webapp2.WSGIApplication([('/home', MainPage)], debug=True)


#def main():
#    run_wsgi_app(application)

#if __name__ == "__main__":
#    main()
