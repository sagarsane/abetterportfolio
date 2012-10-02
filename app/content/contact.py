import json
from mainhandler import Handler
from app.utilities.utils import get_gist_data


class Contact(Handler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(get_gist_data('3785786','contact_data')))
