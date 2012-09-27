'''
Created on Sep 20, 2012

@author: Sagar
'''    
def parser(arch):
    archive = arch
    
    data = {}
    timeline = {}
    timeline['headline'] = "My Open Source Contribution Archive"
    timeline['type'] = "default"
    timeline['text'] = "<p>This is my Github Archive for past 1 Month! (user: <strong>sagarsane</strong>)</p>"
    timeline['asset'] = {
                        "media":"http://www.github.com/sagarsane/abetterportfolio",
                        "credit":"Sagar Sane",
                        "caption":"Part of: A Betterportfolio project"
                         }
    info = []
    era_info = [{
                 "startDate":"",
                 "endDate":"",
                 "headline":"",
                 "tag":"",
                 }]
    chart_info = [{
                 "startDate":"",
                 "endDate":"",
                 "headline":"",
                 "tag":"",
                 }]
    
    

    
    split_start_date = archive.get('rows')[0]['f'][9]['v'].split(' ')
    happened_date1 = ",".join(split_start_date[0].split("-"))
    happened_date = happened_date1 + "," + ",".join(split_start_date[1].split(":"))
    era_info[0]['endDate'] = chart_info[0]['endDate'] = happened_date
    
    lastRow = int(archive.get('totalRows')) - 1
    split_start_date = archive.get('rows')[lastRow]['f'][9]['v'].split(' ')
    happened_date1 = ",".join(split_start_date[0].split("-"))
    happened_date = happened_date1 + "," + ",".join(split_start_date[1].split(":"))
    era_info[0]['startDate'] = chart_info[0]['startDate'] = happened_date
    
    for row in archive.get('rows'):
        an_info = {
               "startDate" : "",
               "endDate" : "",
               "headline" : "",
               "text" : "",
               "tag" : "",
               "asset" : {
                          "media" : "",
                          "thumbnail" : "",
                          "credit" : "",
                          "caption" : ""
                          },
               }
        columns = row['f']
        an_info['startDate'] = an_info['endDate'] = happened_date
        check_link = columns[8]['v'].split("#")
        if len(check_link) > 0:
            an_info['headline'] = "<a href = '" + columns[8]['v'] + "' target='_blank'>" + columns[0]['v'] + "</a>"
        else:
            an_info['headline'] = "<a href = '" + columns[8]['v'] + "' target='_blank'>" + columns[0]['v'] + "</a>"
        an_info['text'] = columns[4]['v']  + "-" + columns[7]['v']
        an_info['tag'] = columns[0]['v']
        an_info['asset']['caption'] = "<a href = '" + columns[8]['v'] + "' target='_blank'></a>"
        an_info['asset']['credit'] = columns[6]['v']
        #+ columns[5]['v'] + " - " + columns[6]['v']
        split_date = columns[9]['v'].split(' ')
        happened_date1 = ",".join(split_date[0].split("-"))
        happened_date = happened_date1 + "," + ",".join(split_date[1].split(":"))
        info.append(an_info)
        
    timeline['date'] = info
    timeline['era'] = era_info
    timeline['chart'] = chart_info
    data['timeline'] = timeline
    return data
