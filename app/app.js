'use strict';

const app = angular.module('CharacterBuilds', ['ngRoute']);

let isAuth = (userFactory) => new Promise((resolve, reject) => {
	console.log( "userFactory is", userFactory );
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log( "YOU GOOD" );
			resolve();
		}  else  {
			console.log( "YOU ARE NOT AUTHORIZED" );
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
		controller: 'MyCharCtrl'
	})
	.when('/MyMaps', {
		templateUrl: 'partials/my-regions.html',
		controller: 'MyMapsCtrl'
	})
	.when('/CreateCharacter', {
		templateUrl: 'partials/character-creator.html',
		controller: 'CreateCharCtrl'
	})
	.when('/CreateRegion', {
		templateUrl: 'partials/create-regions.html',
		controller: 'CreateMapCtrl'
	})
	.when('/home', {
		//the first view when the user logs in
		templateUrl: 'partials/home-view.html',
		controller: 'HomeCtrl',
		resolve: {isAuth}

	})
	.otherwise('/');
});

//starts app with firebase credentials from ./app/values/fb-creds.js
app.run(($location, FBCreds) => {
	firebase.initializeApp(FBCreds);
});