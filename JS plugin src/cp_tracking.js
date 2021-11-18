/*!
 * Plugin CP Tracking: https://www.callpotential.com/
 * Version: 1.0
 * Author: CallPotential
 */

(function () {


	$.fn.gc_tracking = function( options ) {

		// Default options
		var parameters = $.extend({
			corp_code: '',
			location_code: '',
			reservation_id: '',//ledger_id
			gclid: '',
			gcid: '',
			url: '',
		}, options );

		valid = true;
		$this = this;
		
		if ( parameters.corp_code == '' ) {
			console.log ("corp_code required");
			valid = false;
		}
		if ( parameters.location_code == '' ) {
			console.log ("location_code required");
			valid = false;
		}
		if ( parameters.reservation_id == '' ) {
			console.log ("reservation_id required");
			valid = false;
		}
		if ( parameters.gclid == '' ) {
			console.log ("gclid required");
			valid = false;
		}
		if ( parameters.gcid == '' ) {
			console.log ("gcid required");
			valid = false;
		}

	    if( valid ) {

			//var today = new Date();
			//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+'+|-'+today.getHours() + ":" + today.getMinutes();

			//console.log(date+' '+time);

			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "https://transmission-prod.tracking.callpotential.com/web-reservation/sitelink", true); 
			xhttp.setRequestHeader("Content-Type", "application/json");
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					return $this.append("Successfully submitted!");
				}

				console.log(this.responseText);
			};

			xhttp.send(JSON.stringify({
				corp_code : parameters.corp_code,
				location_code : parameters.location_code,
				reservation_id : parameters.reservation_id,
				gclid : parameters.gclid,
				gcid : parameters.gcid,
				url : parameters.url,
				//glsrc : '-',
				//timestamp_utc: date+' '+time,
			}));

		}else{
			this.append('All fields are required! check console for more details');
		}

	};

}());