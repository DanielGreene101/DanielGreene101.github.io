"use strict";

app.controller('myProfileCtrl', function ($scope, postFactory, userFactory, $location) {
	let user = userFactory.getCurrentUser();

	$scope.characterData = [];

//GET ALL CHARACTERS FOR USER 
	$scope.showMyCharacters = () => {
		console.log("showMyCharacters firing");
		postFactory.getUserCharacters(userFactory.getCurrentUser())
			.then((data) => {
				console.log("data", data);
				$scope.characterData = data;
				console.log("$scope.characterData", $scope.characterData);
			});
	};

	$scope.showMyCharacters();//CALLS ITSELF

//SCOPED DELETE BUTTON FIRING
	$scope.deleteBtn = (id) => {
		postFactory.deleteChar(id)
			.then(() => {
	            $scope.showMyCharacters();//UPDATES PAGE
	        });
		};

});