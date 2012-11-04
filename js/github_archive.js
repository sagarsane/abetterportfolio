/*jslint browser:true */
/*global $, jQuery*/

(function () {
	"use strict";
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


$(document).ready(function () {
	"use strict";
	var totalEntries = -1, sections_cnt = -1, tiles_cnt = -1, h2_content = "", tile_content = "", tile_description = "", tile_color = "", h2_data = "";
	$.getJSON('/archive_data', function (archive) {
		totalEntries = archive.totalRows;
		sections_cnt = 1;
		tiles_cnt = 0;
		var main_content = "<div id='sections_" + sections_cnt + "' class='metro-section size12' style='height: 500px;'>";
		$.each(archive.rows, function (index, entry) {	
			h2_data = "";
			tile_content = "";
			tile_description = "";
			$.each(entry.f, function (index, data) {
				switch (index) {
				case 0: tile_description = data.v;
					switch (data.v) {//PullRequestReviewCommentEvent OR IssuesEvent OR IssueCommentEvent OR PullRequestEvent
					case "PullRequestReviewCommentEvent":
						tile_color = "bg-color-greenLight";
						break;
					case "IssuesEvent":
						tile_color = "bg-color-orangeDark";
						break;
					case "IssueCommentEvent":
						tile_color = "bg-color-yellow";
						break;
					case "PullRequestEvent":
						tile_color = "bg-color-pink";
						break;						
					}
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
			'<div style="cursor: default;" id="activity" class="tile tile-double ' + tile_color + '">' +
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
			tiles_cnt += 1;
			if (tiles_cnt === 9) {
				tiles_cnt = 0;
				main_content += "</div>";
				sections_cnt += 1;
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