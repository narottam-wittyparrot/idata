(function() {
    'use strict';
    var iData = angular.module("iData", ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages']);
    iData.controller("mainController", mainController);

    /**ngInject */
    function mainController() {
        var vm = this;
    }
})();