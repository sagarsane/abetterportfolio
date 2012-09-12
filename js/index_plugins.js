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
			clearTimeout(bubbleOnce);
			bubbleFlag = 0;
		}
		else{
			bubbleFlag = 1;
			$("#name_bubble").toggle('slow');
		}
	}
	var bubbleOnce = setTimeout(function(){fadeBubble()},7000);
}


function landingPageModel(){
	var exp_data_arr,edu_data_arr, proj_data_arr;
	var i_exp = 0, i_edu = 0, i_proj = 0;
	var exp_data_cnt = 0, edu_data_cnt = 0, proj_data_cnt = 0;

	var self = this;
	var exp_data = "";
	var edu_data = "";
	var proj_data = "";
	self.experienceContent = ko.observable();
	self.educationContent = ko.observable();
	self.projectsContent = ko.observable();
	

	self.getExperienceContent = function(){
		$.getJSON('/experience', function(experience){
			var i = 0;
			$.each(experience, function(entryIndex, entry) {
				   exp_data += "<div id='experience_tile_item_" + (i++) + "' class='tile-text experience_tile_item' style='margin: 0; padding-left: 30px; padding-top: 20px;'><h2>" + entryIndex + "</h2><br/>";
				   $.each(entry, function(i, subentry) { 
				       exp_data += "<p>" + subentry + "</p>";
				   }); 
				   exp_data += "</div>";
			});
			self.experienceContent(exp_data);
			
			(function change(){
				var count = parseFloat($("#experience_tile_mask").css('width'))/parseFloat($("#experience_tile_mask").parent().css('width'));
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#experience_tile_item_' + random;
				$('#experience_tile_wrapper').scrollTo($(item_id+""), 900, {	easing: 'swing' });
				setTimeout(function(){change(exp_data_arr)}, 4000);
			})();				
		});
	}

	self.getProjectsContent = function(){
		$.getJSON('/projects', function(projects){
			var i = 0;
			$.each(projects, function(entryIndex, entry) {
				   proj_data += "<div id='projects_tile_item_" + (i++) + "' class='tile-text projects_tile_item' style='margin: 0; padding-left: 30px; padding-top: 20px;'><h2>" + entryIndex + "</h2><br/>";				
				   proj_data += "<p>" + entry + "</p>" + "</div>"; 

			});
	
			self.projectsContent(proj_data);
			
			(function change(){
				var count = parseFloat($("#projects_tile_mask").css('width'))/parseFloat($("#projects_tile_mask").parent().css('width'));
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#projects_tile_item_' + random;
				$('#projects_tile_wrapper').scrollTo($(item_id+""), 900, {	easing: 'swing' });				
				setTimeout(function(){change(proj_data_arr)},5650);
			})();
		});
	}

	self.getEducationContent = function(){
		$.getJSON('/education', function(education){
			var i = 0;
			$.each(education, function(entryIndex, entry) {
				   edu_data += "<div id='education_tile_item_" + (i++) + "' class='tile-text education_tile_item' style='margin: 0; padding-left: 30px; padding-top: 20px;'><h2>" + entryIndex + "</h2><br/>";
				   $.each(entry, function(i, subentry) { 
				       edu_data += "<p>" + subentry + "</p>";
				   }); 
				   edu_data += "</div>";
			});
	
			self.educationContent(edu_data);
			
			(function change(){
				var count = parseFloat($("#education_tile_mask").css('width'))/parseFloat($("#education_tile_mask").parent().css('width'));
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#education_tile_item_' + random;
				$('#education_tile_wrapper').scrollTo($(item_id+""), 900, {	easing: 'swing' });								
				setTimeout(function(){change()},3300);					
			})(edu_data_arr);
		});
	}

	
	self.getExperienceContent();
	self.getEducationContent();
	self.getProjectsContent();
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
			$("#project_detail_wrapper").hide();
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
	//self.project_about = ko.observableArray();
	//self.project_name = ko.observableArray();
	/*self.getDetails = function(item){
		$("#project_details").hide();
		$("#project_repo").hide();
		$("#project_reco").hide();
		$("#project_apis").hide();
		$("#project_name").hide();
		
		//Insert all the detail information
		self.project_about(item.about);
		self.project_name(item.name);
		//
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
	}*/
	
	self.getDetails = function(item){
		var itemId = "#" + item.id;
		$("#project_detail_wrapper").toggle();
		$('#projects_detail_wrapper').scrollTo($("" + itemId), 1600, {easing: 'swing'});
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
		$("#project_detail_wrapper").hide();
		//$("#project_repo").hide();
		//$("#project_reco").hide();
		//$("#project_apis").hide();
		//$("#project_name").hide();

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
		easing: 'swing',
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
	
	//$("#project_details").hide();
	//$("#project_repo").hide();
	//$("#project_reco").hide();
	//$("#project_apis").hide();
	//$("#project_name").hide();
		
	
	$(window).resize(function() {
		resizePanel();
	});
	
	
	
	ko.applyBindings(new projectDataModel(), document.getElementById("projects"));
	ko.applyBindings(new landingPageModel(), document.getElementById("about"));
	
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