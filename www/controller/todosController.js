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


todosController.controller('TodosController', function($log, TodosService, $q, $scope, $window){
    var vm = this;                                                      // Se non metto questo vm qua, quando ritorno dalla pagina di modifica succede che lo scope 
                                                                        // non si aggiorna e l'array non viene modificato. In questo modo l'array si modifica.
    // Variabili esposte alla view
    vm.todosCommits = TodosService.getCommits();

    vm.addItems = function(){
        TodosService.newCommit('Commit' + this.todosCommits.length);
    };

    vm.removeCommit = function(index){
        TodosService.deleteCommit(index);
    };


    $scope.$on('$ionicView.enter', function(){
        vm.todosCommits = TodosService.getCommits(); 
    });
});