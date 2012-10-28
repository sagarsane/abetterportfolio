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


$(document).ready(function() {
	var totalEntries = -1;
	var section_cnt = -1;
	var tiles_cnt = -1;
	var h2_content = "";
	var tile_content = "";
	var tile_description = "";
	
	$.getJSON('/archive_data', function(archive){
		totalEntries = archive.totalRows;
		sections_cnt = 1;
		tiles_cnt = 0;
		var main_content = "<div id='sections_" + sections_cnt + "' class='metro-section size12' style='height: 500px;'>";
		$.each(archive.rows, function(index, entry){	
			h2_data = "";
			tile_content = "";
			tile_description = "";
			$.each(entry.f, function(index, data){
				switch(index){
				case 0: tile_description = data.v;
						break;//type
				case 4: h2_content = data.v;
						break;//repository_name
				case 5: h2_content = "<a style='color:white;font-weight: 500;font-size:12px;' target='_blank' href='" + data.v + "'>" + h2_content + "</a>";
						break;//repository_url
				case 6: tile_content = data.v;
						break;
				case 7: h2_content += " - <strong>" + data.v + "</strong>";
						break;//repository_language
				case 8: tile_description = "<a style='color:white;font-weight: 500;font-size:12px;' target='_blank' href='" + data.v + "'>" + tile_description + "</a>";
						break;//url
				case 9: tile_description = tile_description + " - " + Date.parse(data.v).toString("dddd, MMMM dd, yyyy h:mm:ss tt");
						break;//date
				}
				
			});

			var content = "" +
			'<div style="cursor: default;" id="activity" class="tile tile-double bg-color-orange">' +
				'<div class="tile-announce" style="">' + 
					'<div class="tile-text announce-content">' +
						'<div class=tile-text>' +
							'<h2 style="font-size:12px; ">' + h2_content + '</h2>' +
							'<div class="tile-text">' +
								tile_content +
							'</div>' +
						'</div>' + 
					'</div>'+
					'<div class="announce-description" style="height: auto;">' + 
						'<div class="text"><strong>' + tile_description + '</strong></div>' +
						'</div>'+ 
					'</div>' +
				'</div>';
												

			main_content += content;

			tiles_cnt++;
			if(tiles_cnt == 9){
				tiles_cnt = 0;
				main_content += "</div>";
				sections_cnt++;
				main_content += "<div id='sections_" + sections_cnt + "' class='metro-section size12' style='height: 500px;'>";
			}
		});
		$("#sections_holder").append(main_content);
		$("#sections_holder").append("</div>");
	});

						
	
	$("#sections_holder").width("");
	$("div#sections_holderScrollable").smoothDivScroll({
		hotSpotScrollingInterval: 45,
		autoScrollingMode: "",
	});
	
	
	$("div#sections_holderScrollable").bind("mouseover", function () {
		$(this).smoothDivScroll("stopAutoScrolling");
	}).bind("mouseout", function () {
		$(this).smoothDivScroll("startAutoScrolling");
	});
    
	
});