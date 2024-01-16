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
	 * @param $block_content string The block content.
	 * @param $block array The block object.
	 *
	 * @return void
	 */
	public function modify_query_loop_query( $block_content, $block ) {
		if ( 'core/query' === $block['blockName'] ) {

			$ids = isset( $block['attrs']['selectedPosts'] )
				? $this->get_ids_from_content_picker( $block['attrs']['selectedPosts'] )
				: [];

			if ( $ids !== [] ) {
				add_filter(
					'query_loop_block_query_vars',
					function ( $query_args ) use ( $ids ) {
						$query_args['post__in'] = $ids;
						$query_args['orderby'] = 'post__in';

						return $query_args;
					}
				);
			}
		}

		return $block_content;
	}

	private function get_ids_from_content_picker( $posts ) {
		$ids = [];
		foreach ( $posts as $post ) {
			$ids[] = $post['id'];
		}
		return $ids;
	}
}
