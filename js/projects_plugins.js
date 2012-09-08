// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.
$(document).ready(function() {
	//$("#no_name_bubble").show();
	var bubbleFlag = 0;
	//$("#name_bubble").toggle('slow');
	var fadeBubble = function(){
		if(bubbleFlag == 1){
			clearInterval(bubbleOnce);
			bubbleFlag = 0;
		}
		else{
			bubbleFlag = 1;
			$("#name_bubble").toggle('slow');
		}
	}
	var bubbleOnce = setInterval(function(){fadeBubble()},4000);
	
	//$("#project_buttons").scrollbar();
	$("#project_details").hide();
	$("#project_repo").hide();
	$("#project_reco").hide();
	$("#project_apis").hide();
	$("#project_name").hide();
	
	function projectDataModel(){
		
		var self = this;
		var project_data;
		var currentSelections;
		//self.checkBox = ko.observable(false);
		self.projects_info = ko.observableArray();
		self.project_categories = ko.observableArray();
		
		//this.projects_info.loading = ko.observable(false);
		
		self.get_projects_info = function(){
			self.project_categories.push({tag: "All Projects"});
			$.getJSON('/project_data', function(data){
				//project_data = data.projects;
				project_data = jQuery.extend(true, {}, data.projects);
				self.projects_info(data.projects);
				var proj_cat = [];
				$.each(data.projects, function(index, entry){
					$.each(entry.category, function(ind, val){
						if(proj_cat.indexOf(val) == -1){
							proj_cat.push(val);
							self.project_categories.push({tag : val});
						}
					})
					
				});
				proj_cat = [];
			});
		}
		
		self.get_projects_info();
		self.checkedSelections = ko.observableArray();
		self.project_about = ko.observableArray();
		self.project_name = ko.observableArray();
		self.getDetails = function(item){
			$("#project_details").hide();
			$("#project_repo").hide();
			$("#project_reco").hide();
			$("#project_apis").hide();
			$("#project_name").hide();
			
			/*****Insert all the detail information **/
			self.project_about(item.about);
			self.project_name(item.name);
			/****************************************/
			$("#project_name")
				.hide()
				.slideDown('slow');
				$("#sub_project_details").fadeOut(1000,"fast");
			$("#project_details").show();
				$("#sub_project_details").fadeIn(3000,'slow');
			$("#project_repo").show();
			$("#project_reco").show();
			$("#project_apis").show();
			//$("#project_name").show();
		}
		
		function exists_in(haystack, currentSelections){
			var inner_flag = 0;
			$.each(currentSelections, function(index, entry){
				if(haystack.indexOf(entry) == -1){
					inner_flag = 1;
				}
			});
			if(inner_flag == 1)
				return 0;
			else
				return 1;
		}
		
		
		self.filter_projectList = function(item,event)
		{
			var is_all = 0;
			$("#project_details").hide();
			$("#project_repo").hide();
			$("#project_reco").hide();
			$("#project_apis").hide();
			$("#project_name").hide();

			if(event.currentTarget.checked == true)
			{ 
				if(item.tag == "All Projects")
				{
					is_all = 1;
					self.projects_info.removeAll();
					$.each(project_data, function(index, entry){
						self.projects_info.push(entry);
					});
				}
				else
				{
					self.checkedSelections.push(event.currentTarget.value);
				}
			}
			else
			{
				if(item.tag == "All Projects"){
					self.projects_info.removeAll();
				}
				self.checkedSelections.remove(item.tag);
			}
			
			if(is_all == 0)
			{
				self.projects_info.removeAll();
				$.each(project_data, function(index, entry){
					if(exists_in(entry.category, self.checkedSelections()) == 1){
						self.projects_info.push(entry);
					}
				});				
			}
		}
		
	}
	
	ko.applyBindings(new projectDataModel());	
});


$("#name").hover(function(){
	$("#name_bubble").toggle('fast');
});

$("#wrapper").hover(function(){
	$("#project_filters").slideToggle('fast');
});