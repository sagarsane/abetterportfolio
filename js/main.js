$("#projects_tile").click(function(){
	$('#wrapper').scrollTo($("#projects"), 1600, {
		easing: 'swing',
		onAfter: function(){
			$("#name_bubble_text").html("<p>Hover at the bottom of the screen to filter projects by different categories!</p>");
			$("#name_bubble").toggle("slow");
			name_bubble_function(0);
			$("#header_text").html("Projects");
			$("#back_button").show();
			$("#back_button").attr("data-href", "about");
			$("#back_button").attr("data-current", "projects");
		}
	});
});

$("#experience_tile").click(function(){
	$('#wrapper').scrollTo($("#experience"), 1600, {
		easing: 'swing',
		onAfter: function(){
			$("#name_bubble_text").html("<p>Here is the information about my work experience!</p>");
			$("#name_bubble").toggle("slow");
			name_bubble_function(0);
			$("#header_text").html("Experience");
			$("#back_button").show();
			$("#back_button").attr("data-href", "about");
			$("#back_button").attr("data-current", "experience");
		}
	});
});

$("#education_tile").click(function(){
	$('#wrapper').scrollTo($("#education"), 1600, {
		easing: 'swing',
		onAfter: function(){
			$("#name_bubble_text").html("<p>I have Bachelors in IT and Masters in CN(CS)</p>");
			$("#name_bubble").toggle("slow");
			name_bubble_function(0);
			$("#header_text").html("Education");
			$("#back_button").show();
			$("#back_button").attr("data-href", "about");
			$("#back_button").attr("data-current", "education");
		}
	});
});

$("#skillset_tile").click(function(){
	$('#wrapper').scrollTo($("#skills"), 1600, {
		easing: 'swing',
		onAfter: function(){
			$("#name_bubble_text").html("<p>What I know and what I can do!</p>");
			$("#name_bubble").toggle("slow");
			name_bubble_function(0);
			$("#header_text").html("Social Activity Feed");
			$("#back_button").show();
			$("#back_button").attr("data-href", "about");
			$("#back_button").attr("data-current", "skills");
		}
	});
});

$("#achievements_tile").click(function(){
	$('#wrapper').scrollTo($("#achievements_hobbies"), 1600, {
		easing: 'swing',
		onAfter: function(){
			$("#name_bubble_text").html("<p>Somethings worth noting! .. aaand, my hobbies :)</p>");
			$("#name_bubble").toggle("slow");
			name_bubble_function(0);
			$("#header_text").html("Achievements and Hobbies");
			$("#back_button").show();
			$("#back_button").attr("data-href", "about");
			$("#back_button").attr("data-current", "achievements_hobbies");
		}
	});
});

$("#contact_tile").click(function(){
	$('#wrapper').scrollTo($("#contact"), 1600, {
		easing: 'swing',
		onAfter: function(){
			$("#name_bubble_text").html("<p>My footprint on the big bad WWW!</p>");
			$("#name_bubble").toggle("slow");
			name_bubble_function(0);
			$("#header_text").html("Contact Card");
			$("#back_button").show();
			$("#back_button").attr("data-href", "about");
			$("#back_button").attr("data-current", "contact");
		}
	});	
	//$(location).attr("target","_blank");
	//$(location).attr("href","mailto:sagar2217@gmail.com");
});
