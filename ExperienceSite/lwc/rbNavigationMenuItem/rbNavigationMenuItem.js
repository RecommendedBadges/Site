import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import RECOMMENDED_BADGES_LOGO from '@salesforce/contentAssetUrl/Rremovebgpreview';
import TRAILHEAD_LOGO from "@salesforce/contentAssetUrl/trailhead800x500";

// eslint-disable-next-line new-cap
export default class RbNavigationMenuItem extends NavigationMixin(LightningElement) {
    @api navigationMenuItem;
    href = '#';
    _menuItemImage;
    pageReference;
    target

    /* eslint-disable no-underscore-dangle */
    get menuItemImage() {
        if(!this._menuItemImage) {
            /* eslint-disable default-case */
            switch(this.navigationMenuItem.label) {
                case 'Trailhead':
                    this._menuItemImage = TRAILHEAD_LOGO;
                    break;
                case 'Home':
                    this._menuItemImage = RECOMMENDED_BADGES_LOGO;
                    break;
            }
        }
        return this._menuItemImage;
    } set menuItemImage(value) {
        this._menuItemImage = value;
    }

    /* eslint-disable @lwc/lwc/no-async-await */
    async connectedCallback() {
        const {type, target, windowName} = this.navigationMenuItem;
        if(!target) {
            return;
        } else if(type === 'InternalLink' || type === 'ExternalLink') {
            /* eslint-disable sort-keys */
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: target
                }
            };
        }

        if(this.pageReference) {
            this.href = await this[NavigationMixin.GenerateUrl](this.pageReference)
        }

        switch(windowName) {
            case 'CurrentWindow':
                this.target = "_self";
                break;
            case 'NewWindow':
                this.target = "_blank";
        }
    }

    /* eslint-disable class-methods-use-this */
    handleClick(event) {
        event.stopPropagation();
    }
}