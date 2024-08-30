import { registerBlockExtension, ContentPicker } from '@10up/block-components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
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

	const previousPostTypeRef = useRef(query.postType);

	useEffect(() => {
		if (query.postType !== previousPostTypeRef.current && namespace === NAMESPACE) {
			const newAttributes = { ...attributes };

			if (newAttributes.query && newAttributes.query.include) {
				delete newAttributes.query.include;
			}

			newAttributes.selectedPosts = [];
			newAttributes.query = {
				...newAttributes.query,
				orderBy: 'date',
				perPage: newAttributes.query.perPage,
				include: [],
			};

			setAttributes(newAttributes);

			previousPostTypeRef.current = query.postType;
		}
	}, [query.postType, setAttributes, attributes, namespace]);

	// only allow this block extension to be used on the block variation
	if (namespace !== NAMESPACE) {
		return null;
	}

	return (
		<InspectorControls>
			<PanelBody title={__('Query Curation', 'curated-query-loop')} initialOpen>
				<ContentPicker
					mode="post"
					label={__(`Search for a ${query.postType}`, 'curated-query-loop')}
					contentTypes={[query.postType]}
					maxContentItems={query.perPage || 10}
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
