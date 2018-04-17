// Definizione del modulo dei contatti
var contactModule = angular.module('ContactModule', []);


// Configurazione del modulo dei contatti
contactModule.config(function($stateProvider){
    $stateProvider.state('tab.contact',{
        url: '/contacts',
        views: {
            'contacts-tab':{
                templateUrl: 'views/contactsView/contacts-tabs.html',
                controller: 'ContactsController as contactCtrl'
            }
        }
    });
});


// Controller per la view dei contatti
contactModule.controller('ContactsController', function(){
    
});