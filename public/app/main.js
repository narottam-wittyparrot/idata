(function() {
    'use strict';
    var iData = angular.module("iData", ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngSanitize']);
    iData.controller("mainController", mainController);

    /**ngInject */
    function mainController() {
        var vm = this;
    }
    // material theme for app
    iData.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('customTheme')
            .primaryPalette('grey')
            .accentPalette('orange')
            .warnPalette('red');
    });

})();