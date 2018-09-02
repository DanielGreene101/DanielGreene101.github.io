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
function callRaces(){ //SINGLE API CALL
	$http({ method : 'GET',
		url : 'http://dnd5eapi.co/api/races/',})
		.then(function(data){
			$scope.races = data.data.results; //DATA SCOPED FOR DOM ARRAY
		})
		.catch(function(){
			console.log("ERROR");
		});
}
callRaces();

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
			for (let i = 0; i < data.data.results.length; i++) {//call additional API for additional info
  				finalSkills(i); //CALLING SECOND FUNCTION. THIS AVOIDS FUNCTION WITHIN A LOOP
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}

function finalSkills (i){//SECONG API CALL FOR MORE INFO 
	$http({ method : 'GET', 
			url: $scope.skills[i].url})
	.then(function(data){
		$scope.finalSkills.push(data);//PUSHED FOR DOM AVAILABILITY 
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
  				finalFeats(i);
			}
		})
		.catch(function(){
			console.log("ERROR");
		});

}

function finalFeats (i){
	$http({ method : 'GET', 
			url: $scope.feats[i].url})
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
		postFactory.getUserRegions(userFactory.getCurrentUser())//GET USERS REGIONS
			.then((data) => {
				$scope.regions = data;//IN ARRAY FOR DOM
			}).catch(function(){
			console.log("ERROR");
		});
	}
callRegions();

//handle pushing clicked item
	$scope.addRegion = (item) => {
		$scope.yourRegion = item.name;
		$scope.yourRegionId = item.id;
		newCharacter.region = $scope.yourRegion;
		newCharacter.regionId = $scope.yourRegionId;//ASSEMBLED FOR FIREBASE PUSH
	};

	$scope.addRace = (item) => {
		let newRace = item.name + " " + item.subrace;
        if (!$scope.yourRace.includes(newRace)) {
            $scope.yourRace = newRace.replace("null", "");
            newCharacter.race = $scope.yourRace;
        }
	};
	$scope.addClass = (item) => {
		$scope.yourClass.push(item.name);
	};
	$scope.addSkill = (item) => {
		$scope.yourSkills.push(item.data.name);
	};
	$scope.addFeat = (item) => {
		$scope.yourFeats.push(item.data.name);
	};
	$scope.addEquipment = (item) => {
		$scope.yourEquipment.push(item.data.name);
	};
	$scope.addMagicSchools = (item) => {
		$scope.yourMagicSchools.push(item.name);
	};
	$scope.addSpell = (item) => {
		$scope.yourSpells.push(item.data.name);
	};

	//REMOVE ITEMS 
	$scope.removeClass = (index) => {//PULL INDEX OF SELECTEM ITEM AND DELETES FORM ARRAY 
		$scope.yourClass.splice(index, 1);
	};
	$scope.removeSkill = (index) => {
		$scope.yourSkills.splice(index, 1);
	};
	$scope.removeFeat = (index) => {
		$scope.yourFeats.splice(index, 1);
	};
	$scope.removeEquipment = (index) => {
		$scope.yourEquipment.splice(index, 1);
	};
	$scope.removeMagicSchool = (index) => {
		$scope.yourMagicSchools.splice(index, 1);
	};
	$scope.removeSpell = (index) => {
		$scope.yourSpells.splice(index, 1);
	};

//SAVE ALL INFO TO BE PUSHED UP
$scope.saveInfo = (charName, notes, HP, INITIATIVE, AC, STR, DEX, CON, INT, WIS, CHA, FORT, REF, WILL, BAB, SPRES, GRAPPLE) => {
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

		let newCharToAdd = newCharacter;
		postFactory.addCharacter(newCharToAdd);
	};


$scope.yourStat =[];//GENERATE RANDOM NUMBERS FOR STATS 
let counter = 1;
	$scope.statNumber = () => {
		if (counter < 7){
			counter++;
			$scope.statNumber();
			$scope.yourStat.push(Math.floor(Math.random() * ((18 - 8) + 1 ) + 8));
		}else{
			counter = 1;
			$scope.yourStat =[];
		}
	};

});

