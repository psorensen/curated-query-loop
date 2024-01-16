<?php
/** 
 * Plugin Name: Query Loop Post Picker
 * Plugin URI:
 * Description: Adds a post-picker to the query loop
 * Version: 0.1.0
 * Author: 10up
 */

// Useful global constants.
define( 'CQL_VERSION', '0.1.0' );
define( 'CQL_URL', plugin_dir_url( __FILE__ ) );
define( 'CQL_PATH', plugin_dir_path( __FILE__ ) );
define( 'CQL_INC', CQL_PATH . 'includes/' );
define( 'CQL_DIST_URL', CQL_URL . 'dist/' );
define( 'CQL_DIST_PATH', CQL_PATH . 'dist/' );

$is_local_env = in_array( wp_get_environment_type(), [ 'local', 'development' ], true );
$is_local_url = strpos( home_url(), '.test' ) || strpos( home_url(), '.local' );
$is_local     = $is_local_env || $is_local_url;

if ( $is_local && file_exists( __DIR__ . '/dist/fast-refresh.php' ) ) {
	require_once __DIR__ . '/dist/fast-refresh.php';
	TenUpToolkit\set_dist_url_path( basename( __DIR__ ), CQL_DIST_URL, CQL_DIST_PATH );
}

// Require Composer autoloader if it exists.
if ( file_exists( CQL_PATH . 'vendor/autoload.php' ) ) {
	require_once CQL_PATH . 'vendor/autoload.php';
}

// Include files.
require_once CQL_INC . '/utility.php';
require_once CQL_INC . '/core.php';

// Activation/Deactivation.
register_activation_hook( __FILE__, 'CuratedQueryLoop\\Core\\activate' );
register_deactivation_hook( __FILE__, 'CuratedQueryLoop\\Core\\deactivate' );

// Bootstrap.
CuratedQueryLoop\Core\setup();
