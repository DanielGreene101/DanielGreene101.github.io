'use strict';

const app = angular.module('CharacterBuilds', ['ngRoute']);

let isAuth = (userFactory, $window) => new Promise((resolve, reject) => {
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists === true) {
			console.log( "YOU GOOD" );
			resolve();
		}  else  {
			console.log( "YOU ARE NOT AUTHORIZED" );
			$window.alert("NOT LOGGED IN!!!");
			reject();
		}
	}).catch((error) => {
		$window.alert("Please log in.");
		reject(error);
	});
});


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		//the initial view will be a login screen
		templateUrl: 'partials/login-register.html',
		controller: 'userCtrl'
	})
	.when('/MyCharacters', {
		templateUrl: 'partials/my-characters.html',
		controller: 'myProfileCtrl',
		resolve: {isAuth}
	})
	.when('/MyRegions', {
		templateUrl: 'partials/my-regions.html',
		controller: 'MyMapsCtrl',
		resolve: {isAuth}
	})
	.when('/CreateCharacter', {
		templateUrl: 'partials/character-creator.html',
		controller: 'CreateCharCtrl',
		resolve: {isAuth}
	})
	.when('/CreateRegion', {
		templateUrl: 'partials/create-regions.html',
		controller: 'CreateMapCtrl',
		resolve: {isAuth}
	})
	.when('/EditCharacter/:id', {
		//the first view when the user logs in
		templateUrl: 'partials/edit-character.html',
		controller: 'EditCtrl',
		resolve: {isAuth}
	})
	.when('/EditRegion/:id', {
		//the first view when the user logs in
		templateUrl: 'partials/edit-region.html',
		controller: 'EditRegionCtrl',
		resolve: {isAuth}
	})
	.when('/singleCharacter/:id', {
		//the first view when the user logs in
		templateUrl: 'partials/single-character.html',
		controller: 'SingleCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});

//starts app with firebase credentials from ./app/values/fb-creds.js
app.run(($location, FBCreds) => {
	firebase.initializeApp(FBCreds);
});

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
console.log("user", user.email);

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
		url : 'http://www.5e-api.com/v1/races/',})
		.then(function(data){
			$scope.races = data.data; //DATA SCOPED FOR DOM ARRAY
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
		console.log("showMyRegions firing");
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
		console.log("item", item.name);
		$scope.yourRegion = item.name;
		$scope.yourRegionId = item.id;
		newCharacter.region = $scope.yourRegion;
		newCharacter.regionId = $scope.yourRegionId;//ASSEMBLED FOR FIREBASE PUSH
		$scope.playAdded();
		console.log("added to form");
	};

	$scope.addRace = (item) => {
		var newRace = item.name + " " + item.subrace;
		$scope.yourRace = newRace.replace("null", "");
		newCharacter.race = $scope.yourRace;
		$scope.playAdded();
		console.log("added to form");
	};
	$scope.addClass = (item) => {
		console.log("item", item, item.name);
		$scope.yourClass.push(item.name);
		$scope.playAdded();
		console.log("added to form");
	};
	$scope.addSkill = (item) => {
		console.log("item", item, item.name);
		$scope.yourSkills.push(item.data.name);
		$scope.playAdded();
		console.log("added to form");
	};
	$scope.addFeat = (item) => {
		console.log("item", item, item.name);
		$scope.yourFeats.push(item.data.name);
		$scope.playAdded();
		console.log("added to form");
	};
	$scope.addEquipment = (item) => {
		console.log("item", item, item.name);
		$scope.yourEquipment.push(item.data.name);
		$scope.playAdded();
		console.log("added to form", $scope.yourEquipment);
	};
	$scope.addMagicSchools = (item) => {
		console.log("item", item, item.name);
		$scope.yourMagicSchools.push(item.name);
		$scope.playAdded();
		console.log("added to form");
	};
	$scope.addSpell = (item) => {
		console.log("item", item, item.name);
		$scope.yourSpells.push(item.data.name);
		console.log("added to form");
		console.log("New Character", newCharacter);
		$scope.playAdded();
	};

	//REMOVE ITEMS 
	$scope.removeClass = (index) => {//PULL INDEX OF SELECTEM ITEM AND DELETES FORM ARRAY 
		$scope.yourClass.splice(index, 1);
		console.log("removed from form");
		$scope.playRemoved();
	};
	$scope.removeSkill = (index) => {
		$scope.yourSkills.splice(index, 1);
		console.log("removed from form");
		$scope.playRemoved();
	};
	$scope.removeFeat = (index) => {
		$scope.yourFeats.splice(index, 1);
		console.log("removed from form");
		$scope.playRemoved();
	};
	$scope.removeEquipment = (index) => {
		$scope.yourEquipment.splice(index, 1);
		console.log("removed from form");
		$scope.playRemoved();
	};
	$scope.removeMagicSchool = (index) => {
		$scope.yourMagicSchools.splice(index, 1);
		console.log("removed from form");
		$scope.playRemoved();
	};
	$scope.removeSpell = (index) => {
		$scope.yourSpells.splice(index, 1);
		console.log("removed from form");
		$scope.playRemoved();
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

		var newCharToAdd = newCharacter;
		postFactory.addCharacter(newCharToAdd);
		console.log("INFO SAVED");
		$scope.playCreated();
	};


$scope.yourStat =[];//GENERATE RANDOM NUMBERS FOR STATS 
var counter = 1;
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


"use strict";
app.controller('CreateMapCtrl', function ($scope, postFactory, userFactory) {

let user = userFactory.getCurrentUser();//SET UP USER REGION CREATION
console.log("user", user);
	$scope.regName = "";
	$scope.regInfo = "";


	let newRegion = {
		name: $scope.regName,
		info: $scope.regInfo,
		uid: user,
	};
//SOUNDS
	$scope.playCreated = function() {
        var audio = new Audio('./sounds/CREATED.wav');
        audio.play();
    };


	$scope.saveRegion = (regName, regInfo) => {//SAVE CREATED REGION

		$scope.regName = regName; 
		newRegion.name = $scope.regName;

		$scope.regInfo = regInfo; 
		newRegion.info = $scope.regInfo;

		var newRegionToAdd = newRegion;
		postFactory.addRegion(newRegionToAdd);
		$scope.playCreated();
	};
});
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

"use strict";

app.controller('HomeCtrl', function ($scope, $location, userFactory) {



});
"use strict";

app.controller('myProfileCtrl', function ($scope, postFactory, userFactory, $location) {
	let user = userFactory.getCurrentUser();

	$scope.playDeleted = function() {
        var audio = new Audio('./sounds/DELETED.wav');
        audio.play();
    };

	$scope.characterData = [];

//GET ALL CHARACTERS FOR USER 
	$scope.showMyCharacters = () => {
		console.log("showMyCharacters firing");
		postFactory.getUserCharacters(userFactory.getCurrentUser())
			.then((data) => {
				$scope.characterData = data;
			});
	};

	$scope.showMyCharacters();//CALLS ITSELF

//SCOPED DELETE BUTTON FIRING
	$scope.deleteBtn = (id) => {
		postFactory.deleteChar(id)
			.then(() => {
	            $scope.showMyCharacters();//UPDATES PAGE
	            $scope.playDeleted();
	        });
		};

});
"use strict";

app.controller('MyMapsCtrl', function ($scope, postFactory, userFactory, $location) {


	$scope.regionData = [];
	$scope.characterData = [];

	$scope.playDeleted = function() {
        var audio = new Audio('./sounds/DELETED.wav');
        audio.play();
    };


	//GET ALL REGIONS FOR USER 
	$scope.showMyRegions = () => {
		postFactory.getUserRegions(userFactory.getCurrentUser())
			.then((data) => {
				$scope.regionData = data;
			}).then(()=>{
				$scope.showThisRegionsCharacters();
			});
	};

	//PULL IN CHARACTERS WITH MATCHING REGION
		$scope.showThisRegionsCharacters = () =>{
			console.log("showThisRegionsCharacters firing");
			postFactory.getUserCharacters(userFactory.getCurrentUser())
				.then((data) => {
					$scope.characterData = data;
				}).then(()=>{
					$scope.regionIdFunction($scope.characterData, $scope.regionData);
				});
			//filter by region.name within the character data


	};
	$scope.showMyRegions();//CALLS ITSELF

	//SCOPED DELETE BUTTON FIRING
		$scope.regDeleteBtn = (id) => {
			postFactory.deleteReg(id)
				.then(() => {
		            $scope.showMyRegions();//UPDATES PAGE
		            $scope.playDeleted();
		        });
			};


$scope.regionIdFunction = function(characterData, regionData) {
    		$scope.characterRegion = [];

    		regionData.forEach(region => {
    		let aRegionsCharacters = [];

    		characterData.forEach(character => {
    			if(character.regionId === region.id){
    			aRegionsCharacters.push(character);
    		}else{
    			console.log("region - character did not match");
    		}
    		});

    		region.characters = aRegionsCharacters;
    	});
    		$scope.regionData = regionData;
    	};
});
"use strict";

app.controller('NavCtrl', function ($scope, $location, userFactory, $window) {
	//RTN OBJ W/ USER COLLRCTION
	let createUserObj = (loginObj) => {
		return {
			email: loginObj.user.email,
			uid: loginObj.user.uid,
			photoURL: loginObj.user.photoURL
		};
	};
	let loginObjStorage = [];
	//register/login W/ GOOGLE
	$scope.logInGoogle = () => {
		loginObjStorage.length = 0;
		userFactory.authWithProvider()
		.then((userObj) => {
			let newUserObj = createUserObj(userObj);
			addPhotoAfterLogin(userObj);
			loginObjStorage.push(newUserObj);
			return newUserObj;
		})
		.then((newUserObj) => {
			let fbEmail = userFactory.getUserObj(newUserObj.email);
			return fbEmail;
		})
		.then((fbEmail) => {
			let fromFB = Object.keys(fbEmail.data);
			if(fromFB.length === 0) {
				userFactory.postUserObj(loginObjStorage[0]);
			}
			console.log("login successful");
		})
		.then(() => {
			document.getElementById("logInBtn").style.display = "none"; 
			document.getElementById("logOutBtn").style.display = "inline-block";
			$location.path('/home');
			$scope.$apply();
		})
		.catch((error) => {
			console.log("error from $scope.logInGoogle", error.message);
		});
	};
	//log out
	$scope.logOut = () => {
		userFactory.logOut()
		.then(() => {
			clearUserPhoto();
			let user = userFactory.getCurrentUser();
			document.getElementById("logInBtn").style.display = "inline-block";
			document.getElementById("logOutBtn").style.display = "none";
			$window.alert("LOGGED OUT!");
			$location.path('/home');
		})
		.catch((error) => {
			console.log("logout error", error.message);
		});
	};

});
function addPhotoAfterLogin (userObj) {
  $("#profile-image-anchor").append(
    `<img src="${userObj.user.photoURL}" id="profile-img" class="flex-sm-fill">`
  );
}
function clearUserPhoto (){
  $("#profile-image-anchor").empty();
}
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
"use strict";

app.controller('userCtrl', function($scope, userFactory, $location, $window) {
	//RTN OBJ W/ USER COLLRCTION
	let createUserObj = (loginObj) => {
		return {
			email: loginObj.user.email,
			uid: loginObj.user.uid,
			photoURL: loginObj.user.photoURL
		};
	};
	let loginObjStorage = [];
	//register/login W/ GOOGLE
	$scope.logInGoogle = () => {
		loginObjStorage.length = 0;
		userFactory.authWithProvider()
		.then((userObj) => {
			$location.path('/home');
			let newUserObj = createUserObj(userObj);
			addPhotoAfterLogin(userObj);
			loginObjStorage.push(newUserObj);
			return newUserObj;
		})
		.then((newUserObj) => {
			let fbEmail = userFactory.getUserObj(newUserObj.email);
			return fbEmail;
		})
		.then((fbEmail) => {
			let fromFB = Object.keys(fbEmail.data);
			if(fromFB.length === 0) {
				userFactory.postUserObj(loginObjStorage[0]);
			}
			console.log("login successful");
		})
		.then(() => {
			document.getElementById("logInBtn").style.display = "none"; 
			document.getElementById("logOutBtn").style.display = "block";
			$location.path('/home');
			$scope.$apply();
		})
		.catch((error) => {
			console.log("error from $scope.logInGoogle", error.message);
		});
	};
	//log out
	$scope.logOut = () => {
		userFactory.logOut()
		.then(() => {
			clearUserPhoto();
			let user = userFactory.getCurrentUser();
			document.getElementById("logInBtn").style.display = "block";
			document.getElementById("logOutBtn").style.display = "none";
			$window.alert("LOGGED OUT!");
		})
		.catch((error) => {
			console.log("logout error", error.message);
		});
	};

});
function addPhotoAfterLogin (userObj) {
  $("#profile-image-anchor").append(
    `<img src="${userObj.user.photoURL}" id="profile-img" class="flex-sm-fill">`
  );
}
function clearUserPhoto (){
  $("#profile-image-anchor").empty();
}
"use strict"; 
app.factory("postFactory", function($q, $http, FBCreds, $location) {

//ADD CHARACTER TO FB
const addCharacter = (obj) => {
		let newObj = JSON.stringify(obj);
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/characters.json`, newObj)
			.then((data) => {
				resolve(data);
				$location.path('/MyCharacters');
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};

//ADD REGION TO FB
	const addRegion = (obj) => {
		let newObj = JSON.stringify(obj);
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/regions.json`, newObj)
			.then((data) => {
				resolve(data);
				$location.path('/MyRegions');
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};


//GET ALL USER CHARACTERS
const getUserCharacters = (user) => {
		let userCharArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/characters.json?orderBy="uid"&equalTo="${user}"`)
			.then((userCharObj) => {
				let userChar = userCharObj.data;
				Object.keys(userChar)
				.forEach((key) => {
					userChar[key].id = key;
					userCharArray.push(userChar[key]);
				});
				resolve(userCharArray);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};

//GET USER REGIONS
const getUserRegions = (user) => {
	let userRegArray = [];
	return $q((resolve, reject) => {
		$http.get(`${FBCreds.databaseURL}/regions.json?orderBy="uid"&equalTo="${user}"`)
		.then((userRegObj) => {
			let userReg = userRegObj.data;
			Object.keys(userReg)
			.forEach((key) => {
				userReg[key].id = key;
				userRegArray.push(userReg[key]);
			});
			resolve(userRegArray);
		})
		.catch((error) => {
			console.log( "error", error.message );
			reject(error);
		});
	});
};


//DELETES INDEVIDUAL CHARACTER
 	const deleteChar = (id) => {
 		return $q((resolve, reject) => {
 			$http.delete(`${FBCreds.databaseURL}/characters/${id}.json`)
 			.then((response) => {
 				resolve(response);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};
//DELETES INDEVIDUAL REGION
 	const deleteReg = (id) => {
 		return $q((resolve, reject) => {
 			$http.delete(`${FBCreds.databaseURL}/regions/${id}.json`)
 			.then((response) => {
 				resolve(response);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};
//EDITED CHATACTER SUBMITTED TO FB
 	 	const editChar = (id, obj) => {
 		return $q((resolve, reject) => {
 			let newObj = JSON.stringify(obj);
 			$http.patch(`${FBCreds.databaseURL}/characters/${id}.json`, newObj)
 			.then((data) => {
 				resolve(data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};

//EDITED REGION SUBMITTED TO FB
 	 	const editRegion = (id, obj) => {
 		return $q((resolve, reject) => {
 			let newObj = JSON.stringify(obj);
 			$http.patch(`${FBCreds.databaseURL}/regions/${id}.json`, newObj)
 			.then((data) => {
 				resolve(data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};

//GET SINGLER CHARACTER TO EDIT
 	const getSingleChar = (id) => {
 		return $q((resolve,reject) => {
 			$http.get(`${FBCreds.databaseURL}/characters/${id}.json`)
 			.then((CharObj) => {
 				resolve(CharObj.data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};

//GET SINGLER REGION TO EDIT
 	 const getSingleRegion = (id) => {
 		return $q((resolve,reject) => {
 			$http.get(`${FBCreds.databaseURL}/regions/${id}.json`)
 			.then((RegObj) => {
 				resolve(RegObj.data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};

return {addCharacter, getUserCharacters, deleteChar, editChar, getSingleChar, addRegion, deleteReg, getUserRegions, getSingleRegion, editRegion};
});
"use strict";

app.factory('userFactory', function($q, $http, FBCreds, $location) {
	let currentUser = null;
	let googleProvider = new firebase.auth.GoogleAuthProvider();
	let userEmailFromFB = {};
	let getCurrentUser = function () {
		return currentUser;
	};
	let getUserEmailFromFB = function () {
		return userEmailFromFB;
	};
	//Authenticated? T/F
	let isAuthenticated = function () {
		return $q((resolve, reject) => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					currentUser = user.uid;
					resolve(true);
				} else {
					reject(false);
				}
			});
		});
	};
	//checks to see if userEmail already exists in the user collection, called in userCtrl-> logInGoogle
	let getUserObj = (userEmail) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="email"&equalTo="${userEmail}"`)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				console.log("error", error);
				reject(error);
			});
		});

	};
	//if userEmail is not already in user collection, posts userObj, called as condition in userCtrl -> logInGoogle
	let postUserObj = function(userObj) {
		let newUserObj = JSON.stringify(userObj);
		$http.post(`${FBCreds.databaseURL}/users.json`, userObj)
		.then((data) => {
            return (data);
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log( "error", errorCode, errorMessage );
        });
	};
	let logOut = function() {
		console.log("factoryLogOut firing");
		return firebase.auth().signOut();
	};
	let authWithProvider = function() {
		return firebase.auth().signInWithPopup(googleProvider);
	};

	return {getCurrentUser, isAuthenticated, getUserObj, postUserObj, authWithProvider, logOut};

});
//FireBase Links 
app.constant("FBCreds", {
	apiKey: "AIzaSyC4ZhrHr0UYSb-dGuAIMjdwzIqBxt91qIk",
    authDomain: "dnd-npc-builder.firebaseapp.com",
    databaseURL: "https://dnd-npc-builder.firebaseio.com",
    projectId: "dnd-npc-builder",
    storageBucket: "dnd-npc-builder.appspot.com",
    messagingSenderId: "380872359661"
});