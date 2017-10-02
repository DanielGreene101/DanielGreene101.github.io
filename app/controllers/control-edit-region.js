"use strict";

app.controller('EditRegionCtrl', function($scope, userFactory, $location, postFactory, $routeParams, $http) {

	$scope.title = "Edit Region";

	let currrentUser = userFactory.getCurrentUser();

	//SOUNDS
	$scope.playCreated = function() {
        var audio = new Audio('./sounds/CREATED.wav');
        audio.play();
    };
	$scope.playEdit = function() {
        var audio = new Audio('./sounds/EDIT.wav');
        audio.play();
    };
    $scope.playEdit();


    

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
			$location.path('/MyRegions');
			$scope.playCreated();
		});
	};

	showEditRegion();

});
