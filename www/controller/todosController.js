var todosController = angular.module('TodosModule', []);

todosController.config(function($stateProvider) {
    $stateProvider
    .state('tab.todos', {
        url: '/todos',
        views: {
        'todos-tabs': {
            templateUrl: 'views/todosView/todos-tabs.html',
            controller: 'TodosController as ctrlTodos'
        }
        }
    });
});


todosController.controller('TodosController', function($log, TodosService, $q, $rootScope, $window){
    this.todosCommits = TodosService.getCommits();

    this.addItems = function(){
        TodosService.newCommit('Commit' + this.todosCommits.length);
    };

    this.removeCommit = function(index){
        TodosService.deleteCommit(index);
    };

    $rootScope.$on('updateTodos', function(){
        //this.todosCommits = TodosService.getCommits();            // Per quanto possa essere brutta, non sono riuscito a farlo aggiornare
        $window.location.reload(true);                              // devo pensarci.
    });
    // $scope.$on('$ionicView.enter', function(){
    //     alert();
    // })

});