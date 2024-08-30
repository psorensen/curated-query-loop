import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { Placeholder } from '@wordpress/components';
import { postList as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * This file is responsible for displaying a placeholder when no posts
 * are selected in a Curated Query Loop.
 *
 * By default, the core Query block displays a "No Results Found" message,
 * however this is a bit confusing for users since they have not yet selected
 * any posts to display. This file also adds a class when the selectedPosts attribute
 * is empty in order to hide the confusing message.
 */

/**
 * Display a placeholder when no posts are selected in a Curated Query Loop.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @returns {Function} BlockEdit Modified block edit component.
 */
const withGettingStartedPlaceholder = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name } = props;
		if (name !== 'core/post-template') {
			return <BlockEdit {...props} />;
		}

		const {
			context: { query },
		} = props;

		const { include } = query;

		if (!include || include.length > 0) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockEdit {...props} />
				<Placeholder
					icon={icon}
					label={__('Curated Query Loop', 'curated-query-loop')}
					instructions={__(
						'Get started by selecting some posts from the righthand sidebar.',
						'curated-query-loop',
					)}
				/>
			</>
		);
	};
}, 'withGettingStartedPlaceholder');

/**
 * Add a class name to the block when there are no posts selected.
 *
 * Used to hide the core block's "No Results Found" message.
 */
const withNoPostsClass = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { name, attributes, className } = props;
		const { namespace } = attributes;
		if (name !== 'core/query' && namespace !== 'curated-query-loop') {
			return <BlockListBlock {...props} />;
		}
		const { query } = attributes;
		const { include } = query;
		const cn = classnames(className, {
			'has-no-posts': include && include.length < 1,
		});
		return <BlockListBlock {...props} className={cn} />;
	};
}, 'withNoPostsClass');

addFilter(
	'editor.BlockEdit',
	'curated-query-loop/empty-posts-placeholder',
	withGettingStartedPlaceholder,
);

addFilter('editor.BlockListBlock', 'curated-query-loop/empty-posts-classname', withNoPostsClass);
