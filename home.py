import webapp2
from mainhandler import Handler
from app.content.index import MainPage
from app.content.experience import Experience
from app.content.education import Education
from app.content.projects import Projects
from app.content.contact import Contact
from app.content.achievements import Achievements
from app.utilities.githubactivity import GithubActivity
from app.utilities.githubarchive import GithubArchiveBigQuery, GithubArchiveHTML

app = webapp2.WSGIApplication([('/home', MainPage),                                
                               ('/projects', Projects), 
                               ('/experience', Experience),
                               ('/education', Education),
                               ('/contact', Contact),
                               ('/achievements', Achievements),
                               ('/github_activity', GithubActivity),
                               ('/github_archive', GithubArchiveHTML),
                               ('/archive_data', GithubArchiveBigQuery)], debug=True)