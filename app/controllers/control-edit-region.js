"use strict";

app.controller('EditRegionCtrl', function($scope, userFactory, $location, postFactory, $routeParams, $http) {

	$scope.title = "Edit Region";

	let currrentUser = userFactory.getCurrentUser();

	$scope.regions = {
		name: "",
		info: ""
	};

	const showEditRegion = () => {//SET UP EDIT PAGE WITH INFO
		postFactory.getSingleRegion($routeParams.id)
		.then((data) => {
			$scope.regions = data;
			$scope.regions.id = $routeParams.id;
			$scope.regions.uid = currrentUser;
		});
	};
//SUBMIT NEW/EDITED CHARACTER TO FIREBASE
	$scope.submitRegion = () => {
		postFactory.editRegion($routeParams.id, $scope.regions)
		.then((data) => {
		});
	};

	showEditRegion();

});
