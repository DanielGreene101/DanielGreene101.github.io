"use strict";

app.controller('SingleCtrl', function($scope, userFactory, $location, postFactory, $routeParams, $http) {

	$scope.title = "Add Character";

	let currrentUser = userFactory.getCurrentUser();

	$scope.character = {
		name: "",
		race: "",
		class: [],
		skills: [],
		storyline: "",
		feats: [],
		spells: [],
		magicschools: [],
		region: [],
		RegionId: [],
		equipment: [],
		HP: "",
		INITIATIVE: "",
		AC: "",
		STR: "",
		DEX: "",
		CON: "",
		INT: "",
		WIS: "",
		CHA: "",
		FORT: "",
		REF: "",
		WILL: "",
		BAB: "",
		GRAPPLE: "",
		SPRES: ""
	};
	const showSingleChar = () => {//GET SINGLE CHARACTER TO SHOW ON PAGE 
		postFactory.getSingleChar($routeParams.id)
		.then((data) => {
			$scope.character = data;
			$scope.character.id = $routeParams.id;
			$scope.character.uid = currrentUser;
		});
	};
	showSingleChar();

});