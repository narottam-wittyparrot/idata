(function() {
    // 'use strict';
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

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC2x2SerK6z4qYxqaGE52DXGSurfoYhgr8",
        authDomain: "idata-63d87.firebaseapp.com",
        databaseURL: "https://idata-63d87.firebaseio.com",
        storageBucket: "idata-63d87.appspot.com",
        messagingSenderId: "718977291419"
    };
    firebase.initializeApp(config);
    // Get elements

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // Add login event
    btnLogin.addEventListener('click', e => {
        //Get email and password
        const email = txtEmail.value;
        console.log(email);
        const password = txtPassword.value;
        const auth = firebase.auth();
        //signin
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    //Create user
    btnSignUp.addEventListener('click', e => {
        //Get email and password
        //TODO:check for real email
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        //signin
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    //realtime firebase auth
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log("no auth user found");
        }
    });

})();