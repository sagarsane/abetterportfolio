'''
Created on Sep 18, 2012

@author: Sagar

'''

import pprint
from oauth2client.client import AccessTokenRefreshError
from apiclient.errors import HttpError

def runSyncQuery (service, projectId, datasetId, query,timeout=5000):
    try:
        print 'timeout:%d' % timeout
        jobCollection = service.jobs()
        queryData = {'query':query,
                'timeoutMs':timeout}

        queryReply = jobCollection.query(projectId=projectId,
                                     body=queryData).execute()

        jobReference=queryReply['jobReference']
        while(not queryReply['jobComplete']):
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
    #decoratod_http = decorator.http()
    tableDataJob = service.tabledata()
    try:
        queryReply = tableDataJob.list(projectId=project,
                                   datasetId=dataset,
                                   tableId=table,
                                   startIndex=startIndex).execute()
        return queryReply
    except HttpError as err:
        print 'Error in querytableData: ', pprint.pprint(err.content)


def execute_bigquery_githubarchive(service):
    query = """SELECT type, actor_attributes_login, payload_action, payload_pull_request_title, repository_name, repository_url, repository_description, repository_language, url, created_at as date
                FROM [githubarchive:github.timeline]
                WHERE (type="PullRequestReviewCommentEvent" OR type="IssuesEvent" OR type="IssueCommentEvent" OR type="PullRequestEvent") AND repository_owner!="sagarsane"
                AND actor_attributes_login="sagarsane"
                AND PARSE_UTC_USEC(created_at) >= PARSE_UTC_USEC('2012-07-01 00:00:00')
                GROUP BY type, actor_attributes_login, payload_action, payload_pull_request_title, repository_url, repository_description, repository_name, repository_language,  url, date 
                ORDER BY date DESC LIMIT 100;"""
    return queryTableData(service, '<project_client_id>', 'test', 'github_query_result', startIndex=0)
    #return runSyncQuery(service, '<project_client_id>','test',query)