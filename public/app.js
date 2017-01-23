(function() {
    // 'use strict';
    var iData = angular.module("iData", ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngSanitize']);
    iData.controller("mainController", mainController);

    /**ngInject */
    function mainController() {
        var vm = this;
        vm.signInGoogle = signInGoogle;
        vm.signOutGoogle = signOutGoogle;

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

        //Logout user
        btnLogout.addEventListener('click', e => {
            firebase.auth().signOut();
        })

        //realtime firebase auth
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
                btnLogout.classList.remove('hide');
            } else {
                console.log("no auth user found");
                btnLogout.classList.add('hide');
            }
        });

        //Google signin
        var provider = new firebase.auth.GoogleAuthProvider();

        function signInGoogle() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(user);
                btnLogin.classList.add('hide');
                window.location.href = "profile.html";
                vm.user = user;
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(error.code)
                console.log(error.message)
            });
        }

        function signOutGoogle() {
            firebase.auth().signOut()

            .then(function() {
                console.log('Signout Succesfull')
            }, function(error) {
                console.log('Signout Failed')
            });
        }

    }
})();