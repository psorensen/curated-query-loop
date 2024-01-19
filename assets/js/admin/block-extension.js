import { registerBlockExtension, ContentPicker } from '@10up/block-components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NAMESPACE } from './namespace';

const additionalAttributes = {
	selectedPosts: {
		type: 'array',
		default: [],
	},
};

const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { selectedPosts, query, namespace } = attributes;

	// only allow this block extension to be used on the block variation
	if (namespace !== NAMESPACE) {
		return null;
	}

	return (
		<InspectorControls>
			<PanelBody
				title={__('Query Curation', 'curated-query-loop')}
				initialOpen
				instructions="asdasdf"
			>
				<ContentPicker
					mode="post"
					label={__(`Search for a ${query.postType}`, 'curated-query-loop')}
					contentTypes={[query.postType]}
					maxContentItems={10}
					isOrderable
					excludeCurrentPost={false}
					content={selectedPosts}
					onPickChange={(pickedContent) => {
						setAttributes({
							selectedPosts: pickedContent,
							query: {
								...query,
								include: pickedContent.map((post) => post.id),
								orderBy: pickedContent.length > 0 ? 'include' : 'date',
								perPage: pickedContent.length,
								offset: 0,
							},
						});
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

registerBlockExtension('core/query', {
	extensionName: NAMESPACE,
	attributes: additionalAttributes,
	classNameGenerator: () => null,
	Edit: BlockEdit,
	order: 'before',
});
