<?php
/**
 * Server-side API request shortcode
 * 
 */
    require_once(__DIR__ . "/content_truncation.php");

    function curl_api_request($url, $api_key = null){

        $ch = curl_init($url);

        if ( ! is_null($api_key) ) {
            $api_key = ( strpos($api_key, ':') != -1 ) ? $api_key : $api_key . ":";
            curl_setopt($ch, CURLOPT_USERPWD, $api_key);

        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $data = curl_exec($ch);
        curl_close($ch);
        return $data;

    }

    function api_request($atts = null) {

        extract(shortcode_atts(array(
            'url' => 'url',
            'api-key' => 'api-key'
        ), $atts));

        $req_url = esc_attr($atts['url']);
        $req_api_key = esc_attr($atts['api-key']);

        if ( strlen($req_url) < 1 ) {
            return false;
        }

        if ( strlen($req_api_key) > 1 ) {
            $response = curl_api_request($req_url, $req_api_key);
        } else {
            $response = curl_api_request($req_url);
        }

        $json_decode_response = json_decode($response, TRUE);

        $markup = "<section>";
        $markup_header = "<div class='job-list-container'>
                            <div class='job-list-row--title'>
                                <div class='job-list-column job-list-column--small'>
                                    <p><strong>Title</strong></p>
                                </div>
                                <div class='job-list-column job-list-column--small'>
                                    <p><strong>Location</strong></p>
                                </div>
                                <div class='job-list-column job-list-column--large'>
                                    <p><strong>Description</strong></p>
                                </div>
                            </div>
                        </div>";

        $markup_body = "<div id='job-attach' class='job-list-container'><div>";

        $reg_pattern = '/<[^>]*>/'; //remove all tags

        for ( $i = 0; $i < count($json_decode_response); $i++ ) {

            $current_content = preg_replace($reg_pattern, "", $json_decode_response[$i]['content']);
            $markup_body .= "<article class='job-list-row job-list-row--active job-list-row--filtered'>";
            $markup_body .= "<div class='job-list-column job-list-column--small'><p>" . $json_decode_response[$i]['title'] . "</p></div>";
            $markup_body .= "<div class='job-list-column job-list-column--small'><p>" . $json_decode_response[$i]['location']['name'] . "</p></div>";
            $markup_body .= "<div class='job-list-column job-list-column--large'><p>" . content_truncation($current_content) . "</p></div>";
            $markup_body .= "</article>";

        }

        $markup_body .= "</div></div>";

        $markup .= $markup_header . $markup_body . "</section>";

        return $markup;
    }

?>