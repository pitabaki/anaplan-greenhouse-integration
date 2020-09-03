<?php

	/**
	 * Plugin Name:       Greenhouse Integration
	 * Description:       Integrates Greenhouse API with Anaplan.com — Originally built for Astra + Elementor. Now designed for Voyager.
	 * Version:           1.5.1
	 * Author:            Peter Berki
	 * Author URI:        https://kumadev.com
	 */
    
    if ( ! defined('WPINC') ) {
        die;
    }

    function greenhouse_styles_scripts() {
		wp_enqueue_style('greenhouse-integration-style', plugin_dir_url(__FILE__) . 'css/greenhouse-integration-style.css');
        wp_enqueue_script('greenhouse-integration', plugin_dir_url(__FILE__) . 'js/greenhouse-integration-script-min.js', array('jquery'), '1.2.1', true);
	}

	add_action( 'wp_enqueue_scripts', 'greenhouse_styles_scripts' );

?>