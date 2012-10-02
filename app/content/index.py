'''
Created on Oct 1, 2012

@author: Sagar
'''
from mainhandler import Handler

class MainPage(Handler):
    def get(self):
        self.render_front("index.html")