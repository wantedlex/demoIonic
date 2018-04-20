// Definizione del modulo riguardante il meteo
var meteoModule = angular.module('MeteoModule', []);

// Configurazione del modulo del meteo
meteoModule.config(function($stateProvider){
    $stateProvider
        .state('tab.meteo', {
            url: '/meteo',
            views:{
                'meteo-tab': {
                    templateUrl: 'views/meteoView/meteo-tab.html',
                    controller: 'MeteoController as meteoCtrl'
                }
            }
        });
});


// Definizione del controller e delle sue funzionalità
meteoModule.controller('MeteoController', function(GeolocationService, WeatherService, $log){
    // Variabili interne al controller
    var vm = this;
    var _logPrefix = '[METEO CONTROLLER]';

    
    
    // Definizione variabili di controller esposte alla view
    vm.loading = true;
    vm.city = 'Milano, MI, Italia';
    vm.weatherDescription = 'Rain';

    vm.init = function(){
        GeolocationService.getPosition()
            .then( function (localPosition){                    // Vado a ricavarmi la posizione attuale
                return WeatherService.getWeather(localPosition.latitudine, localPosition.longitudine);
            })
            .then( function(localWeather){                      // Vado a ricavarmi il meteo della posizione attuale ricavata in precedenza
                vm.loading = false;
                vm.weatherDescription = localWeather.weather[0].description;
            })
            .catch(function(errorLog) {
                $log.debug(_logPrefix + 'Errore', errorLog);
            }
        );

        // WeatherService.getWeather(45.509737799999996, 9.232043899999999)
        //     .then( function(localWeather){                      // Vado a ricavarmi il meteo della posizione attuale ricavata in precedenza
        //         vm.loading = false;
        //         $log.debug(_logPrefix + 'localWeather', localWeather);
        //         alert(localWeather.weather[0].main + '\n' + localWeather.weather[0].description);
        //     })
        //     .catch(function(errorLog) {
        //         $log.debug(_logPrefix + 'Errore', errorLog);
        //     });
    };

    vm.init();
});


