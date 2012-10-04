'''
Created on Oct 1, 2012

@author: Sagar
'''
import json
from mainhandler import Handler
from ..utilities.utils import get_gist_data

class Achievements(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(get_gist_data('3785895','achievements_data')))

