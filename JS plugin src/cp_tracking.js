/*!
 * Plugin CP Tracking: https://www.callpotential.com/
 * Version: 1.0
 * Author: CallPotential
 */

(function () {


	$.fn.gc_tracking = function( options ) {
		// Default options
		var parameters = $.extend({
			integration_type: '',
			account_id: '',
			location_id: '',
			reservation_id: '',
			rental_id: '',
			gclid: '',
			gcid: '',
			url: window.location.href,
		}, options );

		valid = true;
		$this = this;
		
		if ( parameters.integration_type == '' ) {
			console.log ("integration_type required");
			valid = false;
		}
		if ( parameters.account_id == '' ) {
			console.log ("account_id required");
			valid = false;
		}
		if ( parameters.location_id == '' ) {
			console.log ("location_id required");
			valid = false;
		}
		if ( parameters.reservation_id == '' ||  parameters.rental_id == '') {
			console.log ("reservation_id or rental_id is required");
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
			xhttp.open("POST", "https://transmission-prod.tracking.callpotential.com/web-reservation", true); 
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