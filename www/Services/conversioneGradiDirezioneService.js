// Definizione del sottomodulo per la conversione dei gradi
var moduloConversioneGradiDirezione = angular.module('Service.ConvertDegDirection', []);

moduloConversioneGradiDirezione.factory('ConvertDegDirectionService', function($log){
    // Variabili interne al servizio
    var _logPrefix = '[CONVERTDEGDIRECTIONSERVICE] ';



    // Metodo che restituisce la direzione del vento verbose
    var convertDegToDirection = function(deg){
        if(((deg >= 0) && (deg <= 22.5)) || ((deg >= 337.5) && (deg <= 359.9))) {
            return 'Nord';
        }
        if((deg > 22.5) && (deg <= 67.5)) {
            return 'Nord-Est';
        }
        if((deg > 67.5) && (deg <= 112.5)) {
            return 'Est';
        }
        if((deg > 112.5) && (deg <= 157.5)) {
            return 'Sud-Est';
        }
        if((deg > 157.5) && (deg <= 202.5)) {
            return 'Sud';
        }
        if((deg > 202.5) && (deg <= 247.5)) {
            return 'Sud-Ovest';
        }
        if((deg > 247.5) && (deg <= 292.5)) {
            return 'Ovest';
        }
        if((deg > 292.5) && (deg <= 337.5)) {
            return 'Nord-Ovest';
        }
    };


    // Questo metodo restituisce il nome del vento a partire dal grado rispetto a cui soffia
    var convertDegToName = function(deg){
        if(((deg >= 0) && (deg <= 22.5)) || ((deg >= 337.5) && (deg <= 359.9))) {
            return 'Tramontana';
        }
        if((deg > 22.5) && (deg <= 67.5)) {
            return 'Grecale';
        }
        if((deg > 67.5) && (deg <= 112.5)) {
            return 'Levante';
        }
        if((deg > 112.5) && (deg <= 157.5)) {
            return 'Scirocco';
        }
        if((deg > 157.5) && (deg <= 202.5)) {
            return 'Mezzogiorno';
        }
        if((deg > 202.5) && (deg <= 247.5)) {
            return 'Libeccio';
        }
        if((deg > 247.5) && (deg <= 292.5)) {
            return 'Ponente';
        }
        if((deg > 292.5) && (deg <= 337.5)) {
            return 'Maestrale';
        }
    };


    // Oggetto che ritorna i metodi a disposizione
    return {
        conversioneGradiInDirezione: convertDegToDirection,
        conversioneGradiInNome: convertDegToName
    };

});
