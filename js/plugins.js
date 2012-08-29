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
	var exp_data_arr,edu_data_arr, proj_data_arr;
	var i_exp = 0, i_edu = 0, i_proj = 0;
	var exp_data_cnt = 0, edu_data_cnt = 0, proj_data_cnt = 0;
	function ExperienceModel(){
		var self = this;
		var exp_data = "";
		var edu_data = "";
		var proj_data = "";
		//var i = 0;
		//var exp_data_cnt = 0;
		self.experienceContent = ko.observable();
		self.educationContent = ko.observable();
		self.projectsContent = ko.observable();

		self.getExperienceContent = function(){
			//self.experienceContent(null);
			$.getJSON('/experience', function(experience){
				//exp_data = data;
				$.each(experience, function(entryIndex, entry) {
					   exp_data += "<div class='tile-text'><h2>" + entryIndex + "</h2><br/>";
					    
					   $.each(entry, function(i, subentry) { 
					       exp_data += "<p>" + subentry + "</p>";
					   }); 
					   exp_data += "</div>";
				});
				exp_data_arr = exp_data.split("</div>");
				exp_data_cnt = exp_data_arr.length-1;
				self.experienceContent(exp_data_arr[i_exp++] + "</div>");
				function change(data_arr){
					if(i_exp >= exp_data_cnt)
						i_exp = 0;
					self.experienceContent(exp_data_arr[i_exp++] + "</div>");
				}
				setInterval(function(){change(exp_data_arr)},2000);
				
				
			});
		}

		self.getProjectsContent = function(){
			
			$.getJSON('/projects', function(projects){
				$.each(projects, function(entryIndex, entry) {
					   proj_data += "<div class='tile-text'><h2>" + entryIndex + "</h2><br/>";
					   proj_data += "<p>" + entry + "</p>" + "</div>"; 

				});
		
				proj_data_arr = proj_data.split("</div>");
				proj_data_cnt = proj_data_arr.length-1;
				self.projectsContent(proj_data_arr[i_proj++] + "</div>");
				function change(data_arr){
					if(i_proj >= proj_data_cnt)
						i_proj = 0;
					self.projectsContent(data_arr[i_proj++] + "</div>");
				}
				setInterval(function(){change(proj_data_arr)},2650);
			});
		}

		self.getEducationContent = function(){
			//self.experienceContent(null);
			$.getJSON('/education', function(education){
				//edu_data = data;
				$.each(education, function(entryIndex, entry) {
					   edu_data += "<div class='tile-text'><h2>" + entryIndex + "</h2><br/>";
					    
					   $.each(entry, function(i, subentry) { 
					       edu_data += "<p>" + subentry + "</p>";
					   }); 
					   edu_data += "</div>";
				});
		
				edu_data_arr = edu_data.split("</div>");
				edu_data_cnt = edu_data_arr.length-1;
				self.educationContent(edu_data_arr[i_edu++] + "</div>");
				function change(data_arr){
					if(i_edu >= edu_data_cnt)
						i_edu = 0;
					self.educationContent(data_arr[i_edu++] + "</div>");
				}
				setInterval(function(){change(edu_data_arr)},2300);
				
				
			});
		}

		
		self.getExperienceContent();
		self.getEducationContent();
		self.getProjectsContent();
	}
	
	ko.applyBindings(new ExperienceModel());
	
	/*ko.bindingHandlers.slideVisible = {
		    update: function(element, valueAccessor, allBindingsAccessor) {
		        // First get the latest data that we're bound to
		        //var value = valueAccessor(), allBindings = allBindingsAccessor();
		    	if(i > exp_data_cnt)
		    		i = 0;
		    	var value = data_arr[i++] + "</div>"; 
		         
		        // Next, whether or not the supplied model property is observable, get its current value
		        var valueUnwrapped = ko.utils.unwrapObservable(value); 
		         
		        // Grab some more data from another binding property
		        var duration = allBindings.slideDuration || 400; // 400ms is default duration unless otherwise specified
		         
		        // Now manipulate the DOM element
		        if (valueUnwrapped == true) 
		            $(element).slideDown(duration); // Make the element visible
		        else
		            $(element).slideUp(duration);   // Make the element invisible
		    }
		};*/

	$("#scrollableIndex").smoothDivScroll({ 
		mousewheelScrolling: true,
		manualContinuousScrolling: false,
		visibleHotSpotBackgrounds: "always",
		autoScrollingMode: ""
	});
	
});

