var todosModule = angular.module('TodosModule');

todosModule.config(function($stateProvider){
    $stateProvider
  
    .state('tab.modify', {
      url: '/todos/modify/:indexCommit',
      views: {
        'todos-tabs':{
          templateUrl: 'views/todosView/modifyTodos-view.html',
          controller: 'ModifyTodosController as modifyCtrl'
        }
      }
    });
});


todosModule.controller('ModifyTodosController', function($log, $stateParams, TodosService, $state){
  //Variabili del controller
  var indexCommit = $stateParams.indexCommit;
  var _logPrefix = '[CONTROLLER MODIFICA]';
  
  //Variabili di scope
  this.labelButtonAdd = '';
  this.textInputNameCommit = '';

  // Funzione di inizializzazione 
  this.init = function(){
    if(indexCommit < 0) {
      this.labelButtonAdd = 'Aggiungi promemoria';
      this.buttonActionAccept = insertNewCommit;
    } else {
      this.labelButtonAdd = ' Modifica promemoria';
      this.buttonActionAccept = modifyExistCommit;
      this.textInputNameCommit = TodosService.getSingleCommit(indexCommit);
    }
  };

  // Funzione associata all'inserimento di nuovo promemoria
  var insertNewCommit = function(){
    $log.debug(_logPrefix + 'Inserimento', this);
    TodosService.newCommit(this.textInputNameCommit);
    $state.go('tab.todos');                               // Mi permette di tornare nello stato tab.todos
  };


  // Funzione associata alla modifica di un promemoria esistente
  var modifyExistCommit = function(){
    $log.debug(_logPrefix + 'Modifica', this);
    TodosService.modifyCommit(indexCommit, this.textInputNameCommit);
    $state.go('tab.todos');
  };


  //Inizializzo il controller -> attenzione perché la funzione init è una funzione predefinita angular per il preload della pagina
  this.init();


});