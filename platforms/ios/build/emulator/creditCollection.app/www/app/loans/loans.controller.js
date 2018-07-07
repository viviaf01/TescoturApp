/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('LoansCtrl', LoansCtrl);

    LoansCtrl.$inject = ['LoansService', 'GenericService', '$state', '$ionicHistory','$ionicLoading','$ionicScrollDelegate','$location'];

    /**
     * @namespace LoansCtrl
     * @desc Loans Controller
     * @param {Object[]} Dependencies
     * @memberOf Loans.Controller
     */
    function LoansCtrl(LoansService, GenericService, $state, $ionicHistory,$ionicLoading, $ionicScrollDelegate,$location) {

        var vm = this;
        vm.delegate="";
        vm.scPosition="";
        vm.customerList = {};

        vm.buscarcliente = "";
        vm.consultarCliente = __consultarCliente;
        vm.consultarTarjeta = __consultarTarjeta;
        vm.borrarConsulta = __borrarConsulta;
        vm.renovarTarjeta = __renovarTarjeta;
        vm.colores = __colores;
        vm.cartera = "";
        vm.total_clientes = "";

        //vm.isReload = $stateParams[0];

        // alert("inside controller"+vm.isReload);
        //  vm.idcliente="";

        // $scope.listItems= [];
        // $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS clientes (concliente INTEGER PRIMARY KEY, idcliente INTEGER , nombre TEXT, ocupacion TEXT, dir INTEGER, numtelefono TEXT, idruta INTEGER)');

        activate();

        function activate() {

             
            
            $ionicLoading.show();
            LoansService.getCustomerList().then(function (customerList) {
               
                // console.log(customerList);
                if (customerList == false) {

                    alert('Debe descargar datos');
                    
                    $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.sync');
                                                $ionicLoading.hide();
                                            });
                                            
                        
                    
                    //$state.go('tab.sync');
                } else {
                    vm.scPosition=GenericService.getValor();
                    
                    vm.customerList = customerList;
                    vm.total_clientes = customerList.length;

                    LoansService.getCustomerLoans().then(function (cartera) {
                        vm.cartera = cartera;
                        
                      if(vm.scPosition>0){
                            $location.hash(vm.scPosition);   //set the location hash
                            var handle = $ionicScrollDelegate.$getByHandle('myPageDelegate');
                            handle.anchorScroll(true); 
                      } 
                      
                      $ionicLoading.hide();
                    });
                    
                 
                    
                }
                
                
            });
            
            
           
           




        }


        function __colores(tarjeta, nDias, cuotas) {
//  console.log('entro_colores');

             if (nDias >= 12) {
                 return "color4";
             }
             else if (nDias < 3) {
                //return "#FFF";
                return "color1";
            } else if (nDias >= 3 && nDias < 6) {
                if (cuotas >= 2) {
                    //  return "#FFF";
                    return "color1";
                } else if (cuotas < 2 && cuotas > 0) {
                    //  return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 0) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 6 && nDias < 9) {
                if (cuotas >= 4) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 4 && cuotas > 2) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 2) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 9 && nDias < 12) {
                if (cuotas >= 6) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 6 && cuotas > 3) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 3) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 12 && nDias < 15) {
                if (cuotas >= 8) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 8 && cuotas > 4) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 4) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 15 && nDias < 18) {
                if (cuotas >= 10) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 10 && cuotas > 5) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 5) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 18 && nDias < 21) {
                if (cuotas >= 12) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 12 && cuotas > 6) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 6) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 21 && nDias < 24) {
                if (cuotas >= 14) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 14 && cuotas > 7) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 7) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 24 && nDias < 27) {
                if (cuotas >= 16) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 16 && cuotas > 8) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 8) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 27 && nDias < 30) {
                if (cuotas >= 18) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 18 && cuotas > 9) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 9) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 30 && nDias < 33) {
                if (cuotas >= 20) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 20 && cuotas > 10) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 10) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 33 && nDias < 36) {
                if (cuotas >= 22) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 22 && cuotas > 11) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 11) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 36 && nDias < 39) {
                if (cuotas >= 24) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 24 && cuotas > 12) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 12) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 39 && nDias < 42) {
                if (cuotas >= 26) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 26 && cuotas > 13) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 13) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 42 && nDias < 45) {
                if (cuotas >= 28) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 28 && cuotas > 14) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 14) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 45 && nDias < 48) {
                if (cuotas >= 30) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 30 && cuotas > 15) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 15) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 48 && nDias < 51) {
                if (cuotas >= 32) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 32 && cuotas > 16) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 16) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 51 && nDias < 54) {
                if (cuotas >= 34) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 34 && cuotas > 17) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 17) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 54 && nDias < 57) {
                if (cuotas >= 36) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 36 && cuotas > 18) {
                    //  return "#A6E9AF";
                    return "color2";

                } else if (cuotas <= 18) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 57 && nDias < 60) {
                if (cuotas >= 38) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 38 && cuotas > 19) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 19) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 60 && nDias < 63) {
                if (cuotas >= 40) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 40 && cuotas > 20) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 20) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 63 && nDias < 66) {
                if (cuotas >= 42) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 42 && cuotas > 21) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 21) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 66 && nDias < 69) {
                if (cuotas >= 44) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 44 && cuotas > 22) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 22) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 66 && nDias < 69) {
                if (cuotas >= 44) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 44 && cuotas > 22) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 22) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 69 && nDias < 72) {
                if (cuotas >= 46) {
                    //return "#FFF";
                    return "color1";
                } else if (cuotas < 46 && cuotas > 23) {
                    //return "#A6E9AF";
                    return "color2";
                } else if (cuotas <= 23) {
                    //return "#AAE";
                    return "color3";
                }
            } else if (nDias >= 72) {
                //return "#AAE";
                return "color3";
            }

        }
        function __consultarCliente() {

            // alert(vm.buscarcliente);

            if (vm.buscarcliente != "") {

                LoansService.getCustomerListWhere(vm.buscarcliente).then(function (customerList) {

                    // alert(customerList);
                    vm.customerList = customerList;



                    LoansService.getCustomerLoans().then(function (cartera) {

                        vm.cartera = cartera;
                    });
                    //alert(customerList.length+'  '+customerList.item(0).nombre);

                });

            } else {


                LoansService.getCustomerList().then(function (customerList) {

                    // alert(customerList);
                    vm.customerList = customerList;
                    //alert(customerList.length+'  '+customerList.item(0).nombre);

                    LoansService.getCustomerLoans().then(function (cartera) {

                        vm.cartera = cartera;
                    });

                });

            }

        }
        function __borrarConsulta() {

            LoansService.getCustomerList().then(function (customerList) {

                // alert(customerList);
                vm.customerList = customerList;
                //alert(customerList.length+'  '+customerList.item(0).nombre);

                LoansService.getCustomerLoans().then(function (cartera) {

                    vm.cartera = cartera;
                });

            });
        }


        function __consultarTarjeta(contr) {
            //alert(vm.idcliente);

            //  alert("hola"+contr);
            LoansService.getDetalleTarjeta(contr).then(function (dettarj) {


                if (dettarj.length == 1) {
                    
                    GenericService.setData(dettarj);
                    $ionicHistory.clearCache().then(function () {
                        $state.go('tab.register');
                    });
                    
                    // console.log("Editing " + id);
                }

            });



        }


        function __renovarTarjeta(contr) {
            //alert(vm.idcliente);

            //alert("hola"+contr);
            LoansService.getDetalleTarjeta(contr).then(function (dettarj) {

//lert(dettarj.length);
                if (dettarj.length == 1) {

                    GenericService.setData(dettarj);
                    $ionicHistory.clearCache().then(function () {
                         $state.go('tab.renovation');
                    });
                   
                    // console.log("Editing " + id);
                }

            });



        }


///Nuevo Colores Cartera



/// Fin nuevo colores cartera
        
    }
})();
