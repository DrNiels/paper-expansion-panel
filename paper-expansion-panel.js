/**
A Material Design [expansion panel with header and collapsible content](https://material.google.com/components/expansion-panels.html)

### Example

```html
<paper-expansion-panel header="Panel" summary="With event" on-toggle="onToggle">
  Lots of very interesting content.
</paper-expansion-panel>
```

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
--paper-expansion-panel-header|Mixin applied to the header of the panel|{}
--paper-expansion-panel-summary|Mixin applied to the summary of the panel|{}
--paper-expansion-panel-content|Mixin applied to collapsible content|{}

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
  */

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class PaperExpansionPanel extends PolymerElement {
    static get template() {
        return html`
    
		<style>
			.header {
				min-height: 48px;
				color: var(--primary-text-color);
				@apply --layout-center;
				@apply --layout-justified;
				@apply --paper-font-subhead;
				@apply --paper-expansion-panel-header;
				--paper-item-focused-before: {
				  background: inherit;
				}
			}

			.toggle {
				color: var(--disabled-text-color);
			}

			.content {
				@apply --paper-font-body1;
				@apply --paper-expansion-panel-content;
			}

			.summary {
				@apply --paper-expansion-panel-summary;
				color: var(--secondary-text-color);
			}

			.flex {
				@apply --layout-flex;
			}
		</style>

		<paper-item class="header" on-tap="_toggleOpened">
			<template is="dom-if" if="[[header]]">
				<div class="flex">[[header]]</div>

				<template is="dom-if" if="[[summary]]">
					<div hidden$="[[opened]]" class="flex summary">[[summary]]</div>
				</template>
			</template>

			<template is="dom-if" if="[[!header]]">
				<slot name="header"><div class="flex">&nbsp;</div></slot>
			</template>

			<paper-icon-button class="toggle" icon="[[_toggleIcon]]"></paper-icon-button>
		</paper-item>
		<iron-collapse class="content" opened="{{opened}}" no-animation="[[noAnimation]]">
			<slot></slot>
		</iron-collapse>
`;
    }

    static get is() {
        return 'paper-expansion-panel';
    }



    static get properties() {
        return {
            /**
             * Text in the header row
             */
            header: {
                type: String,
                value: '',
            },
            /**
             * Summary of the expandible area
             */
            summary: String,
            /**
             * True if the content section is opened
             */
            opened: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true
            },
            noAnimation: {
                type: Boolean,
                value: false
            },
            _toggleIcon: {
                type: String,
                computed: '_computeToggleIcon(opened)'
            }
        }
    }

    // Private methods
    /**
     * Fired whenever the status is changed (opened/closed)
     *
     * @event toggle
     */
    _toggleOpened(e) {
        this.opened = !this.opened;
        this.dispatchEvent(new Event('toggle'));
    }

    _computeToggleIcon(opened) {
        return opened ? 'icons:expand-less' : 'icons:expand-more';
    }
}

customElements.define(PaperExpansionPanel.is, PaperExpansionPanel);
