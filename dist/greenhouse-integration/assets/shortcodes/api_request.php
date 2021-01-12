<?php
/**
 * Server-side API request shortcode
 * 
 */

    require_once(__DIR__ . "/../controller/internal_job_post.php");
    require_once(__DIR__ . "/content_truncation.php");

    function count_check($complete_list, $compare_count) {
        $count = 0;
        for ( $i = 0; $i < count($complete_list); $i++ ) {
            if ( $complete_list[$i]['internal'] ) {
                $count++;
            }
        }
        return $count == count($compare_count);
    }

    function data_json_req($title) {
        $file = dirname(__FILE__) . "/../data/$title.json";
        return json_decode(file_get_contents($file));
    }

    function print_json($title, $string) {
        $greenhouse_json = implode(",", $string);
        $file = dirname(__FILE__) . "/../data/$title.json";
        file_put_contents($file, "[" . $greenhouse_json . "]");
    }

    function jsonify_page_title($title) {
        return preg_replace('/\s+/', '-', $title);
    }

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

        $json_file_title = jsonify_page_title(get_the_title());

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
                                    <p><strong>Req #</strong></p>
                                </div>
                                <div class='job-list-column job-list-column--large'>
                                    <p><strong>Title</strong></p>
                                </div>
                                <div class='job-list-column job-list-column--large'>
                                    <p><strong>Location</strong></p>
                                </div>
                            </div>
                        </div>";

        $markup_body = "<div id='job-attach' class='job-list-container'><div>";

        $current_data = data_json_req($json_file_title);
        $count_check = count_check($json_decode_response, $current_data);

        $reg_pattern = '/<[^>]*>/'; //remove all tags

        $job_post_array = [];

        if ( $count_check == TRUE ) {

            for ( $i = 0; $i < count($current_data); $i++ ) {
                
                    $job_id = $current_data[$i]->id;
                    $job_title = $current_data[$i]->title;
                    $job_req = $current_data[$i]->req_id;
                    $job_location = $current_data[$i]->location;
    
                    $markup_body .= "<article class='job-list-row job-list-row--active job-list-row--filtered'>";
                    $markup_body .= "<div class='job-list-column job-list-column--small'><p><a href='https://anaplan.greenhouse.io/internal_job_board/applications/$job_id' target='_blank'>$job_req</a></p></div>";
                    $markup_body .= "<div class='job-list-column job-list-column--large'><p><a href='https://anaplan.greenhouse.io/internal_job_board/applications/$job_id' target='_blank'>$job_title</a></p></div>";
                    $markup_body .= "<div class='job-list-column job-list-column--large'><p>$job_location</p></div>";
                    $markup_body .= "</article>";
    
            }
            
            $markup_body .= "</div></div>";
            $markup .= $markup_header . $markup_body . "</section>";
            return $markup;

        }

        for ( $i = 0; $i < count($json_decode_response); $i++ ) {

            if ( $json_decode_response[$i]['internal'] ) {
                    
                $job_id = $json_decode_response[$i]['id'];
                $req_id = $json_decode_response[$i]['job_id'];

                $individual_response = curl_api_request("https://harvest.greenhouse.io/v1/jobs/" . $req_id, $req_api_key);
                $individual_json_decode_response = json_decode($individual_response, TRUE);
                $requisition_id = $individual_json_decode_response["requisition_id"];

                $markup_body .= "<article class='job-list-row job-list-row--active job-list-row--filtered'>";
                $markup_body .= "<div class='job-list-column job-list-column--small'><p><a href='https://anaplan.greenhouse.io/internal_job_board/applications/$job_id' target='_blank'>$requisition_id</a></p></div>";
                $markup_body .= "<div class='job-list-column job-list-column--large'><p><a href='https://anaplan.greenhouse.io/internal_job_board/applications/$job_id' target='_blank'>" . $json_decode_response[$i]['title'] . "</a></p></div>";
                $markup_body .= "<div class='job-list-column job-list-column--large'><p>" . $json_decode_response[$i]['location']['name'] . "</p></div>";
                $markup_body .= "</article>";

                $internal_job_obj = new internal_job_post($job_id, $json_decode_response[$i]['title'], $job_id, $requisition_id, $json_decode_response[$i]['location']['name']);//$id, $title, $gh_id, $req_id, $location

                array_push($job_post_array, $internal_job_obj->get_post_obj());

            }

        }

        $markup_body .= "</div></div>";

        $markup .= $markup_header . $markup_body . "</section>";

        print_json($json_file_title, $job_post_array);

        return $markup;
    }

    function cache_response( $header ) {
        header( 'Cache-Control: max-age=3600' );  
      }
    
    add_filter( 'send_headers', 'cache_response' );

?>