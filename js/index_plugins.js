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

function resizePanel() {

	width = $(window).width();
	height = $(window).height();

	mask_width = width * $('.item').length;

	$('#debug').html(width + ' ' + height + ' ' + mask_width);

	$('#wrapper, .item').css({
		width : width,
		height : height
	});
	$('#mask').css({
		width : mask_width,
		height : height
	});
	$('#wrapper').scrollTo($('a.selected').attr('href'), 0);

}


var name_bubble_function = function(bubbleFlag){
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
}


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


$("#back_button").click(function() {

	//$('a.panel').removeClass('selected');
	//$(this).addClass('selected');

	//current = $(this);
	var goTo = $(this).attr("data-href");
	//$(this).attr("href", "#" + )
	if(goTo == "")
		return false;
	var goTo = "#" + goTo;
	  
	$('#wrapper').scrollTo($(''+goTo), 1600, {
		easing: 'easeOutElastic',
		onAfter: function(){
			$("#back_button").attr("data-href", "");
			switch(goTo){
			case "#about" : $("#header_text").html("About");
						  $("#back_button").hide();
						  $("#name_bubble_text").html("<p>Hello! Thanks for visiting!</p><p>This is (almost) everything about me :). Click on any section to know more about me.</p>");
						  $("#name_bubble").toggle("slow");
						  name_bubble_function(0);
						break;
			}
			
		}
	});

	return false;
});


/*$("#back_button_wrapper").click(function() {
	$("#back_button").click();
});
*/


$(document).ready(function() {
	
	name_bubble_function(0);
	$("#back_button").hide();
	$("#back_button").removeAttr("href");
	
	$("#project_details").hide();
	$("#project_repo").hide();
	$("#project_reco").hide();
	$("#project_apis").hide();
	$("#project_name").hide();
		
	
	$(window).resize(function() {
		resizePanel();
	});
	
	
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
	
	ko.applyBindings(new projectDataModel(), document.getElementById("projects"));
	ko.applyBindings(new ExperienceModel(), document.getElementById("about"));
	
	/*$("#scrollableIndex").smoothDivScroll({ 
		mousewheelScrolling: true,
		manualContinuousScrolling: false,
		visibleHotSpotBackgrounds: "always",
		autoScrollingMode: ""
	});
	*/
});

$("#name").hover(function(){
	$("#name_bubble").toggle('fast');
});

$("#filters_wrapper").hover(function(){
	if($("#back_button").attr('data-current') == "projects")
		$("#project_filters").slideToggle('fast');
});


/******************************************Projects Details********************************/