// Creazione del modulo per il servizio randomuser
var randomUserModule = angular.module('Service.Randomuser', []);

// Creazione del servizio factory per gestire le chiamate http a randomuser
randomUserModule.factory('RandomUserService', function($http, $log, $q){
    var _logPrefix = '[RANDOMUSER_SERVICE]';
    var endpoint = 'https://randomuser.me/api/';


    // Recupero le informazioni dal servizio http
    var getPeople = function(numberOfResults, nationality){
        var deferred = $q.defer();
        var url = endpoint + '/?results=' + numberOfResults + '&nat=' + nationality;
        $http.get(url)
            .then(function(people){
                $log.debug(_logPrefix + 'Servizio http eseguito correttamente', people);
                deferred.resolve(people);   
            })
            .catch(function(){
                $log.debug(_logPrefix + 'Errore servizio http');
                deferred.eject();
            });

        return deferred.promise;                // Se ritorno deferred soltanto ottengo una istanza del servizio $q, mentre io in questo modo restituisco la promessa
    };


    //Oggetto di ritorno con tutti i metodi che mette a disposizione il servizio
    return {
        getPeople: getPeople
    };
    
});