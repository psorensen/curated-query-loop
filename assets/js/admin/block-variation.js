import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { NAMESPACE } from './namespace';

registerBlockVariation('core/query', {
	name: NAMESPACE,
	title: 'Curated Query Loop',
	isActive: ['namespace'],
	description: __(
		'A variation of the Query Loop that allows for curating specific posts',
		'curated-query-loop',
	),
	attributes: {
		namespace: NAMESPACE,
		query: {
			inherit: false,
			postType: 'post',
			include: [],
		},
	},
	allowedControls: ['postType'],
	innerBlocks: [
		[
			'core/post-template',
			{
				layout: {
					type: 'grid',
					columns: 3,
				},
			},
			[['core/post-featured-image'], ['core/post-title'], ['core/post-excerpt']],
		],
	],
	scope: ['inserter', 'transform'],
});
