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
	
	function projectDataModel(){
		
		var self = this;
		var project_data;
		var currentSelections;
		//self.checkBox = ko.observable(false);
		self.projects_info = ko.observableArray();
		self.project_categories = ko.observableArray();
		
		//this.projects_info.loading = ko.observable(false);
		
		self.get_projects_info = function(){
			
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
				self.project_categories.push({tag: "All Projects"});
				//self.project_categories(proj_cat);
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
			
		}
		
		var exists_in = function(haystack, currentSelections){
			$.each(currentSelections, function(index, entry){
				if(haystack.indexOf(entry) == -1)
					return false;
			});
			return true;
		}
		
		
		self.filter_projectList = function(item,event){
			$("#project_details").hide();
			$("#project_repo").hide();
			$("#project_reco").hide();
			$("#project_apis").hide();

			if(event.currentTarget.checked == true)
			{ //if true, add it to current selections
				self.checkedSelections.push(event.currentTarget.value);
				if(item.tag == "All Projects"){
					//Will have to think about this!!
					self.checkedSelections.remove(item.tag);
					self.projects_info.removeAll();
					$.each(project_data, function(index, entry){
						self.projects_info.push(entry);
					});
					//self.projects_info(project_data);
					//return;
				}
				else{
					//self.checkedSelections.remove(item.tag);
					self.projects_info.remove(function(entry){
						return entry.category.indexOf(item.tag) == -1
					});
				}
			}
			else
			{ 
		        //Here, remove all elements with current value, keeping elements with all previous values
		        //from checkedSelections 
				self.checkedSelections.remove(item.tag);
				self.projects_info.remove(function(entry){
					return entry.category.indexOf(item.tag) != -1
				});
				$.each(project_data, function(index, entry){
					//$.each(entry.category, function(ind, val){
						if(exists_in(entry.category, self.checkedSelections()) == true){
							self.projects_info.push(entry);
						}
					//});
				});

			}
		}
		
	}
	
	ko.applyBindings(new projectDataModel());	
});


var animateAbout = function(){
	
}

$("#name").hover(function(){
	$("#name_bubble").toggle('fast');
});

$("#wrapper").hover(function(){
	$("#project_filters").slideToggle('fast');
});