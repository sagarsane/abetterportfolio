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
	//$("#project_buttons").scrollbar();
	$("#project_details").hide();
	$("#project_repo").hide();
	$("#project_reco").hide();
	$("#project_apis").hide();
	
	function projectDataModel(){
		
		var self = this;
		self.projects_info = ko.observableArray();
		//this.projects_info.loading = ko.observable(false);
		
		self.get_projects_info = function(){
			var proj_info;
			$.getJSON('/project_data', function(data){
				self.projects_info(data.projects);
			});
		}
		
		self.get_projects_info();
		
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
	}
	
	ko.applyBindings(new projectDataModel());	
});


var animateAbout = function(){
	
}