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

    vm.init = function(){
        GeolocationService.getPosition().then( function (result){ vm.loading = false; console.log(_logPrefix + result);}).catch(console.log('asdasda'));

        // GeolocationService.getPosition()
        //     .then( function(coordinateAttuali){
        //         return WeatherService.getWeather(coordinateAttuali.latitudine, coordinateAttuali.longitudine);
        //     })
        //     .then( function(weatherResult){
        //         $log.debug(_logPrefix + 'Informazioni Corrette', weatherResult);
        //         vm.loading = false;
        //     });


        // var coords = GeolocationService.getPosition();
        // WeatherService.getWeather(coords.latitudine, coords.longitudine)
        //     .then(function(weatherResult){
        //         $log.debug(_logPrefix + 'Informazioni Corrette', weatherResult);
        //         vm.loading = false;
        //     });
    };

    vm.init();
});


