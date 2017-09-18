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
	$scope.submitCharacter = (name, race, notes, STR, DEX, CON, INT, WIS, CHA, HP, INITIATIVE, AC, FORT, REF, WILL, BAB, SPRES, GRAPPLE, id) => {
		// let obj = $scope.character;
		// console.log( "HELLO", obj, currrentUser );
		$scope.character.name = name;
		$scope.character.race = race; 
		$scope.character.storyline = notes;
		$scope.character.STR = STR;
		$scope.character.DEX = DEX;
		$scope.character.CON = CON;
		$scope.character.INT = INT;
		$scope.character.WIS = WIS;
		$scope.character.CHA = CHA;
		$scope.character.HP = HP;
		$scope.character.INITIATIVE = INITIATIVE;
		$scope.character.AC = AC;
		$scope.character.FORT = FORT;
		$scope.character.REF = REF;
		$scope.character.WILL = WILL;
		$scope.character.BAB = BAB;
		$scope.character.SPRES = SPRES;
		$scope.character.GRAPPLE = GRAPPLE;
		console.log("test", $routeParams.id, $scope.character);
		postFactory.editChar($routeParams.id, $scope.character)
		.then((data) => {
			$location.path('/MyCharacters');
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
$scope.feats = [];
$scope.equipment = [];
$scope.magicSchools = [];
$scope.spells = [];
$scope.regions = [];
$scope.yourRegionId = [];

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
//GET ALL REGIONS FOR USER 
function callRegions(){
		console.log("showMyRegions firing");
		postFactory.getUserRegions(userFactory.getCurrentUser())
			.then((data) => {
				// console.log("data", data);
				$scope.regions = data;
				// console.log("$scope.regionData", $scope.regionData);
			}).catch(function(){
			console.log("ERROR");
		});
	}
callRegions();

// FUNCTION TO ADD PUSHED ITEMS TO ARRAY OF CHARACTER
//handle pushing clicked item
	$scope.addRegion = (item) => {
		console.log("item", item.name);
		// $scope.yourRace.pop();
		$scope.character.region = item.name;
		$scope.character.regionId = item.id;
		console.log("added to form");
	};
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


//REMOVE ITEMS 
	$scope.removeClass = (item) => {
		console.log("item", item);
		$scope.character.class.splice(item);
		console.log("added to form");
	};
	$scope.removeSkill = (item) => {
		console.log("item", item);
		$scope.character.skills.splice(item);
		console.log("added to form");
	};
	$scope.removeFeat = (item) => {
		console.log("item", item);
		$scope.character.feats.splice(item);
		console.log("added to form");
	};
	$scope.removeEquipment = (item) => {
		console.log("item", item);
		$scope.character.equipment.splice(item);
		console.log("added to form");
	};
	$scope.removeMagicSchool = (item) => {
		console.log("item", item);
		$scope.character.magicschools.splice(item);
		console.log("added to form");
	};
	$scope.removeSpell = (item) => {
		console.log("item", item);
		$scope.character.spells.splice(item);
		console.log("added to form");
	};

});