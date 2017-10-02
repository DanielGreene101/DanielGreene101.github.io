"use strict";

app.controller('myProfileCtrl', function ($scope, postFactory, userFactory, $location) {
	let user = userFactory.getCurrentUser();

	$scope.playDeleted = function() {
        var audio = new Audio('./sounds/DELETED.wav');
        audio.play();
    };

	$scope.characterData = [];

//GET ALL CHARACTERS FOR USER 
	$scope.showMyCharacters = () => {
		console.log("showMyCharacters firing");
		postFactory.getUserCharacters(userFactory.getCurrentUser())
			.then((data) => {
				$scope.characterData = data;
			});
	};

	$scope.showMyCharacters();//CALLS ITSELF

//SCOPED DELETE BUTTON FIRING
	$scope.deleteBtn = (id) => {
		postFactory.deleteChar(id)
			.then(() => {
	            $scope.showMyCharacters();//UPDATES PAGE
	            $scope.playDeleted();
	        });
		};

});