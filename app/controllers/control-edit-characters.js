"use strict";

app.controller('EditCtrl', function($scope, userFactory, $location, postFactory, $routeParams, $http) {

	$scope.title = "Add Character";

	let currrentUser = userFactory.getCurrentUser();

	$scope.character = {
		name: "",
		race: "",
		class: [],
		skills: [],
		storyline: "",
		feats: [],
		proficiencies: [],
		spells: [],
		magicschools: [],
		equipment: []
	};

	const showEditChar = () => {
		console.log("$routeParams.id", $routeParams.id);
		postFactory.getSingleChar($routeParams.id)
		.then((data) => {
			$scope.character = data;
			$scope.character.id = $routeParams.id;
			$scope.character.uid = currrentUser;
		});
	};
//SUBMIT NEW/EDITED CHARACTER TO FIREBASE
	$scope.submitCharacter = () => {
		// let obj = $scope.character;
		// console.log( "HELLO", obj, currrentUser );
		console.log("test", $routeParams.id, $scope.character);
		postFactory.editChar($routeParams.id, $scope.character)
		.then((data) => {
			$location.path('/');
			// $scope.$apply();
		});
	};

	showEditChar();


//Empty arrays for api calls
$scope.races = [];
$scope.subraces = [];
$scope.classes = [];
$scope.subclasses = [];
$scope.skills = [];
$scope.proficiencies = [];
$scope.feats = [];
$scope.equipment = [];
$scope.magicSchools = [];
$scope.spells = [];
////// pull in api /////////
function callRaces(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/races/',})
		.then(function(data){
			$scope.races = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callRaces();

function callSubRaces(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/subraces/'})
		.then(function(data){
			$scope.subraces = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callSubRaces();

function callClasses(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/classes/'})
		.then(function(data){
			$scope.classes = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callClasses();

function callSubClasses(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/subclasses/'})
		.then(function(data){
			$scope.subclasses = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});
}
callSubClasses();

// function callLevels(){
// 	$http({ method : 'GET',
// 		url : 'http://www.dnd5eapi.co/api/{class name}/level/'})
// 		.then(function(data){
// 			$scope.races = data.data.results;
// 		})
// 		.catch(function(){
// 			console.log("ERROR");
// 		});

// }
// callLevels();

function callSkills(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/skills/'})
		.then(function(data){
			$scope.skills = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callSkills();

function callproficiencies(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/proficiencies/'})
		.then(function(data){
			$scope.proficiencies = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callproficiencies();


function callFeats(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/features/'})
		.then(function(data){
			$scope.feats = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callFeats();

function callEquipment(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/equipment/'})
		.then(function(data){
			$scope.equipment = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});

}
callEquipment();

function callmagicSchools(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/magic-schools/'})
		.then(function(data){
			$scope.magicSchools = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});
}
callmagicSchools();

function callSpells(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/spells/'})
		.then(function(data){
			$scope.spells = data.data.results;
		})
		.catch(function(){
			console.log("ERROR");
		});
}
callSpells();

// FUNCTION TO ADD PUSHED ITEMS TO ARRAY OF CHARACTER
//handle pushing clicked item
	$scope.addClass = (item) => {
		console.log("item", item, item.name);
		$scope.character.class.push(item.name);
		console.log("added to form");
	};
	$scope.addSkill = (item) => {
		console.log("item", item, item.name);
		$scope.character.skills.push(item.name);
		console.log("added to form");
	};
	$scope.addFeat = (item) => {
		console.log("item", item, item.name);
		$scope.character.feats.push(item.name);
		console.log("added to form");
	};
	$scope.addproficiency = (item) => {
		console.log("item", item, item.name);
		$scope.character.proficiencies.push(item.name);
		console.log("added to form");
	};
	$scope.addEquipment = (item) => {
		console.log("item", item, item.name);
		$scope.character.equipment.push(item.name);
		console.log("added to form");
	};
	$scope.addMagicSchools = (item) => {
		console.log("item", item, item.name);
		$scope.character.magicschools.push(item.name);
		console.log("added to form");
	};
	$scope.addSpell = (item) => {
		console.log("item", item, item.name);
		$scope.character.spells.push(item.name);
		console.log("added to form");
	};

	$scope.submitNotes = (notes) => {
		console.log("hello");
		console.log("notes", notes);
		$scope.character.storyline = notes;
		console.log("New SL", $scope.character.storyline);

	};
	$scope.submitName = (name) => {
		console.log("hello");
		console.log("yourName", name);
		$scope.character.name = name; 
		console.log("New Name", $scope.character.name);
	};

	$scope.submitRace = (race) => {
		console.log("hello");
		console.log("yourRame", race);
		$scope.character.race = race; 
		console.log("New Name", $scope.character.race);
	};

});