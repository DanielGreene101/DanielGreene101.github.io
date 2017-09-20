"use strict";

app.controller('userCtrl', function($scope, userFactory, $location, $window) {
	//RTN OBJ W/ USER COLLRCTION
	let createUserObj = (loginObj) => {
		return {
			email: loginObj.user.email,
			uid: loginObj.user.uid,
			photoURL: loginObj.user.photoURL
		};
	};
	let loginObjStorage = [];
	//register/login W/ GOOGLE
	$scope.logInGoogle = () => {
		loginObjStorage.length = 0;
		userFactory.authWithProvider()
		.then((userObj) => {
			$location.path('/home');
			let newUserObj = createUserObj(userObj);
			addPhotoAfterLogin(userObj);
			loginObjStorage.push(newUserObj);
			return newUserObj;
		})
		.then((newUserObj) => {
			let fbEmail = userFactory.getUserObj(newUserObj.email);
			return fbEmail;
		})
		.then((fbEmail) => {
			let fromFB = Object.keys(fbEmail.data);
			if(fromFB.length === 0) {
				userFactory.postUserObj(loginObjStorage[0]);
			}
			console.log("login successful");
		})
		.then(() => {
			$location.path('/home');
			$scope.$apply();
		})
		.catch((error) => {
			console.log("error from $scope.logInGoogle", error.message);
		});
	};
	//log out
	$scope.logOut = () => {
		userFactory.logOut()
		.then(() => {
			clearUserPhoto();
			let user = userFactory.getCurrentUser();
			$window.alert("LOGGED OUT!");
		})
		.catch((error) => {
			console.log("logout error", error.message);
		});
	};

});
function addPhotoAfterLogin (userObj) {
  $("#profile-image-anchor").append(
    `<img src="${userObj.user.photoURL}" id="profile-img" class="flex-sm-fill">`
  );
}
function clearUserPhoto (){
  $("#profile-image-anchor").empty();
}