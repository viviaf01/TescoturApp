// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;
var db_bck;
//

angular.module('app', [
    'app.controllers',
    'app.services',
    'ionic',
    'ngCordova',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular-md5'
])
        .constant('session', {
            userId: '',
            name: '',
            rol: ''
        })
        .run(function (ApiUsersService, $ionicPlatform, $cordovaSQLite) {
            "use strict";
            $ionicPlatform.ready(function () {
                //console.log('ready');
                
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)

                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
//alert(navigator.onLine);
                if (navigator.onLine == false) {

                    alert('El dispositivo no esta conectado a internet. Verifique su conexión e ingrese nuevamente a la aplicación');
                } else {
                    try {
                        // db = $cordovaSQLite.openDB({name:"credit.db",location:'default'});

                        if (window.cordova) {
                            db = $cordovaSQLite.openDB({name: "tescotur.db", location: 'default'});
                             db_bck = $cordovaSQLite.openDB({name: "tescotur_bck.db", location: 'default'});
                        } else {
                            db = window.openDatabase("tescotur.db", '1', 'my', 1024 * 1024 * 100); // browser
                            db_bck = window.openDatabase("tescot_bckur.db", '1', 'my', 1024 * 1024 * 100); // browser
                        }

                    } catch (error) {
                        alert(error);
                    }


                    //$cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS log_diario_conductor (ld_id INTEGER, ld_movil text, ld_conductor text, ld_fecha text, ld_foto INTEGER)');

                   //$cordovaSQLite.execute(db, 'DROP TABLE usuarios');


                    //$cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS usuarios (conusuario INTEGER PRIMARY KEY, nombre TEXT, usuario TEXT, contrasena TEXT, privilegio INTEGER, estado TEXT)');


                    // execute INSERT usuarios with parameter

                   /* ApiUsersService.get().then(function (data) {
                        for (let i = 0; i < data.response.length; i++) {
                            $cordovaSQLite.execute(db, 'INSERT INTO usuarios (conusuario,nombre,usuario,contrasena,privilegio,estado) VALUES (?,?,?,?,?,?)', [data.response[i].conUsuario, data.response[i].nombre, data.response[i].usuario, data.response[i].contrasena, data.response[i].privilegio, data.response[i].estado])
                                    .then(function (result) {
                                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                                    }, function (error) {
                                        alert("Error on saving: " + error.message);
                                    });
                        }
                    });*/
             
                }


                

            });//end ready
            
            /*document.addEventListener("resume", onResume, false);
            function onResume(){
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);
                    
                    $cordovaSQLite.execute(db, 'SELECT * FROM logUsuario WHERE conusuario =? AND fecha =?',[sessionStorage.userId,fecha])
                    .then(
                        function(res) {
                            
                            if (res.rows.length === 0) {

                                ionic.Platform.exitApp();
                            }
                            
                        },
                        function(error) {
                            alert("Error on loading: " + error.message);
                        }
                    );
            
                
                
              
            }*/
        })

///almacenamento variables de sesion



        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        url: '/tab',
                        abstract: true,
                        templateUrl: 'templates/tabs.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'app/login/index-login.html',
                        controller: 'LoginCtrl'
                    })



                    // Each tab has its own nav history stack:

                    //// Rutas
                    .state('tab.loan', { // consulta de ruta
                        url: '/loan',
                        views: {
                            'tab-loan': {
                                templateUrl: 'app/loans/index-loans.html',
                                controller: 'LoansCtrl',
                                controllerAs: 'loans'
                            }
                        }
                    })

                    .state('tab.enlist', {
                        url: '/enlist',
                        views: {
                            'tab-loan': {
                                templateUrl: 'app/enlist/index-enlist.html',
                                controller: 'EnlistCtrl',
                                controllerAs: 'enlist'
                            }
                        }
                    })

                    //// lista vehiculos
                    .state('tab.register', {
                        url: '/register',
                        views: {
                            'tab-loan': {
                                templateUrl: 'app/register/index-register.html',
                                controller: 'RegisterCtrl',
                                controllerAs: 'register'
                            }
                        }
                    })

//// Tarjetas
                    .state('tab.payments', { // consula de tarjetas nuevas
                        url: '/payments',
                        views: {
                            'tab-payments': {
                                templateUrl: 'app/payments/index-payments.html',
                                controller: 'PaymentsCtrl',
                                controllerAs: 'payments'
                            }
                        }
                    })

                    ///Crear Tarjetas


                    .state('tab.createpayments', { // creacion de tarjeta nueva
                        url: '/createpayments',
                        views: {
                            'tab-payments': {
                                templateUrl: 'app/createpayments/index-createpayments.html',
                                controller: 'CreatepaymentsCtrl',
                                controllerAs: 'Createpayments'
                            }
                        }
                    })



                    /// Clientes
                    .state('tab.clients', { /// clientes nuevos
                        url: '/clients',
                        views: {
                            'tab-clients': {
                                templateUrl: 'app/clients/index-clients.html',
                                controller: 'ClientsCtrl',
                                controllerAs: 'clients'
                            }
                        }
                    })

                    //// Gastos
                    .state('tab.dailyExpenses', {
                        url: '/dailyExpenses',
                        views: {
                            'tab-dailyexpenses': {
                                templateUrl: 'app/dailyExpenses/index-dailyExpenses.html',
                                controller: 'DailyExpensesCtrl',
                                controllerAs: 'dailyExpenses'
                            }
                        }
                    })


                    

//// renovar tarjeta
                    .state('tab.renovation', {
                        url: '/renovation',
                        views: {
                            'tab-loan': {
                                templateUrl: 'app/renovation/index-renovation.html',
                                controller: 'RenovationCtrl',
                                controllerAs: 'Renovation'
                            }
                        }
                    })
                    //// sincronizar
                    .state('tab.sync', {
                        url: '/sync',
                        views: {
                            'tab-sync': {
                                templateUrl: 'app/sync/index-sync.html',
                                controller: 'SyncCtrl',
                                controllerAs: 'sync'
                            }
                        }
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/login');
            $httpProvider.interceptors.push('httpInterceptor');
            
        });
