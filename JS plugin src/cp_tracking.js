/*!
 * Plugin CP Tracking: https://www.callpotential.com/
 * Version: 1.0
 * Author: CallPotential
 */

$.fn.gc_tracking = function( parameters ) {

	valid = true;
	$this = this;
	
	if ( !parameters.pms_type ) {
		console.log ("pms_type required");
		valid = false;
	}
	if ( !parameters.account_id ) {
		console.log ("account_id required");
		valid = false;
	}
	if ( !parameters.location_id ) {
		console.log ("location_id required");
		valid = false;
	}
	if ( !parameters.reservation_id || !parameters.rental_id ) {
		console.log ("reservation_id or rental_id is required");
		valid = false;
	}
	if ( !parameters.gclid || !parameters.gcid ) {
		console.log ("gclid or gcid required");
		valid = false;
	}
	if ( !parameters.url ) {
		parameters.url = window.location.href;
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
			pms_type : parameters.pms_type,
			account_id : parameters.account_id,
			location_id : parameters.location_id,
			reservation_id : parameters.reservation_id,
			rental_id : parameters.rental_id,
			gclid : parameters.gclid,
			gcid : parameters.gcid,
			url : parameters.url,
		}));

	}else{
		this.append('All fields are required! check console for more details');
	}

};