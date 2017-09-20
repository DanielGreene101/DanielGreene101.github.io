"use strict";

app.controller('CreateCharCtrl', function ($scope, $location, $http, userFactory, postFactory, $q) {

//Empty arrays for pushed items
	$scope.yourName = "";
	$scope.yourRace = "";
	$scope.yourClass = [];
	$scope.yourSkills = [];
	$scope.yourFeats = [];
	$scope.yourEquipment = [];
	$scope.yourMagicSchools = [];
	$scope.yourSpells = [];
	$scope.yourRegion = [];
	$scope.yourRegionId = [];
	$scope.yourNotes = "";
	$scope.yourHP = "";
	$scope.yourINITIATIVE = "";
	$scope.yourAC = "";
	$scope.yourSTR = "";
	$scope.yourDEX = "";
	$scope.yourCON = "";
	$scope.yourINT = "";
	$scope.yourWIS = "";
	$scope.yourCHA = "";
	$scope.yourFORT = "";
	$scope.yourREF = "";
	$scope.yourWILL = "";
	$scope.yourBAB = "";
	$scope.yourGRAPPLE = "";
	$scope.yourSPRES = "";
//DEFINE USER 
let user = userFactory.getCurrentUser();
console.log("user", user);

let newCharacter = {
		name: $scope.yourName,
		race: $scope.yourRace,
		class: $scope.yourClass,
		skills: $scope.yourSkills,
		feats: $scope.yourFeats,
		equipment: $scope.yourEquipment,
		magicschools: $scope.yourMagicSchools,
		spells: $scope.yourSpells,
		storyline: $scope.yourNotes,
		uid: user,
		HP: $scope.yourHP,
		INITIATIVE: $scope.yourINITIATIVE,
		AC: $scope.yourAC,
		STR: $scope.yourSTR,
		DEX: $scope.yourDEX,
		CON: $scope.yourCON,
		INT: $scope.yourINT,
		WIS: $scope.yourWIS,
		CHA: $scope.yourCHA,
		FORT: $scope.yourFORT,
		REF: $scope.yourREF,
		WILL: $scope.yourWILL,
		BAB: $scope.yourBAB,
		GRAPPLE: $scope.yourGRAPPLE,
		SPRES: $scope.yourSPRES,
		region: $scope.yourRegion,
		regionId: $scope.yourRegionId
	};

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
$scope.regionId = [];
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
				console.log("data", data);
				$scope.regions = data;
				console.log("$scope.regionData", $scope.regionData);
			}).catch(function(){
			console.log("ERROR");
		});
	}
callRegions();


//handle pushing clicked item
	$scope.addRegion = (item) => {
		console.log("item", item.name);
		// $scope.yourRace.pop();
		$scope.yourRegion = item.name;
		$scope.yourRegionId = item.id;
		newCharacter.region = $scope.yourRegion;
		newCharacter.regionId = $scope.yourRegionId;
		console.log("$scope.yourRegion", $scope.yourRegion);
		console.log("added to form");
	};

	$scope.addRace = (item) => {
		console.log("item", item, item.name);
		// $scope.yourRace.pop();
		$scope.yourRace = item.name;
		newCharacter.race = $scope.yourRace;
		console.log("$scope.yourRace", $scope.yourRace);
		console.log("added to form");
	};
	$scope.addClass = (item) => {
		console.log("item", item, item.name);
		$scope.yourClass.push(item.name);
		console.log("added to form");
	};
	$scope.addSkill = (item) => {
		console.log("item", item, item.name);
		$scope.yourSkills.push(item.data.name);
		console.log("added to form");
	};
	$scope.addFeat = (item) => {
		console.log("item", item, item.name);
		$scope.yourFeats.push(item.data.name);
		console.log("added to form");
	};
	$scope.addEquipment = (item) => {
		console.log("item", item, item.name);
		$scope.yourEquipment.push(item.data.name);
		console.log("added to form", $scope.yourEquipment);
	};
	$scope.addMagicSchools = (item) => {
		console.log("item", item, item.name);
		$scope.yourMagicSchools.push(item.name);
		console.log("added to form");
	};
	$scope.addSpell = (item) => {
		console.log("item", item, item.name);
		$scope.yourSpells.push(item.data.name);
		console.log("added to form");
		console.log("New Character", newCharacter);
	};

	//REMOVE ITEMS 
	$scope.removeClass = (index) => {
		$scope.yourClass.splice(index, 1);
		console.log("removed from form");
	};
	$scope.removeSkill = (index) => {
		$scope.yourSkills.splice(index, 1);
		console.log("removed from form");
	};
	$scope.removeFeat = (index) => {
		$scope.yourFeats.splice(index, 1);
		console.log("removed from form");
	};
	$scope.removeEquipment = (index) => {
		$scope.yourEquipment.splice(index, 1);
		console.log("removed from form");
	};
	$scope.removeMagicSchool = (index) => {
		$scope.yourMagicSchools.splice(index, 1);
		console.log("removed from form");
	};
	$scope.removeSpell = (index) => {
		$scope.yourSpells.splice(index, 1);
		console.log("removed from form");
	};

$scope.saveInfo = (charName, notes, HP, INITIATIVE, AC, STR, DEX, CON, INT, WIS, CHA, FORT, REF, WILL, BAB, SPRES, GRAPPLE) => {
		console.log("charName, notes, HP, INITIATIVE, AC, STR, DEX, CON, INT, WIS, CHA, FORT, REF, WILL, BAB, SPRES, GRAPPLE", notes, charName, HP, INITIATIVE, AC, STR, DEX, CON, INT, WIS, CHA, FORT, REF, WILL, BAB, SPRES, GRAPPLE);
		$scope.yourHP = HP;
		$scope.yourINITIATIVE = INITIATIVE;
		$scope.yourAC = AC;
		$scope.yourSTR = STR;
		$scope.yourDEX = DEX;
		$scope.yourCON = CON;
		$scope.yourINT = INT;
		$scope.yourWIS = WIS;
		$scope.yourCHA = CHA;
		$scope.yourFORT = FORT;
		$scope.yourREF = REF;
		$scope.yourWILL = WILL;
		$scope.yourBAB = BAB;
		$scope.yourGRAPPLE = GRAPPLE;
		$scope.yourSPRES = SPRES;

		newCharacter.HP = $scope.yourHP;
		newCharacter.INITIATIVE = $scope.yourINITIATIVE;
		newCharacter.AC = $scope.yourAC;
		newCharacter.STR = $scope.yourSTR;
		newCharacter.DEX = $scope.yourDEX;
		newCharacter.CON = $scope.yourCON;
		newCharacter.INT = $scope.yourINT;
		newCharacter.WIS = $scope.yourWIS;
		newCharacter.CHA = $scope.yourCHA;
		newCharacter.FORT = $scope.yourFORT;
		newCharacter.REF = $scope.yourREF;
		newCharacter.WILL = $scope.yourWILL;
		newCharacter.BAB = $scope.yourBAB;
		newCharacter.GRAPPLE = $scope.yourGRAPPLE;
		newCharacter.SPRES = $scope.yourSPRES;

		$scope.yourName = charName; 
		newCharacter.name = $scope.yourName;

		$scope.yourNotes = notes; 
		newCharacter.storyline = $scope.yourNotes;

		console.log("function fired");
		var newCharToAdd = newCharacter;
		console.log("newCharToAdd", newCharToAdd);
		postFactory.addCharacter(newCharToAdd);
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