/**
 * @description       : Apex controller for rbNavigationMenu LWC.
 * @author            : Ben Learn
 * @last modified on  : 03-04-2023
 * @last modified by  : Ben Learn
**/
public with sharing class RBNavigationMenuController {
    public static final Boolean ADD_HOME_MENU_ITEM = true;
    public static final Boolean INCLUDE_IMAGE_URL = false;

    // the ConnectApi.NavigationMenu.getCommunityNavigationMenu() takes either of the Navigation Link Set ID or Developer Name, but can't take both
    public static final String NAVIGATION_LINK_SET_ID = null;

    // ignore Event (not supported in custom component navigation menus) and System Link (not supported in navigation menus) menu item types
    public static final List<ConnectApi.NavigationMenuItemType> MENU_ITEMS_TO_SKIP = new List<ConnectApi.NavigationMenuItemType> {
        ConnectApi.NavigationMenuItemType.Event,
        ConnectApi.NavigationMenuItemType.SystemLink
    };

    /**
     * Returns navigation menu items for the current Experience site and provided Navigation Link Set. Used for navigation menus in LWR sites.
     * @param navigationLinkSetDeveloperName 
     * @return  `List<ConnectApi.NavigationMenuItem>`
     */
    @AuraEnabled(cacheable=true)
    public static List<ConnectApi.NavigationMenuItem> getNavigationMenuItems(String navigationLinkSetDeveloperName) {
        ConnectApi.Community experienceSite = ConnectApi.Communities.getCommunity(Network.getNetworkId());

        ConnectApi.NavigationMenuItemCollection navigationMenu = ConnectApi.NavigationMenu.getCommunityNavigationMenu(
            Network.getNetworkId(), 
            NAVIGATION_LINK_SET_ID, 
            navigationLinkSetDeveloperName, 
            (experienceSite.status == ConnectApi.CommunityStatus.Live) ? ConnectApi.PublishStatus.Live : ConnectApi.PublishStatus.Draft, 
            INCLUDE_IMAGE_URL, 
            ADD_HOME_MENU_ITEM, 
            MENU_ITEMS_TO_SKIP
        );

        return navigationMenu.menuItems;
    }
}