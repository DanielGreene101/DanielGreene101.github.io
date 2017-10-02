"use strict";

app.controller('EditCtrl', function($scope, userFactory, $location, postFactory, $routeParams, $http) {

	$scope.title = "Add Character";

	let currrentUser = userFactory.getCurrentUser();

	$scope.playEdit = function() {
        var audio = new Audio('./sounds/EDIT.wav');
        audio.play();
    };
    $scope.playEdit();

//EMPTRY CHARACTER TO BE FILLED FOR PUSH
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
//PULLS IN INFO FOR EDIT
	const showEditChar = () => {
		postFactory.getSingleChar($routeParams.id)
		.then((data) => {
			$scope.character = data;
			$scope.character.id = $routeParams.id;
			$scope.character.uid = currrentUser;
		});
	};
//SUBMIT NEW/EDITED CHARACTER TO FIREBASE
	$scope.submitCharacter = (name, race, notes, STR, DEX, CON, INT, WIS, CHA, HP, INITIATIVE, AC, FORT, REF, WILL, BAB, SPRES, GRAPPLE, id) => {
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
		url : 'http://www.dnd5eapi.co/api/races/',})//PULL IN DATA FROM API
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
			for (let i = 0; i < data.data.results.length; i++) {
  				finalSkills(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}

function finalSkills (i){
	$http({ method : 'GET', 
			url: $scope.skills[i].url})
	.then(function(data){
		$scope.finalSkills.push(data);
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
			for (let i = 0; i < data.data.results.length; i++) {//FIRE SECOND API CALL WITH LOOP THIS IS DONE BY PULLING URL FROM FIRST CALL
  				finalFeats(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}

function finalFeats (i){
	$http({ method : 'GET', 
			url: $scope.feats[i].url})//SECDOND API CALL FOR ADDITIONAL INFO 
	.then(function(data){
		$scope.finalFeats.push(data);
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
			for (let i = 0; i < data.data.results.length; i++) {
  				finalEquipment(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}


function finalEquipment (i){
	$http({ method : 'GET', 
			url: $scope.equipment[i].url})
	.then(function(data){
		$scope.finalEquipment.push(data);
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
  				finalSpells(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});
}
function finalSpells (i){
	$http({ method : 'GET', 
			url: $scope.spells[i].url})
	.then(function(data){
		$scope.finalSpells.push(data);
	}).catch(function(error){
		console.log("ERROR NUMBER 2", error);
	});
}
callSpells();

//GET ALL REGIONS FOR USER 
function callRegions(){
		console.log("showMyRegions firing");
		postFactory.getUserRegions(userFactory.getCurrentUser())//PULL IN USERS CREATED REGIONS USING USER ID
			.then((data) => {
				$scope.regions = data;
			}).catch(function(){
			console.log("ERROR");
		});
	}
callRegions();

// FUNCTION TO ADD PUSHED ITEMS TO ARRAY OF CHARACTER
//handle pushing clicked item
	$scope.addRegion = (item) => {
		$scope.character.region = item.name;
		$scope.character.regionId = item.id;
		console.log("added to form");
	};
	$scope.addClass = (item) => {
		$scope.character.class.push(item.name);
		console.log("added to form");
	};
	$scope.addSkill = (item) => {
		$scope.character.skills.push(item.data.name);
		console.log("added to form");
	};
	$scope.addFeat = (item) => {
		$scope.character.feats.push(item.data.name);
		console.log("added to form");
	};
	$scope.addEquipment = (item) => {
		$scope.character.equipment.push(item.data.name);
		console.log("added to form");
	};
	$scope.addMagicSchools = (item) => {
		$scope.character.magicschools.push(item.name);
		console.log("added to form");
	};
	$scope.addSpell = (item) => {
		$scope.character.spells.push(item.data.name);
		console.log("added to form");
	};


//REMOVE ITEMS 

//functions removing selected items from their prospective divs
	$scope.removeClass = (index) => {
		$scope.character.class.splice(index, 1);
		console.log("Removed from form");
	};
	$scope.removeSkill = (index) => {
		$scope.character.skills.splice(index, 1);
		console.log("Removed from form");
	};
	$scope.removeFeat = (index) => {
		$scope.character.feats.splice(index, 1);
		console.log("Removed from form");
	};
	$scope.removeEquipment = (index) => {
		$scope.character.equipment.splice(index, 1);
		console.log("Removed from form");
	};
	$scope.removeMagicSchool = (index) => {
		$scope.character.magicschools.splice(index, 1);
		console.log("Removed from form");
	};
	$scope.removeSpell = (index) => {
		$scope.character.spells.splice(index, 1);
		console.log("Removed from form");
	};

$scope.yourStat =[];
var counter = 1;
	$scope.statNumber = () => {//GENERATE RANDOM NUMBERS FOR STATS
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