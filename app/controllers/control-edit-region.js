"use strict";

app.controller('EditRegionCtrl', function($scope, userFactory, $location, postFactory, $routeParams, $http) {

	$scope.title = "Edit Region";

	let currrentUser = userFactory.getCurrentUser();

	$scope.regions = {
		name: "",
		info: ""
	};

	const showEditRegion = () => {
		console.log("$routeParams.id", $routeParams.id);
		postFactory.getSingleRegion($routeParams.id)
		.then((data) => {
			$scope.regions = data;
			$scope.regions.id = $routeParams.id;
			$scope.regions.uid = currrentUser;
		});
	};
//SUBMIT NEW/EDITED CHARACTER TO FIREBASE
	$scope.submitRegion = () => {
		// let obj = $scope.character;
		// console.log( "HELLO", obj, currrentUser );
		console.log("test", $routeParams.id, $scope.regions);
		postFactory.editRegion($routeParams.id, $scope.regions)
		.then((data) => {
			$location.path('/MyRegions');
			// $scope.$apply();
		});
	};

	showEditRegion();

});
