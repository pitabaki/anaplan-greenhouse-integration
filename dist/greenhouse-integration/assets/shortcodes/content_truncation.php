<?php
/**
 * Content truncation function for theme
 *
 *
 * @param string $content content parameter being passed
 * @param int $amt amount of characters
 * @return string $content_update string that was updated based on the $amt
 */

  function content_truncation( $content, $amt = 120 ) {
      $too_long = strlen($content) > $amt;
      $content_trunc = ( $too_long ) ? strrev(substr($content, 0, $amt)) : $content;
      $content_update = ( $too_long ) ? strrev(substr($content_trunc, strpos($content_trunc, " "), strlen($content_trunc))) . " ..." : $content;
      return $content_update;
  }

?>