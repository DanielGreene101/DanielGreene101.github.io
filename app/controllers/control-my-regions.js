"use strict";

app.controller('MyMapsCtrl', function ($scope, postFactory, userFactory, $location) {


	$scope.regionData = [];

	//GET ALL CHARACTERS FOR USER 
	$scope.showMyRegions = () => {
		console.log("showMyRegions firing");
		postFactory.getUserRegions(userFactory.getCurrentUser())
			.then((data) => {
				console.log("data", data);
				$scope.regionData = data;
				console.log("$scope.regionData", $scope.regionData);
			});
	};

	$scope.showMyRegions();//CALLS ITSELF

//SCOPED DELETE BUTTON FIRING
	$scope.regDeleteBtn = (id) => {
		postFactory.deleteReg(id)
			.then(() => {
	            $scope.showMyRegions();//UPDATES PAGE
	        });
		};



});