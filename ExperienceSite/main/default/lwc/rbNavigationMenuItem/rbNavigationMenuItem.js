import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

export default class RbNavigationMenuItem extends NavigationMixin(LightningElement) {
    @api navigationMenuItem;
    href ='javascript:void(0);';
    pageReference;

    async connectedCallback() {
        const {type, target} = this.navigationMenuItem;
        if(!target) {
            return;
        } else if(type === 'InternalLink' || type === 'ExternalLink') {
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
    }

    handleClick(event) {
        event.stopPropagation();
    }
}