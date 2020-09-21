<?php
/**
 * Server-side API request shortcode
 * 
 */

    function curl_get_contents($url, $api_key = null){

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

        if ( ! is_null($api_key) ) {

            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Authorization: ' . $api_key
            ));

        }

        $data = curl_exec($ch);
        curl_close($ch);
        return $data;

    }

    function api_request($atts = null) {

        extract(shortcode_atts(array(
            'url' => 'url',
            'api-key' => 'api-key'
        ), $atts));

        if ( strlen($req_url) < 1 ) {
            return false;
        }

        $req_url = esc_attr($atts['url']);
        $req_api_key = esc_attr($atts['api-key']);

        if ( strlen($req_api_key) > 1 ) {
            $response = curl_get_contents($req_url, $req_api_key);
        } else {
            $response = curl_get_contents($req_url);
        }
        
        print_r($response);

    }

?>