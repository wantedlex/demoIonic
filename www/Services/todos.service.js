//Creo un nuovo sottomodulo di Service chiamato Todos
var moduleService = angular.module('Service.Todos', []);


//Lo definisco come factory chiamata TodosService
moduleService.factory('TodosService', function($log){
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
        $log.debug(_logPrefix, listCommit);
        return listCommit;
    };


    var newCommit = function(commit){
        listCommit.push(commit);
        localStorage.setItem(pathTodoList, JSON.stringify(listCommit));
        $log.debug(_logPrefix,listCommit);
    };

    return {
        getCommits: getCommits,
        newCommit: newCommit
    };


});