<?php
/** 
 * Plugin Name:       Curated Query Loop
 * Description:       Adds a post-picker to the Query Loop block.
 * Version:           0.2.0
 * Author:            Peter Sorensen, 10up
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Mimimum WP Version: 6.3
 * Tested WP Version:  6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Useful global constants.
define( 'CURARTED_QUERY_LOOP_VERSION', '0.2.0' );
define( 'CURARTED_QUERY_LOOP_URL', plugin_dir_url( __FILE__ ) );
define( 'CURARTED_QUERY_LOOP_PATH', plugin_dir_path( __FILE__ ) );
define( 'CURARTED_QUERY_LOOP_INC', CURARTED_QUERY_LOOP_PATH . 'includes/' );
define( 'CURARTED_QUERY_LOOP_DIST_URL', CURARTED_QUERY_LOOP_URL . 'dist/' );
define( 'CURARTED_QUERY_LOOP_DIST_PATH', CURARTED_QUERY_LOOP_PATH . 'dist/' );

$is_local_env = in_array( wp_get_environment_type(), [ 'local', 'development' ], true );
$is_local_url = strpos( home_url(), '.test' ) || strpos( home_url(), '.local' );
$is_local     = $is_local_env || $is_local_url;

if ( $is_local && file_exists( __DIR__ . '/dist/fast-refresh.php' ) ) {
	require_once __DIR__ . '/dist/fast-refresh.php';
	TenUpToolkit\set_dist_url_path( basename( __DIR__ ), CURARTED_QUERY_LOOP_DIST_URL, CURARTED_QUERY_LOOP_DIST_PATH );
}

// Require Composer autoloader if it exists.
if ( file_exists( CURARTED_QUERY_LOOP_PATH . 'vendor/autoload.php' ) ) {
	require_once CURARTED_QUERY_LOOP_PATH . 'vendor/autoload.php';
}

// Include files.
require_once CURARTED_QUERY_LOOP_INC . '/utility.php';
require_once CURARTED_QUERY_LOOP_INC . '/core.php';

// Activation/Deactivation.
register_activation_hook( __FILE__, 'CuratedQueryLoop\\Core\\activate' );
register_deactivation_hook( __FILE__, 'CuratedQueryLoop\\Core\\deactivate' );

// Bootstrap.
CuratedQueryLoop\Core\setup();
