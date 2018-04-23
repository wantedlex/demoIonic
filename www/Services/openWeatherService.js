// Definizione del modulo dedicato al servizio di OpenWeather
var meteoServiceModule = angular.module('Service.Meteo', []);

// Definizione del servizio factory
meteoServiceModule.factory('WeatherService', function($http, $q, $log){
    // Costanti interne al servizio
    var ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather?';               // Ricordati sempre di mettere l'http altrimenti potrebbe non funzionare
    var APPID = '&APPID=ee6b293d773f4fcd7e434f79bbc341f2';
    var LANGUAGE = '&lang=it';
    var FORMAT = '&units=metric';
    var _logPrefix = '[WEATHERSERVICE]';



    // Funzione che va a fare la richiesta del meteo dal servizio http
    var getWeather = function(latitude, longitude){
        var url = ENDPOINT + 'lat=' + latitude + '&lon=' + longitude + APPID + LANGUAGE + FORMAT;
        var deferred = $q.defer();
        
        $http.get(url)
            .then(function(result){
                $log.debug(_logPrefix + 'Informazioni correttamente ricevute', result);
                deferred.resolve(result.data);
            })
            .catch(function(err){
                $log.debug(_logPrefix + 'Errore nella richiesta delle informazioni', err);
                deferred.reject();
            });

        return deferred.promise;
    };



    // Oggetto di ritorno con le funzioni messe a disposizione dalla factory.
    return {
        getWeather: getWeather
    };
});