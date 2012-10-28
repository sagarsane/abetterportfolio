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
	var a_div = '<div style="cursor: default;" id="activity" class="tile bg-color-orange">' +
		   				'<div class="tile-announce" style="">' + 
		   				'<div class="tile-text announce-content">' +
		   					'<div class=tile-text>' +
		   						'<h2 style="font-size:12px; "> An H2 here? </h2>' +
		   						'<div class="tile-text">';
							
				
	var end_div =				'</div>' +
							'</div>' + 
						'</div>'+
						'<div class="announce-description" style="height: auto;">' + 
							'<div class="text"><strong>Something here</strong></div>' +
						'</div>'+ 
						'</div>' +
				'</div>';
	var i;
	
	for (i = 0; i < 18; i++){
		$('#sections_1').append(a_div + 'A Card in Section 1' + end_div);
		$('#sections_2').append(a_div + 'A Card in Section 2' + end_div);
		$('#sections_3').append(a_div + 'A Card in Section 3' + end_div);
		$('#sections_4').append(a_div + 'A Card in Section 4' + end_div);
		$('#sections_5').append(a_div + 'A Card in Section 5' + end_div);
		$('#sections_6').append(a_div + 'A Card in Section 6' + end_div);
		$('#sections_7').append(a_div + 'A Card in Section 7' + end_div);
		$('#sections_8').append(a_div + 'A Card in Section 8' + end_div);
		$('#sections_9').append(a_div + 'A Card in Section 9' + end_div);
		$('#sections_10').append(a_div + 'A Card in Section 10' + end_div);
		$('#sections_11').append(a_div + 'A Card in Section 11' + end_div);
		$('#sections_12').append(a_div + 'A Card in Section 12' + end_div);
		$('#sections_13').append(a_div + 'A Card in Section 13' + end_div);
		
	}
	
	
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