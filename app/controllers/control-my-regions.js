"use strict";

app.controller('MyMapsCtrl', function ($scope, postFactory, userFactory, $location) {


	$scope.regionData = [];
	$scope.characterData = [];

	//GET ALL REGIONS FOR USER 
	$scope.showMyRegions = () => {
		// console.log("showMyRegions firing");
		postFactory.getUserRegions(userFactory.getCurrentUser())
			.then((data) => {
				// console.log("data", data);
				$scope.regionData = data;
				// console.log("$scope.regionData", $scope.regionData);
			});
	};

	//PULL IN CHARACTERS WITH MATCHING REGION
		$scope.showThisRegionsCharacters = () =>{
			console.log("showThisRegionsCharacters firing");
			//pull in character data
			postFactory.getUserCharacters(userFactory.getCurrentUser())
				.then((data) => {
					console.log("data", data);
					$scope.characterData = data;
					console.log("$scope.characterData", $scope.characterData);
				});


	};
	$scope.showThisRegionsCharacters();
	$scope.showMyRegions();//CALLS ITSELF

	//SCOPED DELETE BUTTON FIRING
		$scope.regDeleteBtn = (id) => {
			postFactory.deleteReg(id)
				.then(() => {
		            $scope.showMyRegions();//UPDATES PAGE
		        });
			};



});