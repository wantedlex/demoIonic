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
contactModule.controller('ContactsController', function($log, RandomUserService){
    var _logPrefix = '[CONTROLLER CONTACTS]';
    var vm = this;
    
    vm.listOfContact = [];

    vm.init = function(){
        RandomUserService.getPeople(50,'fr,nl,us,es')
            .then(function(people){
                vm.listOfContact = people.data.results;                       // Assegno alla lista dei contatti tutti gli oggetti che vado a ricavarmi
                $log.debug(_logPrefix + 'ok', this.listOfContact);
            })
            .catch(function(){
                alert('Errore');
            });
    };

    vm.init();
});