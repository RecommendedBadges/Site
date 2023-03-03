/**
 * @description       : 
 * @author            : Ben Learn
 * @group             : 
 * @last modified on  : 03-03-2023
 * @last modified by  : Ben Learn
**/
public with sharing class RBNavigationMenuController {
    @AuraEnabled(cacheable=true)
    public static List<ConnectApi.NavigationMenuItem> getNavigationMenuItems(String navigationLinkSetDeveloperName, String publishStatus) {
        System.debug(Network.getNetworkId());
        //System.debug(ConnectApi.CommunityStatus);
        return null;
    }
}
// ConnectApi.​CommunityStatus	