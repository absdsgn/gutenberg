/**
 * External dependencies
 */

import { orderBy } from 'lodash';

/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Toolbar, Slot, DropdownMenu } from '@wordpress/components';
import { chevronDown } from '@wordpress/icons';

const POPOVER_PROPS = {
	position: 'bottom right',
	isAlternate: true,
};

const FormatToolbar = () => {
	return (
		<div className="block-editor-format-toolbar">
			<Toolbar>
				{ [ 'bold', 'italic', 'link', 'text-color' ].map(
					( format ) => (
						<Slot
							name={ `RichText.ToolbarControls.${ format }` }
							key={ format }
						/>
					)
				) }
				<Slot name="RichText.ToolbarControls">
					{ ( fills ) => {
						if ( fills.length === 0 ) {
							return null;
						}

						const allProps = fills.map(
							( [ { props } ] ) => props
						);
						const hasActive = allProps.some(
							( { isActive } ) => isActive
						);

						return (
							<DropdownMenu
								icon={ chevronDown }
								label={ __( 'More rich text controls' ) }
								controls={ orderBy( allProps, 'title' ) }
								popoverProps={ POPOVER_PROPS }
								toggleProps={
									hasActive
										? { className: 'is-pressed' }
										: undefined
								}
							/>
						);
					} }
				</Slot>
			</Toolbar>
		</div>
	);
};

export default FormatToolbar;
