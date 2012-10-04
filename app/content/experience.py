'''
Created on Oct 1, 2012

@author: Sagar
'''
import json
from mainhandler import Handler
from ..utilities.utils import get_gist_data

class Experience(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(get_gist_data('3735396','experience_data')))
