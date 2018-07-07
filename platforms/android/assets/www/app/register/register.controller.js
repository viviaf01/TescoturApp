/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['RegisterService', 'GenericService', '$state', '$window', '$ionicHistory','$ionicLoading','$ionicScrollDelegate','$http'];

    /**
     * @namespace LoansCtrl
     * @desc Loans Controller
     * @param {Object[]} Dependencies
     * @memberOf Loans.Controller
     */
    function RegisterCtrl(RegisterService, GenericService, $state, $window, $ionicHistory,$ionicLoading,$ionicScrollDelegate,$http) {
        $ionicLoading.show();
        var vm = this;
        vm.recorridos = {};
        vm.tareas=[];
       

        vm.guardarPago = __guardarPago;
        vm.cargarDetalle = __cargarDetalle;
        vm.eliminarPago = __eliminarPago;
        vm.guardarPagoAuto = __guardarPagoAuto;
        vm.askEliminarPago = __askEliminarPago;
        vm.askGuardarPagoAuto = __askGuardarPagoAuto;
        //nuevos tescotur
        vm.iniciarRuta= __iniciarRuta;
        vm.finalizarRuta=__finalizarRuta;
        vm.actualizarTareas=__actualizarTareas;
        vm.numIniciar=0;
        
        $ionicLoading.hide();
            
        activate();

        function activate() {
             $ionicLoading.show();
            vm.recorridos = GenericService.getData();
         
            for(var i=0;i<vm.recorridos.length;i++){
                
                vm.tareas.push(vm.recorridos[i]);
               
                if(vm.tareas[i].td_estado==null && vm.numIniciar==0){
                
                vm.tareas[i].iniciarBoton=false;
                vm.tareas[i].finalizarBoton=true;
                
                vm.numIniciar=1;
                }
                else if(vm.tareas[i].td_estado==null && vm.numIniciar>0){
             
                vm.tareas[i].iniciarBoton=true;
                vm.tareas[i].finalizarBoton=true;
                }
                else if(vm.recorridos[i].td_estado=='Iniciado'){
       
                vm.tareas[i].iniciarBoton=true;
                vm.tareas[i].finalizarBoton=false;
                vm.numIniciar=1;
                
                }
                else if(vm.recorridos[i].td_estado=='Finalizado'){
       
                vm.tareas[i].iniciarBoton=true;
                vm.tareas[i].finalizarBoton=true;
                
                
                }
              
                
            }
             $ionicLoading.hide();
            
           // console.log(vm.tareas);

        }
       function __actualizarTareas(){
           //console.log("__actualizarTareas");
           //console.log(vm.tareas);
           
           $ionicLoading.show();
           vm.numIniciar=0;
           
           for(var i=0;i<vm.tareas.length;i++){
             //   console.log("numIniciar "+i+" "+vm.numIniciar);
                
                
                if(vm.tareas[i].td_estado==null && vm.numIniciar==0){
                
                vm.tareas[i].iniciarBoton=false;
                vm.tareas[i].finalizarBoton=true;
                
                vm.numIniciar=1;
                }
                else if(vm.tareas[i].td_estado==null && vm.numIniciar>0){
             
                vm.tareas[i].iniciarBoton=true;
                vm.tareas[i].finalizarBoton=true;
                }
                else if(vm.recorridos[i].td_estado=='Iniciado'){
       
                vm.tareas[i].iniciarBoton=true;
                vm.tareas[i].finalizarBoton=false;
                vm.numIniciar=1;
                
                }
                else if(vm.recorridos[i].td_estado=='Finalizado'){
       
                vm.tareas[i].iniciarBoton=true;
                vm.tareas[i].finalizarBoton=true;
                
                
                }
               
                
            }
            $ionicLoading.hide();
       }
        
        function __iniciarRuta(dp_id,idrecorrido,vehiculo,td_estado){
            
           // console.log("iniciarRuta"+dp_id+" "+idrecorrido+" "+vehiculo+" "+td_estado);
            
                var respuesta=RegisterService.saveTarea(dp_id,idrecorrido,vehiculo);
                

               for(var i=0;i< vm.tareas.length;i++){


                   if(vm.tareas[i].dp_id==dp_id){
                       
                      
                       vm.tareas[i].iniciarBoton=true;
                       vm.tareas[i].finalizarBoton=false;
                       vm.tareas[i].td_estado="Iniciado";
                   } 
                   
                }
                
                
          
            
            __actualizarTareas();
        }
        
 function __finalizarRuta(dp_id,idrecorrido,vehiculo,td_estado){
            
           // console.log("finalizarRuta"+dp_id+" "+idrecorrido+" "+vehiculo+" "+td_estado);
           
             
           
                
                var respuesta=RegisterService.actualizarTarea(dp_id,idrecorrido,vehiculo);
                console.log(respuesta);
                vm.numIniciar=0;

               for(var i=0;i< vm.tareas.length;i++){


                   if(vm.tareas[i].dp_id==dp_id){
                      
                       vm.tareas[i].iniciarBoton=true;
                       vm.tareas[i].finalizarBoton=true;
                       vm.tareas[i].td_estado="Finalizado";
                   }else{
                       if(vm.tareas[i].td_estado==null && vm.numIniciar==0){
                
                        vm.tareas[i].iniciarBoton=false;
                        vm.tareas[i].finalizarBoton=true;

                        vm.numIniciar=1;
                        }
                        else if(vm.tareas[i].td_estado==null && vm.numIniciar>0){

                        vm.tareas[i].iniciarBoton=true;
                        vm.tareas[i].finalizarBoton=true;
                        }
                        else if(vm.recorridos[i].td_estado=='Iniciado'){

                        vm.tareas[i].iniciarBoton=true;
                        vm.tareas[i].finalizarBoton=false;
                        vm.numIniciar=1;

                        }
                        else if(vm.recorridos[i].td_estado=='Finalizado'){
       
                        vm.tareas[i].iniciarBoton=true;
                        vm.tareas[i].finalizarBoton=true;


                        }
                   }               
                }
                __actualizarTareas();
           
        }
        //// Viejos
        function __askEliminarPago() {

            if (confirm('¿Desea eliminar el pago?') == true) {

                __eliminarPago();

            }
        }

        function __eliminarPago() {
            RegisterService.updateTarjetaEliminar(vm.data).then(
                    function (actualiza) {
                        if (actualiza == true) {
                            /////
                            RegisterService.DeletePayment(vm.data).then(
                                    function (elimino) {
                                        if (elimino == true) {
                                            alert("Ultimo pago eliminado");

                                            GenericService.setValor(vm.scPosition);
                                            $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.loan');
                                            });
                                        }
                                    }
                            );
                        }
                    }
            );

        }

        function __cargarDetalle(cTarjeta) {

            RegisterService.getDetalleTarjeta(cTarjeta).then(
                    function (detalle) {
                        vm.dettarj = detalle;
//register.data.vrpagado
                        vm.nCPagas = vm.dettarj[0].numcpagadas;
                        vm.data.contarjeta = vm.dettarj[0].contarjeta;
                        vm.data.valpagado = vm.dettarj[0].valpagado;
                        if (vm.dettarj[0].iddetalle > 0) {
                            vm.detpago = false;
                        } else {
                            vm.detpago = true;
                        }


                        var xDimensions = Math.floor(vm.dettarj[0].numcuotas / 24);  ///30 =2 cuadriculas
                        var yDimensions = 4; ///numero de columnas

                        var contcuota = 1;
                        var cont = 1;
                        var next = 0;
                        var valor = 0;

                        for (var cLoop = 0; cLoop < xDimensions; cLoop++) { /// 2 cuadriculas
                            vm.ncuotas[cLoop] = [];

                            for (var xLoop = 1; xLoop <= 6; xLoop++) {
                                vm.ncuotas[cLoop][xLoop] = [];

                                for (var yLoop = 1; yLoop <= 4; yLoop++) {

                                    if (yLoop == 1) {
                                        if ((xLoop + (cLoop * 24)) <= vm.dettarj[0].numcuotas) {
                                            valor = (xLoop + (cLoop * 24));
                                        } else {
                                            valor = 0;
                                        }

                                        vm.ncuotas[cLoop][xLoop][yLoop - 1] = valor;
                                        next = xLoop + (cLoop * 24) + 6;

                                    } else {
                                        if ((next) <= vm.dettarj[0].numcuotas) {
                                            valor = next;
                                        } else {
                                            valor = 0;
                                        }

                                        vm.ncuotas[cLoop][xLoop][yLoop - 1] = valor;
                                        next = next + 6;
                                    }


                                    cont++;
                                    contcuota++;
                                }
                            }
                        }
                    }

            )


        }

///metodo
        function __askGuardarPagoAuto(contarjeta, numcuota, estado) {

            if (estado != 'payed') {
                if (vm.ultimasCPagas > 0 && numcuota > 0) {
                    alert('Debe eliminar el pago antes de ingresar uno nuevo');

                } else {

                    if (numcuota > vm.nCPagas && numcuota > 0) {
                        if (confirm('¿Desea guardar el pago hasta la cuota ' + numcuota+' ?') == true) {
                            vm.data.vrpagado =(((numcuota - vm.nCPagas) * vm.valorCuota)-vm.vr_tiene).toFixed(2);
                            __guardarPagoAuto(contarjeta);
                        }
                    }


                }
            }

        }
        function __guardarPagoAuto(contarjeta) {

            RegisterService.ConsultarTarjetaPA(contarjeta).then(
                    function (valcuota) {
                        //vm.data.vrpagado=valcuota;


                        RegisterService.ExistPayment(vm.data).then(
                                function (existe) {

                                    if (existe == true) {

                                        RegisterService.updateTarjetaEliminar(vm.data).then(
                                                function (actualiza) {
                                                    if (actualiza == true) {
                                                        /////
                                                        RegisterService.DeletePayment(vm.data).then(
                                                                function (elimino) {
                                                                    if (elimino == true) {
                                                                        RegisterService.InsertPayment(vm.data).then(
                                                                                function (registrado) {
                                                                                    if (registrado == true) {
                                                                                        RegisterService.updateTarjetaInsercion(vm.data).then(
                                                                                                function (actualizado) {
                                                                                                    if (actualizado == true) {
                                                                                                        RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                                                                function (verificado) {

                                                                                                                    if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                                                                        RegisterService.finalizarTarjeta(vm.data).then(
                                                                                                                                function (finalizado) {
                                                                                                                                    if (finalizado == true) {
                                                                                                                                        alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                                                                        //__cargarDetalle(vm.data.contarjeta);
                                                                                                                                        GenericService.setValor(vm.scPosition);
                                                                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                                                                            $state.go('tab.loan');
                                                                                                                                        });


                                                                                                                                    }
                                                                                                                                }
                                                                                                                        );



                                                                                                                    } else {

                                                                                                                        alert("Se registro el pago correctamente");
                                                                                                                        // __cargarDetalle(vm.data.contarjeta);
                                                                                                                        GenericService.setValor(vm.scPosition);
                                                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                                                            $state.go('tab.loan');
                                                                                                                        });

                                                                                                                    }
                                                                                                                }
                                                                                                        );

                                                                                                    }
                                                                                                }
                                                                                        )
                                                                                    }
                                                                                }
                                                                        )
                                                                    }
                                                                }
                                                        )
                                                        ////
                                                    }
                                                })

                                    } else {

                                        RegisterService.InsertPayment(vm.data).then(
                                                function (registrado) {
                                                    if (registrado == true) {
                                                        RegisterService.updateTarjetaInsercion(vm.data).then(
                                                                function (actualizado) {
                                                                    if (actualizado == true) {
                                                                        RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                                function (verificado) {
                                                                                    if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                                        RegisterService.finalizarTarjeta(vm.data).then(
                                                                                                function (finalizado) {
                                                                                                    if (finalizado == true) {
                                                                                                        alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                                        //__cargarDetalle(vm.data.contarjeta);
                                                                                                        GenericService.setValor(vm.scPosition);
                                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                                            $state.go('tab.loan');
                                                                                                            
                                                                                                        });

                                                                                                    }
                                                                                                }
                                                                                        );



                                                                                    } else {

                                                                                        alert("Se registro el pago correctamente");
                                                                                        // __cargarDetalle(vm.data.contarjeta);
                                                                                        GenericService.setValor(vm.scPosition);
                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                            $state.go('tab.loan');
                                                                                        });

                                                                                    }
                                                                                }
                                                                        );


                                                                    }
                                                                }
                                                        )

                                                    }
                                                }
                                        )

                                    }
                                }

                        )
                    }
            );

        }

        function __guardarPago() {

            RegisterService.ExistPayment(vm.data).then(
                    function (existe) {

                        if (existe == true) {

                            RegisterService.updateTarjetaEliminar(vm.data).then(
                                    function (actualiza) {
                                        if (actualiza == true) {
                                            /////
                                            RegisterService.DeletePayment(vm.data).then(
                                                    function (elimino) {
                                                        if (elimino == true) {
                                                            RegisterService.InsertPayment(vm.data).then(
                                                                    function (registrado) {
                                                                        if (registrado == true) {
                                                                            RegisterService.updateTarjetaInsercion(vm.data).then(
                                                                                    function (actualizado) {
                                                                                        if (actualizado == true) {
                                                                                            RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                                                    function (verificado) {

                                                                                                        if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                                                            RegisterService.finalizarTarjeta(vm.data).then(
                                                                                                                    function (finalizado) {
                                                                                                                        if (finalizado == true) {
                                                                                                                            alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                                                                            GenericService.setValor(vm.scPosition);
                                                                                                                            $ionicHistory.clearCache().then(function () {
                                                                                                                                $state.go('tab.loan');
                                                                                                                            });

                                                                                                                        }
                                                                                                                    }
                                                                                                            );



                                                                                                        } else {

                                                                                                            alert("Se registro el pago correctamente");
                                                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                                                            GenericService.setValor(vm.scPosition);
                                                                                                            $ionicHistory.clearCache().then(function () {
                                                                                                                $state.go('tab.loan');
                                                                                                            });

                                                                                                        }
                                                                                                    }
                                                                                            );

                                                                                        }
                                                                                    }
                                                                            )
                                                                        }
                                                                    }
                                                            )
                                                        }
                                                    }
                                            )
                                            ////
                                        }
                                    })

                        } else {

                            RegisterService.InsertPayment(vm.data).then(
                                    function (registrado) {
                                        if (registrado == true) {
                                            RegisterService.updateTarjetaInsercion(vm.data).then(
                                                    function (actualizado) {
                                                        if (actualizado == true) {
                                                            RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                    function (verificado) {
                                                                        if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                            RegisterService.finalizarTarjeta(vm.data).then(
                                                                                    function (finalizado) {
                                                                                        if (finalizado == true) {
                                                                                            alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                                            GenericService.setValor(vm.scPosition);
                                                                                            $ionicHistory.clearCache().then(function () {
                                                                                                $state.go('tab.loan');
                                                                                            });

                                                                                        }
                                                                                    }
                                                                            );



                                                                        } else {

                                                                            alert("Se registro el pago correctamente");
                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                            GenericService.setValor(vm.scPosition);
                                                                            $ionicHistory.clearCache().then(function () {
                                                                                $state.go('tab.loan');
                                                                            });

                                                                        }
                                                                    }
                                                            );


                                                        }
                                                    }
                                            )

                                        }
                                    }
                            )

                        }
                    }

            )

        }



        ///// fin pago automatico
    }
})();
