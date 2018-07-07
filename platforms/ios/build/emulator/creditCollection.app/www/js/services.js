angular.module('app.services', [])
    .service('ApiUsersService', function($q,$http) {
        var urlService = "http://brapres.net/datos_app/";
        return {
            get: __get
        }
        function __get(id) {
            if(!id){
              id="";
            }
            var url = urlService + "usuarios/" + id;
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {
            return {
                error: true,
                message: error
            };
        }

    })
.service('ApiHappyDaysService', function($q,$http,session) {


        var urlService = "http://brapres.net/datos_app/";

        return {
            getHappyDays: __getHappyDays
        }
        function __getHappyDays() {

            var url = urlService + "festivos/";

            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {

            return {
                error: true,
                message: error
            };
        }

    })


.service('ApiClientsService', function($q,$http,session) {

        var urlService = "http://brapres.net/datos_app/";
        return {
            getLoan: __getLoan
        }
        function __getLoan() {

            //alert("ApiClientsService usuarios/" + sessionStorage.userId+"/rutas/clientes/");
            var url = urlService + "usuarios/" + sessionStorage.userId+"/rutas/clientes/";
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {
            return {
                error: true,
                message: error
            };
        }

    })

    // descargar tarjetas

    .service('ApiLoanService', function($q,$http,session) {

        var urlService = "http://brapres.net/datos_app/";
        return {
            getTarj: __getTarj
        }
        function __getTarj() {
            var url = urlService + "usuarios/" + sessionStorage.userId+"/rutas/clientes/tarjetas";
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getComplete(response) {
         
            return response.data;
        }

        function getFailed(error) {
            return {
                error: true,
                message: error
            };
        }

    })


// descargar rutas

// descargar tarjetas

    .service('ApiRoutesService', function($q,$http,session) {

        var urlService = "http://brapres.net/datos_app/";
        return {
            getRoutes: __getRoutes
        }
        function __getRoutes() {
            var url = urlService + "usuarios/" + sessionStorage.userId+"/rutas/";
            //alert(url);
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {
            return {
                error: true,
                message: error
            };
        }

    })

// descargar festivos


// descargar Conceptos de Egresos

 .service('ApiExpensesTypeService', function($q,$http,session) {

        var urlService = "http://brapres.net/datos_app/";
        return {
            getETS: __getETS
        }
        function __getETS() {
            var url = urlService + "conceptosegr/";
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {
            return {
                error: true,
                message: error
            };
        }

    })


// create a new factory
.factory ('StorageService', function ($localStorage) {

  $localStorage = $localStorage.$default({
  things: []
});

var _getAll = function () {
  return $localStorage.things;
};
var _add = function (thing) {
  $localStorage.things.push(thing);
}
var _remove = function (thing) {
  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
}
return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
