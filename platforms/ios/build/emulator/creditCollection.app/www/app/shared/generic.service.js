/**
 * DailyExpensesService
 * @namespace DailyExpensesService
 * @memberOf Services
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('GenericService', GenericService);

  GenericService.$inject = [];

  /**
   * @namespace DailyExpensesService
   * @memberOf DailyExpenses
   */
  function GenericService() {
    var vm = this;

    vm.data={};
    vm.scPosition=0;

    var service = {
            getData: __getData,
            setData: __setData,
            setValor: __setValor,
            getValor: __getValor

    };

    return service;

    function __getData(){
    
        return vm.data;
    }

    function __setData(data){

        vm.data=data;

    }
    function __setValor(valor){
        vm.scPosition=valor;
    }
    function __getValor(){
        return vm.scPosition;
    }


  }
})();
