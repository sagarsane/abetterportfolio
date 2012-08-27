$("#projects_tile").click(function(){
	//window.location.href = '/home';
	$(location).attr("href","/projects");
});

$("#contact_tile").click(function(){
	$(location).attr("target","_blank");
	$(location).attr("href","mailto:sagar2217@gmail.com");
});
