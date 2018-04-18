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
contactModule.controller('ContactsController', function($scope, $log, RandomUserService){
    //Variabili interne al controller
    var _logPrefix = '[CONTROLLER CONTACTS]';
    var vm = this;

    vm.refreshContactList = function(){
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');        // Questo mi serve per informare il componente ion-refresher che è stata completata l'operazione.
    };                                                      // Dall'altro lato, nel controller, ci sarà un watcher, listner o simile che sarà in ascolto di questo evento.
    
    //Variabili del controller esposte alla view
    vm.listOfContact = [];
    vm.loading = true;                      //Mi serve per togliere lo spinner quando ha finito il caricamento

    vm.init = function(){
        RandomUserService.getPeople(50,'fr,nl,us,es')
            .then(function(people){
                vm.listOfContact = people.data.results;                       // Assegno alla lista dei contatti tutti gli oggetti che vado a ricavarmi
                vm.loading = false;
                $log.debug(_logPrefix + 'ok', this.listOfContact);
            })
            .catch(function(){
                alert('Errore');
            });
    };

    vm.init();
});