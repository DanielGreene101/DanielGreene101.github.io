'use strict';

const app = angular.module('CharacterBuilds', ['ngRoute']);

let isAuth = (userFactory, $window) => new Promise((resolve, reject) => {
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log( "YOU GOOD" );
			resolve();
		}  else  {
			console.log( "YOU ARE NOT AUTHORIZED" );
			$window.alert("NOT LOGGED IN!!!");
			reject();
		}
	});
});


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		//the initial view will be a login screen
		templateUrl: 'partials/login-register.html',
		controller: 'userCtrl'
	})
	.when('/MyCharacters', {
		templateUrl: 'partials/my-characters.html',
		controller: 'myProfileCtrl',
		resolve: {isAuth}
	})
	.when('/MyRegions', {
		templateUrl: 'partials/my-regions.html',
		controller: 'MyMapsCtrl',
		resolve: {isAuth}
	})
	.when('/CreateCharacter', {
		templateUrl: 'partials/character-creator.html',
		controller: 'CreateCharCtrl',
		resolve: {isAuth}
	})
	.when('/CreateRegion', {
		templateUrl: 'partials/create-regions.html',
		controller: 'CreateMapCtrl',
		resolve: {isAuth}
	})
	.when('/EditCharacter/:id', {
		//the first view when the user logs in
		templateUrl: 'partials/edit-character.html',
		controller: 'EditCtrl',
		resolve: {isAuth}
	})
	.when('/EditRegion/:id', {
		//the first view when the user logs in
		templateUrl: 'partials/edit-region.html',
		controller: 'EditRegionCtrl',
		resolve: {isAuth}
	})
	.when('/singleCharacter/:id', {
		//the first view when the user logs in
		templateUrl: 'partials/single-character.html',
		controller: 'SingleCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

//starts app with firebase credentials from ./app/values/fb-creds.js
app.run(($location, FBCreds) => {
	firebase.initializeApp(FBCreds);
});
