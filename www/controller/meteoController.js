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
meteoModule.controller('MeteoController', function(GeolocationService, WeatherService, $log, $scope){
    // Variabili interne al controller
    var vm = this;
    var _logPrefix = '[METEO CONTROLLER]';

    
    
    // Definizione variabili di controller esposte alla view
    vm.loading = true;
    vm.city = 'Milano, MI, Italia';
    vm.weatherDescription = 'Rain';
    vm.speedOfWind = 0;
    vm.degOfWind = 0;
    vm.humidity = 0;
    vm.pressure = 0;
    vm.temperature = 0;
    vm.minTemperature = 0;
    vm.maxTemperature = 0;

    // Recupero informazioni da mostrare nella view
    vm.loadWeatherInformation = function(){
        GeolocationService.getPosition()
            .then( function (localPosition){                    // Vado a ricavarmi la posizione attuale
                return WeatherService.getWeather(localPosition.latitudine, localPosition.longitudine);
            })
            .then( function(localWeather){                      // Vado a ricavarmi il meteo della posizione attuale ricavata in precedenza
                vm.loading = false;
                vm.weatherDescription = localWeather.weather[0].description;
                vm.speedOfWind = localWeather.wind.speed;
                vm.degOfWind = localWeather.wind.deg;
                vm.humidity = localWeather.main.humidity;
                vm.pressure = localWeather.main.pressure;
                vm.temperature = Math.floor(localWeather.main.temp);
                vm.minTemperature = Math.floor(localWeather.main.temp_min);
                vm.maxTemperature = Math.floor(localWeather.main.temp_max);
            })
            .catch(function(errorLog) {
                $log.debug(_logPrefix + 'Errore', errorLog);
            }
        );
    };

    // Funzione di inizializzazione della view
    vm.init = function(){
        vm.loadWeatherInformation();
    };

    // Funzione associata al refresh delle informazioni
    vm.refreshWeatherInformation = function() {
        vm.loadWeatherInformation();
        $scope.$broadcast('scroll.refreshComplete');        // Mi permette di dire al refresher che il refresh è stato completato
    };

    vm.init();
});


