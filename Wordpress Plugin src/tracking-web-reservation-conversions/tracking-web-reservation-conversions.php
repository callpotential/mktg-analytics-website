<?php
/*
Plugin Name: Tracking Web Reservation Conversions
Description: Tracking Web Reservation Conversions, Google Ads data Submitting to API Endpoint.
Version: 1.0
Author: es
License: GPLv2
*/


define ( 'TRACKING_PLUGIN_URL', plugin_dir_url(__FILE__));

register_activation_hook(__FILE__, 'tracking_activation');
register_deactivation_hook(__FILE__, 'tracking_deactivation');

function tracking_activation() {
	
}
function tracking_deactivation() {
	
}

function tracking_gclid() {
    // when not on location page we are doing unset session.
    if( isset($_GET['gclid'])  ) {
        $_SESSION['_gclid'] = $_GET['gclid'];
        $_SESSION['url_gclid'] = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    }
    

}
add_action('wp_head', 'tracking_gclid');

function tracking_unset() {
    // when not on location page we are doing unset session.
    if( isset($_GET['location']) && isset($_GET['unit']) && !isset($_GET['pages'])  ) {

        unset($_SESSION['endpoint_submitted']);
        
    }
}
add_action('genesis_loop', 'tracking_unset',99);

function tracking_submit_to_api_endpoint() {

    if( isset($_GET['location']) && isset($_GET['unit']) && isset($_GET['pages'])  && $_GET['pages'] == 2 ) {

        if( isset($_SESSION['endpoint_submitted']) && $_SESSION['endpoint_submitted'] == $_SESSION['reservation']['reservation_id'] ) {

            return;
        }


    	if( isset($_GET['location']) ) {
        	$location_id = $_GET['location'];
        }else{
        	return;
        }

        $t_stamp = gmdate("Y-m-d h:m:s+|-h:m");
        $URL = get_field('ndss_tracking_endpoint','option');
        //"https://transmission-prod.tracking.callpotential.com/web-reservation/sitelink";

        $gclid = $reserv_id = $gcid = $url_gclid = '-';

        if( isset($_COOKIE['_ga']) ) {
            $gcid = $_COOKIE['_ga'];
        }

        if( isset($_SESSION['_gclid']) ) {
            $gclid = $_SESSION['_gclid'];
        }
        if( isset($_SESSION['url_gclid']) ) {
            $url_gclid = $_SESSION['url_gclid'];
        }
        if( isset($_SESSION['reservation']['reservation_id']) ) {
            $reserv_id = $_SESSION['reservation']['reservation_id'];
        }

        $loc_code = location_code($location_id);

        if( !$loc_code ) {
            $loc_code = $location_id;
        }

        if( get_field('sitelink_corp_code','option') ) {
        	$corp_code = get_field('sitelink_corp_code','option');
        }else{
        	$corp_code = SITELINK_CORP_CODE;
        }


        $body = array(
                    'corp_code'      => $corp_code,
                    'location_code'  => $loc_code,
                    'reservation_id' => $reserv_id,
                    'gclid'          => $gclid,
                    'gcid'           => $gcid,
                    'url'            => $url_gclid,
                    //'gclsrc'          => "",
                    //'timestamp_utc'  => $t_stamp,
                );
        $body = wp_json_encode( $body );

        $response = wp_remote_post( $URL, array(
                'method'      => 'POST',
                'timeout'     => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking'    => true,
                'headers'     => [
                                    'Content-Type' => 'application/json',
                                ],
                'sslverify'   => false,
                'body'        => $body,
                'cookies'     => array()
            )
        );

       
        if( $_GET['dev'] ) {

            echo "<pre>";print_r($_SESSION); 


            if ( is_wp_error( $response ) ) {
                print_r($body);
                echo "--fail--";
                print_r($response);
            }else{
                print_r($body);
                $body = json_decode($response['body'],true);
                echo "--success--";
                print_r($body);
                $_SESSION['endpoint_submitted'] = $_SESSION['reservation']['reservation_id'];

                //unset($_SESSION['_gclid']);

            }

            print_r($_COOKIE);
            echo "</pre>";
        }
    }

}
add_action('genesis_loop', 'tracking_submit_to_api_endpoint',90);

?>
