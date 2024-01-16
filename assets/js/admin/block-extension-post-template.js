/**
 * WordPress Dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { Placeholder } from '@wordpress/components';
import { loop } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import classnames from 'classnames';

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
					icon={loop}
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
const withClientIdClassName = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { name, attributes, className } = props;
		const { namespace } = attributes;
		if (name !== 'core/query' && namespace !== 'curated-query-loop') {
			return <BlockListBlock {...props} />;
		}
		const { query } = attributes;
		const { include = [] } = query;
		const cn = classnames(className, {
			'has-no-posts': include.length < 1,
		});
		return <BlockListBlock {...props} className={cn} />;
	};
}, 'withClientIdClassName');

addFilter(
	'editor.BlockEdit',
	'curated-query-loop/empty-posts-placeholder',
	withGettingStartedPlaceholder,
);

addFilter(
	'editor.BlockListBlock',
	'curated-query-loop/empty-posts-classname',
	withClientIdClassName,
);
