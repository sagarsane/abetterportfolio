'''
Created on Oct 1, 2012

@author: Sagar
'''
import json
from mainhandler import Handler
from app.utilities.utils import get_gist_data

class Education(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json' 
        self.write(json.dumps(get_gist_data('3735401','education_data')))
