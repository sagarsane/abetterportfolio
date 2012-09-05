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
	function projectDataModel(){
		
		var self = this;
		self.projects_info = ko.observableArray();
		
		
		self.get_projects_info = function(){
			var proj_info;
			$.getJSON('/project_data', function(data){
				self.projects_info(data.projects);
			});
		}		
		self.get_projects_info();
		
		self.project_about = ko.observableArray();	
		self.getDetails = function(item){
			self.project_about(item.about);
		}
	}
	
	ko.applyBindings(new projectDataModel());	
});


