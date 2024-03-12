<?php
/**
 * Modifications to the Query Loop query run on the front-end.
 *
 * @package CuratedQueryLoop
 */

namespace CuratedQueryLoop;

/**
 * Class QueryModifications
 */
class QueryModifications extends Module {

	/**
	 * The block with its attributes before it gets rendered.
	 *
	 * @var array
	 */
	public $parsed_block;

	/**
	 * Checks whether the Module should run within the current context.
	 *
	 * @return bool
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Connects the Module with WordPress using Hooks and/or Filters.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'pre_render_block', [ $this, 'modify_query_loop_query' ], 10, 2 );
	}

	/**
	 * Modifies the query loop to include the post picker posts.
	 *
	 * @param  string $block_content The block content.
	 * @param  array  $block         The block object.
	 * @return string
	 */
	public function modify_query_loop_query( $block_content, $block ) {

		if ( ! isset( $block['attrs']['namespace'] ) ) {
			return $block_content;
		}

		if ( 'curated-query-loop' !== $block['attrs']['namespace'] ) {
			return $block_content;
		}

		$this->parsed_block = $block;

		add_filter( 'query_loop_block_query_vars', [ $this, 'get_query_by_attributes_once' ] );

		return $block_content;
	}

	/**
	 * Remove the query block filter and parse the custom query.
	 *
	 * @param  array $query_args Array containing parameters for `WP_Query`.
	 * @return array
	 */
	public function get_query_by_attributes_once( $query_args ) {
		remove_filter( 'query_loop_block_query_vars', [ $this, 'get_query_by_attributes_once' ] );
		return $this->get_query_by_attributes( $query_args, $this->parsed_block );
	}

	/**
	 * Returns a custom query based on block attributes.
	 *
	 * @param  array $query_args Array containing parameters for `WP_Query`.
	 * @param  array $block      The block being rendered.
	 * @return array
	 */
	public function get_query_by_attributes( $query_args, $block ) {

		if ( ! isset( $block['attrs']['namespace'] ) ) {
			return $query_args;
		}

		if ( 'curated-query-loop' !== $block['attrs']['namespace'] ) {
			return $query_args;
		}

		$post_ids = [];
		if ( isset( $block['attrs']['selectedPosts'] ) ) {
			$post_ids = wp_list_pluck( $block['attrs']['selectedPosts'], 'id' );
		}

		if ( empty( $post_ids ) ) {
			return $query_args;
		}

		$query_args['post__in'] = $post_ids;
		$query_args['orderby']  = 'post__in';

		return $query_args;
	}
}
