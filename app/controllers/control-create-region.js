"use strict";
app.controller('CreateMapCtrl', function ($scope, postFactory, userFactory) {

let user = userFactory.getCurrentUser();
console.log("user", user);
	$scope.regName = "";
	$scope.regInfo = "";


	let newRegion = {
		name: $scope.regName,
		info: $scope.regInfo,
		uid: user,
	};



	$scope.saveRegion = (regName, regInfo) => {

		$scope.regName = regName; 
		newRegion.name = $scope.regName;

		$scope.regInfo = regInfo; 
		newRegion.info = $scope.regInfo;

		var newRegionToAdd = newRegion;
		console.log("newRegionToAdd", newRegionToAdd);
		postFactory.addRegion(newRegionToAdd);
	};





});