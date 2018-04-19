// Definizione del modulo per il servizio
var geolocationModule = angular.module("Service.Geolocation", []);



// Definizione del servizio
geolocationModule.factory("GeolocationService", function($log, $q) {
  var _logPrefix = "[GEOLOCATION SERVICE]";
  var latitudineDiProva = 45.509737799999996;
  var longitudineDiProva = 9.232043899999999;



  // Funzione che restituisce un oggetto con le coordinate geografiche attuali
  var getPosition = function() {
    var deferred = $q.defer();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(posizioneCorrente) {
        var coords = {
          latitudine: posizioneCorrente.coords.latitude,
          longitudine: posizioneCorrente.coords.longitude
        };
        deferred.resolve(coords);
      }, function(erroreGeolocalizzazione){
            deferred.reject(erroreGeolocalizzazione);
      });
    }
    return deferred.promise;
  };



  // Oggetto di ritorno con tutti i metodi a disposizione di chi chiama il servizio
  return {
    getPosition: getPosition
  };
});
