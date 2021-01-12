<?php
/**
 * Class for internal job posts
 * Store job board api data along with the internal req number important for Anaplan recruiters
 * pseudo graphql
 */

class internal_job_post {

    private $id;
    private $title;
    private $gh_id;
    private $req_id;
    private $location;

    public function __construct($id, $title, $gh_id, $req_id, $location) {
        $this->id = $id;
        $this->title = $title;
        $this->gh_id = $gh_id;
        $this->req_id = $req_id;
        $this->location = $location;
    }

    public function get_id () {
        return $this->id;
    }

    public function get_title () {
        return $this->title;
    }

    public function get_gh_id () {
        return $this->gh_id;
    }

    public function get_req_id () {
        return $this->req_id;
    }

    public function get_location () {
        return $this->location;
    }

    public function get_post_obj(){
        $title = $this->title;
        $id = $this->id;
        $req_id = $this->req_id;
        $location = $this->location;
        return '{ "title": "'. $title .
            '", "id":"'. $id .
            '", "req_id":"' . $req_id .
            '", "location": "' . $location . '"}';
    }

}

?>