//Creo un nuovo sottomodulo di Service chiamato Todos
var moduleService = angular.module('Service.Todos', []);


//Lo definisco come factory chiamata TodosService
moduleService.factory('TodosService', function($log, $q){
    var _logPrefix = 'TodosService';
    var pathTodoList = 'todoList';
    var listCommit = [];

    // Metodo getter della lista dei commit: mi serve farlo che vada a leggere sul localStorage ogni volta, perché potrebbe essere un servizio
    // usato da altri controller e di conseguenza potrei avere inconsistenza dei dati.
    var getCommits = function(){
        if(localStorage && localStorage.getItem(pathTodoList)){
            listCommit = JSON.parse(localStorage.getItem(pathTodoList));
            $log.debug(_logPrefix + 'LETTURA', listCommit);
        }
        return listCommit;
    };


    //Metodo setter che mi permette di inserire un nuovo commit andando a riscrivere la localStorage
    var newCommit = function(commit){
        listCommit.push(commit);
        localStorage.setItem(pathTodoList, JSON.stringify(listCommit));
        $log.debug(_logPrefix + 'Nuovo commit',listCommit);
    };



    //Metodo delete che mi permette di cancellare un commit indicato dall'indice
    var deleteCommit = function(index){
        if(listCommit.length === 0) {
            alert('Non ci sono elementi da eliminare');
            return;
        }
        listCommit.splice(index, 1);
        localStorage.setItem(pathTodoList, JSON.stringify(listCommit));
        $log.debug(_logPrefix + 'Elimina commit', listCommit);
    };



    //Metodo getter che mi permette di ottenere il commit indicato dall'indice
    var getSingleCommit = function(index){
        if(localStorage && localStorage.getItem(pathTodoList)){
            listCommit = JSON.parse(localStorage.getItem(pathTodoList));
        }
        $log.debug(_logPrefix + 'getSingleCommit', listCommit);
        return listCommit[index];
    };



    // Metodo setter che mi permette di modificare un commit esistente.
    // Non faccio la lettura al localStorage perché sicuramente già ho fatto l'init della variabile listCommit quando ho chiamato getSingleCommit o getCommits
    var modifyCommit = function(index, value){
        var deferred = $q.defer;
        listCommit[index] = value;
        localStorage.setItem(pathTodoList, JSON.stringify(listCommit));
        $log.debug(_logPrefix + 'Modifica commit', listCommit);
    };
    

    return {
        getCommits: getCommits,
        newCommit: newCommit,
        deleteCommit: deleteCommit,
        getSingleCommit: getSingleCommit,
        modifyCommit: modifyCommit
    };


});