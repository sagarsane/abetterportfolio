'''
Created on Sep 18, 2012

@author: Sagar
'''
import httplib2
import pprint
from apiclient.discovery import build
from oauth2client.file import Storage
from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.tools import run
from apiclient.errors import HttpError

FLOW = OAuth2WebServerFlow(
    client_id='XXX.apps.googleusercontent.com',
    client_secret='shhhhhhhhhhhh',
    scope='https://www.googleapis.com/auth/bigquery',
    user_agent='bigquery_test/1.0')

def runSyncQuery (service, projectId, datasetId, timeout=0):
    try:
        print 'timeout:%d' % timeout
        jobCollection = service.jobs()
        queryData = {'query':"""SELECT type, actor_attributes_login, payload_action, payload_pull_request_title, repository_name, repository_url, repository_description, repository_language, url, created_at as date
                FROM [githubarchive:github.timeline]
                WHERE (type="PullRequestReviewCommentEvent" OR type="IssuesEvent" OR type="IssueCommentEvent" OR type="PullRequestEvent") AND repository_owner!="sagarsane"
                AND actor_attributes_login="sagarsane"
                AND PARSE_UTC_USEC(created_at) >= PARSE_UTC_USEC('2012-07-01 00:00:00')
                GROUP BY type, actor_attributes_login, payload_action, payload_pull_request_title, repository_url, repository_description, repository_name, repository_language,  url, date 
                ORDER BY date DESC LIMIT 100;""",
                'timeoutMs':timeout}

        queryReply = jobCollection.query(projectId=projectId,
                                     body=queryData).execute()

        jobReference=queryReply['jobReference']
        # Timeout exceeded: keep polling until the job is complete.
        while(not queryReply['jobComplete']):
            #print 'Job not yet complete...'
            queryReply = jobCollection.getQueryResults(
                          projectId=jobReference['projectId'],
                          jobId=jobReference['jobId'],
                          timeoutMs=timeout).execute()   
        return queryReply

    except AccessTokenRefreshError:
        print ("The credentials have been revoked or expired, please re-run"
               "the application to re-authorize")

    except HttpError as err:
        print 'Error in runSyncQuery:', pprint.pprint(err.content)

    except Exception as err:
        print 'Undefined error' % err

def queryTableData(service, project, dataset, table, startIndex=0):
    tableDataJob = service.tabledata()
    try:
        queryReply = tableDataJob.list(projectId=project,
                                   datasetId=dataset,
                                   tableId=table,
                                   startIndex=startIndex).execute()
        return queryReply
    except HttpError as err:
        print 'Error in querytableData: ', pprint.pprint(err.content)


def execute_bigquery_githubarchive():
    storage = Storage('bigquery2.dat') # Choose a file name to store the credentials.
    credentials = storage.get()
    if credentials is None or credentials.invalid:
        credentials = run(FLOW, storage)
    http = httplib2.Http()
    http = credentials.authorize(http)
    service = build("bigquery", "v2", http=http)
    
    return queryTableData(service, 'projectID', 'datasetID', 'tableID', startIndex=0)
    #return runSyncQuery(service, 'projectID','datasetId')