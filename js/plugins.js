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
	var exp_data_arr,edu_data_arr;
	var i_exp = 0, i_edu = 0;
	var exp_data_cnt = 0, edu_data_cnt;
	function ExperienceModel(){
		var self = this;
		var exp_data = "";
		var edu_data = "";
		//var i = 0;
		//var exp_data_cnt = 0;
		self.experienceContent = ko.observable();
		self.educationContent = ko.observable();

		self.getExperienceContent = function(){
			//self.experienceContent(null);
			$.get('/experience', function(data){
				exp_data = data;
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

		self.getEducationContent = function(){
			//self.experienceContent(null);
			$.get('/education', function(data){
				edu_data = data;
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

