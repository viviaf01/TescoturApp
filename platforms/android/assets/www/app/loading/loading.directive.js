/**
 * Loading Directive
 * @namespace Loading
 * @memberOf Directives
 */

(function () {
    'use strict';

    angular
            .module('app')
            .directive('loading', loading);

    // @ngInject
    loading.$inject = [];

    /**
     * @namespace loading
     * @desc loading Directive
     * @memberOf loading.Controller
     */
    function loading() {
        var directive = {
            retritc: 'A',
            link: loadingLink
        };
        return directive;
    }

    function loadingLink(scope, el, attr) {
        scope.$on('start', function () {
            return el.addClass('loading fa fa-spinner fa-spin ').attr('disabled', true);
        });
        scope.$on('stop', function () {
            return el.removeClass('loading fa fa-spinner fa-spin ').attr('disabled', false);
        });
    }

})();
