<?php

	/**
	 * Plugin Name:       Greenhouse Integration
	 * Plugin URI:        https://careers.anaplan.com/
	 * Description:       Integrates Greenhouse API with Anaplan.com — Originally built for Astra + Elementor
	 * Version:           1.0.1
	 * Author:            Peter Berki
	 * Author URI:        https://kumadev.com
	 */
    
    if ( ! defined('WPINC') ) {
        die;
    }

    function greenhouse_script() {
        wp_enqueue_script('greenhouse-integration', dirname(__FILE__) . '/js/greenhouse-integration-script-min.js', array('jquery'), '1.2.1', true);
    }

    add_action( 'wp_enqueue_scripts', 'greenhouse_script' );

?>