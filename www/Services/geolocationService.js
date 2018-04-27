// Definizione del modulo per il servizio
var geolocationModule = angular.module("Service.Geolocation", []);



// Definizione del servizio
geolocationModule.factory("GeolocationService", function($log, $q, $http) {
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
        $log.debug(_logPrefix);
        deferred.resolve(coords);
      }, function(erroreGeolocalizzazione){
            deferred.reject(erroreGeolocalizzazione);
      });
    }
    return deferred.promise;
  };


  // Funzione che, date le coordinate geografiche, fornisce, per mezzo delle api google l'indirizzo
  var reverseGeocoding = function(latitude, longitude){
    var deferred = $q.defer();
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyD-fxKwF1sWWcV49zr9q0cT97l6fIqZj-E';
    $http.get(url).then(function(results){
        var jsonRisultati = {
                generici: {
                    acronimoStato: results.data.results[0].address_components[6].short_name,
                    stato: results.data.results[8].formatted_address,
                    numeroCivico: results.data.results[0].address_components[0].long_name,
                    via: results.data.results[0].address_components[1].long_name,
                    citta: results.data.results[0].address_components[2].long_name,
                    regione: results.data.results[0].address_components[5].long_name,
                    cap: results.data.results[0].address_components[7].long_name
                },
                indirizziFormattati: {
                    indirizzoEsteso: results.data.results[0].formatted_address,
                    indirizzoZonaEstesa: results.data.results[1].formatted_address,
                    cittaEstesa: results.data.results[2].formatted_address,
                    cittaEstesaConCAP: results.data.results[3].formatted_address,
                    cittaEstesaAlternativa: results.data.results[5].formatted_address,
                    areaCittadina: results.data.results[6].formatted_address,
                    regioneEstesa: results.data.results[7].formatted_address
                }
        };
        deferred.resolve(jsonRisultati);
    })
    .catch(function(){
        deferred.reject(_logPrefix + 'errore di reverse geocoding');
    });

    return deferred.promise;
  };



  // Oggetto di ritorno con tutti i metodi a disposizione di chi chiama il servizio
  return {
    getPosition: getPosition,
    reverseGeocoding: reverseGeocoding
  };
});
