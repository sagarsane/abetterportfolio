(function() {
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = window.console || {};

    while (length--) {
        // Only stub undefined methods.
        console[methods[length]] = console[methods[length]] || noop;
    }
}());

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


function portfolioModel(){
	var project_data;
	var currentSelections;	
	var self = this;
	
	self.experienceContent = ko.observableArray();
	self.educationContent = ko.observableArray();
	self.githubActivities = ko.observableArray();
	self.projects_info = ko.observableArray();
	self.achievements_info = ko.observableArray();
	self.contact_info = ko.observableArray();
	self.social_info = ko.observableArray();
	self.hobbies_info = ko.observableArray();
	self.project_categories = ko.observableArray();
	self.checkedSelections = ko.observableArray();	
	self.navigate_bar = ko.observableArray();
	
	
	self.navigate_bar.push({"nav":"About"});
	self.navigate_bar.push({"nav":"Experience"});
	self.navigate_bar.push({"nav":"Education"});
	self.navigate_bar.push({"nav":"Projects"});
	self.navigate_bar.push({"nav":"Achievements"});
	self.navigate_bar.push({"nav":"Contact"});

	
	self.navigate = function(item){
		$("#back_button").attr("data-href", "");
		var goTo = this.nav;
		switch(goTo){
		case "About" : 	$('#wrapper').scrollTo($('#about'), 1600, {
							easing: 'swing',
							onAfter: function(){
							$("#header_text").html("About");
							  $("#back_button").hide();
							  $("#name_bubble_text").html("<p>Hello! Thanks for visiting!</p><p>This is (almost) everything about me :). Click on any section to know more about me.</p>");
							  $("#name_bubble").toggle("slow");
							  name_bubble_function(0);
							}
						});
						break;
		case "Experience" : $("#experience_tile").click();break;
		case "Education" : $("#education_tile").click();break;
		case "Projects" : $("#projects_tile").click();break;
		case "Achievements" : $("#achievements_tile").click();break;
		case "Contact" : $("#contact_tile").click();break;
		}
		
	}
	
	self.getExperienceContent = function(){
		$.getJSON('/experience', function(data){
			var i = 0;
			var exp_data = "";
			
			var cnt = data.experience.length;
			var pc1 = cnt * 100;
			var pc2 = (100 / cnt);
			$("#experience_tile_mask").width( pc1 + "%");
			$.each(data.experience, function(index, entry) {
					entry.id = "experience_tile_item_" + (i++);
					data.experience[index] = entry;
			});
			
			self.experienceContent(data.experience);
			
			
			(function change(){
				var count = parseFloat($("#experience_tile_mask").css('width'))/parseFloat($("#experience_tile_mask").parent().css('width'));
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#experience_tile_item_' + random;
				$('#experience_tile_wrapper').scrollTo($(item_id+""), 900, {	easing: 'swing' });
				setTimeout(function(){change()}, 4000);
			})();
			
			$(".experience_tile_item").width( pc2 + "%");
		});
	}

	self.getEducationContent = function(){
		$.getJSON('/education', function(data){
			var i = 0;
			var edu_data = "";
			var cnt = data.education.length;
			var pc1 = cnt * 100;
			var pc2 = (100 / cnt);
			
			$("#education_tile_mask").width( pc1 + "%");
			$.each(data.education, function(index, entry) {
					entry.id = "education_tile_item_" + (i++);
				   	data.education[index] = entry;	
			});

			self.educationContent(data.education);
			$(".education_tile_item").width( pc2 + "%");
			(function change(){
				var count = parseFloat($("#education_tile_mask").css('width'))/parseFloat($("#education_tile_mask").parent().css('width'));
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#education_tile_item_' + random;
				$('#education_tile_wrapper').scrollTo($(item_id+""), 900, {	easing: 'swing' });								
				setTimeout(function(){change()},3300);					
			})();			
		});
	}

	
	self.get_github_activities = function()
	{
		//load the "Loading" gif here in that panel.
		$("#loading_gif").show();
		$("#activities_tile").hide();
		$.getJSON('/github_activity', function(data)
		{
			var i = 0;
			var entries = data.activities;
			var cnt = data.activities.length;
			var pc1 = cnt * 100;
			var pc2 = (100 / cnt);
			
			$("#activity_tile_mask").width( pc1 + "%");
			$.each(entries, function(index, entry){
				entries[index].id="activity_tile_item_" + (i++);
				if(entries[index].name.length > 40)
					entries[index].name = entries[index].name.substring(0,40) + "...";
			});
			//remove the "Loading" gif here in that panel.
			$("#loading_gif").hide();
			$("#activities_tile").show();
			self.githubActivities(entries);
			$(".activity_tile_item").width( pc2 + "%");
			(function change(){
				var count = parseFloat($("#activity_tile_mask").css('width'))/parseFloat($("#activity_tile_mask").parent().css('width'));
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#activity_tile_item_' + random;
				$('#activity_tile_wrapper').scrollTo($(item_id+""), 2000, {	easing: 'swing' });				
				setTimeout(function(){change()},10000);
			})();			
			
			
		});
	}
	
	
	self.get_projects_info = function(){
		self.project_categories.push({tag: "All Projects"});

		$.getJSON('/projects', function(data){		
			var proj_cat = [];
			var i = 0;
			var cnt = data.projects.length;
			var pc1 = (cnt+2) * 100;
			var pc2 = (100 / cnt);
			
			$("#projects_tile_mask").width( pc1 + "%");
			$("#projects_detail_mask").width( pc1 + "%");
			
			$.each(data.projects, function(index, entry){
				entry.id = "projects_tile_item_" + i;
				entry.detail_id = "projects_detail_item_" + (i++);
				data.projects[index] = entry;
				$.each(entry.category, function(ind, val){
					if(proj_cat.indexOf(val) == -1){
						proj_cat.push(val);
						self.project_categories.push({tag : val});
					}
				})

			});
			project_data = jQuery.extend(true, {}, data.projects);
			self.projects_info(data.projects);
			proj_cat = [];
			$(".projects_tile_item").width( pc2 + "%");
			$(".projects_detail_item").width( pc2 + "%");
			
			(function change(){
				var count = parseFloat($("#projects_tile_mask").css('width'))/parseFloat($("#projects_tile_mask").parent().css('width'));
				count--;
				var random = Math.floor(Math.random() * ( (count-1) - 0 + 1)) + 0;
				var item_id = '#projects_tile_item_' + random;
				$('#projects_tile_wrapper').scrollTo($(item_id+""), 900, {	easing: 'swing' });				
				setTimeout(function(){change()},5650);
			})();
				
		});
	}


	self.get_achievements_hobbies_info = function(){
		$.getJSON('/achievements', function(data){		
			$.each(data.achievements, function(index, entry){
				self.achievements_info.push(entry);
			});
			$.each(data.hobbies, function(index, entry){
				self.hobbies_info.push(entry);
			});
			
		});
	}

	self.get_contact_social_info = function(){
		$.getJSON('/contact', function(data){		
			$.each(data.email, function(index, entry){
				self.contact_info.push(entry);
			});
			$.each(data.social, function(index, entry){
				self.social_info.push(entry);
			});
			
		});
	}

	
	self.getDetails = function(item){
		var itemId = "#" + item.detail_id;
		//$("#project_detail_wrapper").toggle();
		$('#projects_detail_wrapper').scrollTo($("" + itemId), 2600, {easing: 'swing'});
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
	
	
	self.getExperienceContent();
	self.getEducationContent();
	self.get_projects_info();
	self.get_achievements_hobbies_info();
	self.get_contact_social_info();
	self.get_github_activities();
}

$("#back_button").click(function() {

	var goTo = $(this).attr("data-href");
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


$(document).ready(function() {

	name_bubble_function(0);
	$("#back_button").hide();
	$("#back_button").removeAttr("href");
	$(".experience_heading").hide();
	$(".projects_heading").hide();
	$(".education_heading").hide();
	
	$(window).resize(function() {
		resizePanel();
	});

	$("#name").hover(function(){
		$("#name_bubble").toggle('fast');
	});


	$("#experience_tile_wrapper").hover(function(){
		$(".experience_heading").slideToggle('slow');
	});

	$("#projects_tile_wrapper").hover(function(){
		$(".projects_heading").slideToggle('slow');
	});

	$("#education_tile_wrapper").hover(function(){
		$(".education_heading").slideToggle('slow');
	});


	$("#filters_wrapper").hover(function(){
		if($("#back_button").attr('data-current') == "projects")
			$("#project_filters").slideToggle('fast');
	});

	$(".navigation_wrapper").hover(function(){
		$("#navigation").slideToggle('fast');
	});
	
	ko.applyBindings(new portfolioModel());
	
	
	
	$("div#experienceScrollable").smoothDivScroll({
		/*hotSpotScrollingInterval: 45*/
		autoScrollingMode: "always",
		autoScrollingDirection: "endlessLoopLeft",
		autoScrollingStep: 1,
		autoScrollingInterval: 15
	});
	
	
	$("div#experienceScrollable").bind("mouseover", function () {
		$(this).smoothDivScroll("stopAutoScrolling");
	}).bind("mouseout", function () {
		$(this).smoothDivScroll("startAutoScrolling");
	});
	
	var num = 5;
	var wid = 350 * num;
	$("#experienceScrollableSections").width( wid + "px");
	$("#experienceScrollableSections scrollWrapper scrollableArea").width(wid + "px");
});

