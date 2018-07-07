/**
 * DailyExpensesService
 * @namespace DailyExpensesService
 * @memberOf Services
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('DailyExpensesService', DailyExpensesService);

  DailyExpensesService.$inject = ['$cordovaSQLite','session'];

  /**
   * @namespace DailyExpensesService
   * @memberOf DailyExpenses
   */
  function DailyExpensesService($cordovaSQLite,session) {
    var service = {
      getGastosList: __getGastosList,
      getExpensesType: __getExpensesType,
      InsertExpense: __InsertExpense,
      ExistExpense: __ExistExpense,
      DelExpense: __DelExpense,
      DeleteExpenseID: __DeleteExpenseID
    };

    return service;

    
    function __getGastosList() {

        var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);


      return $cordovaSQLite.execute(db, 'SELECT e.valor, c.nombre,e.idegreso FROM egreso e, conceptoegreso c where e.idconceptoegreso=c.idconceptoegreso and e.fecha=? ',[fecha])
                .then(
                    function(res) {
                        var response=[];
                        if (res.rows.length > 0) {

                                for (var i=0; i<res.rows.length; i++) {
                                    response.push(res.rows.item(i));
                                    //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }
                                
                                

                        }
                        return response;
                        //alert("RESP=>"+response.length);
                        
                    },
                    function(error) {
                        return false;
                        alert("Error on loading: " + error.message);
                    }
                );

    }

    function __InsertExpense(data){

      var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      return $cordovaSQLite.execute(db, 'insert into egreso (valor, fecha, idconceptoegreso,observaciones,idruta) values (?,?,?,?,?) ',[data.valor,fecha,data.idconceptoegreso.idconceptoegreso,data.observaciones,sessionStorage.idruta]).then(
                    function(res) {

                      //alert("Se inserto un gasto");

                        return true;
                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                        return false;
                    }
                );


    }

    function __ExistExpense(data){

       // alert("existe"+fecha+" "+data.idconceptoegreso.idconceptoegreso+" "+sessionStorage.idruta);
        var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      return $cordovaSQLite.execute(db, 'select * from egreso where fecha=? and  idconceptoegreso=? and idruta=? ',[fecha,data.idconceptoegreso.idconceptoegreso,sessionStorage.idruta]).then(
                    function(res) {

                      if(res.rows.length>0){
                             return true;
                      }
                      //alert("Se inserto un gasto");


                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                        return false;
                    }
                );
    }

    function __DelExpense(data){

        var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      return $cordovaSQLite.execute(db, 'delete from egreso where fecha=? and  idconceptoegreso=? and idruta=? ',[fecha,data.idconceptoegreso.idconceptoegreso,sessionStorage.idruta]).then(
                    function(res) {


                             return true;

                      //alert("Se inserto un gasto");


                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                        return false;
                    }
                );
    }

    function __DeleteExpenseID(idEgreso){
        //alert(idEgreso);
        return $cordovaSQLite.execute(db, 'delete from egreso where idegreso=? ',[idEgreso]).then(
                    function(res) {


                             return true;

                      //alert("Se inserto un gasto");


                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                        return false;
                    }
                );

    }
    function __getExpensesType(){

      return $cordovaSQLite.execute(db, 'SELECT * FROM conceptoegreso where oculto=? ',[0])
                .then(
                    function(res) {
                        var response=[];

                        //console.log(res.rows.length);
                        if (res.rows.length > 0) {

                                for (var i=0; i<res.rows.length; i++) {
                                    response.push(res.rows.item(i));
                                    //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }
                            return response;

                        }else{
                            return false;
                        }
                        //alert(response)
                        
                    },
                    function(error) {
                        return false;
                        alert("Error on loading: " + error.message);
                    }
                );

    }




  }
})();
