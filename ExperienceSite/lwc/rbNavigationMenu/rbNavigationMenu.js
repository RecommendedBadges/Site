import { LightningElement, api, track, wire } from 'lwc';

import getNavigationMenuItems from '@salesforce/apex/RBNavigationMenuController.getNavigationMenuItems';

export default class RbNavigationMenu extends LightningElement {
    @api navigationLinkSetDeveloperName;
    @track navigationMenuItems = [];

    isLoaded;
    error;

    @wire(getNavigationMenuItems, { navigationLinkSetDeveloperName: '$navigationLinkSetDeveloperName' })
    wiredNavigationMenuItems({ error, data }) {
        if(data) {
            this.navigationMenuItems = data.map((item, index) => {
                return {
                    target: item.actionValue,
                    id: index,
                    label: item.label,
                    type: item.actionType,
                    subMenu: item.subMenu,
                    imageUrl: item.imageUrl,
                    windowName: item.target
                }
            });
            this.isLoaded = true;
        } else if(error) {
            this.error = error;
            this.isLoaded = true;
        }
    }
}