var todosController = angular.module('starter.controllers');


todosController.controller('TodosController', function($log, TodosService){
    this.todosCommits = TodosService.getCommits();

    this.addItems = function(){
        TodosService.newCommit('Commit' + this.todosCommits.length);
    };
});