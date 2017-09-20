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
$scope.finalSkills = [];
$scope.feats = [];
$scope.finalFeats = [];
$scope.equipment = [];
$scope.finalEquipment = [];
$scope.magicSchools = [];
$scope.spells = [];
$scope.finalSpells = [];
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
			console.log("scope skills",$scope.skills);
			for (let i = 0; i < data.data.results.length; i++) {
				// console.log("for loop", data.data.results[i].url);
  				finalSkills(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}

function finalSkills (i){
	// console.log("THE URL", $scope.equipment[i].url);
	$http({ method : 'GET', 
			url: $scope.skills[i].url})
	.then(function(data){
		// console.log("FINAL EQUIPMENT", data);
		$scope.finalSkills.push(data);
		console.log("FINAL EQUIPMENT ARRAY", $scope.finalSkills);
	}).catch(function(error){
		console.log("ERROR NUMBER 2", error);
	});
}
callSkills();

function callFeats(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/features/'})
		.then(function(data){
			$scope.feats = data.data.results;
			for (let i = 0; i < data.data.results.length; i++) {
				// console.log("for loop", data.data.results[i].url);
  				finalFeats(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}

function finalFeats (i){
	// console.log("THE URL", $scope.equipment[i].url);
	$http({ method : 'GET', 
			url: $scope.feats[i].url})
	.then(function(data){
		// console.log("FINAL EQUIPMENT", data);
		$scope.finalFeats.push(data);
		// console.log("FINAL EQUIPMENT ARRAY", $scope.finalFeats);
	}).catch(function(error){
		console.log("ERROR NUMBER 2", error);
	});
}
callFeats();


function callEquipment(){
	$http({ method : 'GET',
		url : 'http://www.dnd5eapi.co/api/equipment/'})
		.then(function(data){
			$scope.equipment = data.data.results;
			// console.log("first call", data.data.results.length);
			for (let i = 0; i < data.data.results.length; i++) {
				// console.log("for loop", data.data.results[i].url);
  				finalEquipment(i);
			}
		})//.then for additional info
		.catch(function(){
			console.log("ERROR");
		});

}


function finalEquipment (i){
	// console.log("THE URL", $scope.equipment[i].url);
	$http({ method : 'GET', 
			url: $scope.equipment[i].url})
	.then(function(data){
		// console.log("FINAL EQUIPMENT", data);
		$scope.finalEquipment.push(data);
		// console.log("FINAL EQUIPMENT ARRAY", $scope.finalEquipment);
	}).catch(function(error){
		console.log("ERROR NUMBER 2", error);
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
			for (let i = 0; i < data.data.results.length; i++) {
				// console.log("for loop", data.data.results[i].url);
  				finalSpells(i);
			}
		})//.then for additional info
		.catch(function(){
			console.log("ERROR");
		});
}
function finalSpells (i){
	// console.log("THE URL", $scope.equipment[i].url);
	$http({ method : 'GET', 
			url: $scope.spells[i].url})
	.then(function(data){
		// console.log("FINAL EQUIPMENT", data);
		$scope.finalSpells.push(data);
		// console.log("FINAL EQUIPMENT ARRAY", $scope.finalSpells);
	}).catch(function(error){
		console.log("ERROR NUMBER 2", error);
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
		$scope.character.skills.push(item.data.name);
		console.log("added to form");
	};
	$scope.addFeat = (item) => {
		console.log("item", item, item.name);
		$scope.character.feats.push(item.data.name);
		console.log("added to form");
	};
	$scope.addEquipment = (item) => {
		console.log("item", item, item.name);
		$scope.character.equipment.push(item.data.name);
		console.log("added to form");
	};
	$scope.addMagicSchools = (item) => {
		console.log("item", item, item.name);
		$scope.character.magicschools.push(item.name);
		console.log("added to form");
	};
	$scope.addSpell = (item) => {
		console.log("item", item, item.name);
		$scope.character.spells.push(item.data.name);
		console.log("added to form");
	};


//REMOVE ITEMS 
	$scope.removeClass = (index) => {
		$scope.character.class.splice(index, 1);
		console.log("added to form");
	};
	$scope.removeSkill = (index) => {
		$scope.character.skills.splice(index, 1);
		console.log("added to form");
	};
	$scope.removeFeat = (index) => {
		$scope.character.feats.splice(index, 1);
		console.log("added to form");
	};
	$scope.removeEquipment = (index) => {
		$scope.character.equipment.splice(index, 1);
		console.log("added to form");
	};
	$scope.removeMagicSchool = (index) => {
		$scope.character.magicschools.splice(index, 1);
		console.log("added to form");
	};
	$scope.removeSpell = (index) => {
		$scope.character.spells.splice(index, 1);
		console.log("added to form");
	};

	$scope.yourStat =[];
var counter = 1;
	$scope.statNumber = () => {
		if (counter < 7){
			counter++;
			console.log("stat", $scope.yourStat);
			$scope.statNumber();
			$scope.yourStat.push(Math.floor(Math.random() * ((18 - 8) + 1 ) + 8));
		}else{
			counter = 1;
			$scope.yourStat =[];
		}
	};

});