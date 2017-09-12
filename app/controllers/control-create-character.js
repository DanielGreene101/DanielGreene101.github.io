"use strict";

app.controller('CreateCharCtrl', function ($scope, $location, $http, userFactory, postFactory) {

//Empty arrays for pushed items
	$scope.yourName = [];
	$scope.yourRace = [];
	$scope.yourClass = [];
	$scope.yourSkills = [];
	$scope.yourProficiencies = [];
	$scope.yourFeats = [];
	$scope.yourEquipment = [];
	$scope.yourMagicSchools = [];
	$scope.yourSpells = [];
	$scope.yourNotes = [];
//To submit new character obj
let user = userFactory.getCurrentUser();
console.log("user", user);
let newCharacter = {
		name: $scope.yourName,
		race: $scope.yourRace,
		class: $scope.yourClass,
		skills: $scope.yourSkills,
		proficiencies: $scope.yourProficiencies,
		feats: $scope.yourFeats,
		Equipment: $scope.yourEquipment,
		magicschools: $scope.yourMagicSchools,
		spells: $scope.yourSpells,
		storyline: $scope.yourNotes,
		uid: user
	};

//handle pushing clicked item
	$scope.addRace = (item) => {
		console.log("item", item, item.name);
		$scope.yourRace.pop();
		$scope.yourRace.push(item.name);

		console.log("added to form");
	};
	$scope.addClass = (item) => {
		console.log("item", item, item.name);
		$scope.yourClass.push(item.name);
		console.log("added to form");
	};
	$scope.addSkill = (item) => {
		console.log("item", item, item.name);
		$scope.yourSkills.push(item.name);
		console.log("added to form");
	};
	$scope.addFeat = (item) => {
		console.log("item", item, item.name);
		$scope.yourFeats.push(item.name);
		console.log("added to form");
	};
	$scope.addproficiency = (item) => {
		console.log("item", item, item.name);
		$scope.yourProficiencies.push(item.name);
		console.log("added to form");
	};
	$scope.addEquipment = (item) => {
		console.log("item", item, item.name);
		$scope.yourEquipment.push(item.name);
		console.log("added to form");
	};
	$scope.addMagicSchools = (item) => {
		console.log("item", item, item.name);
		$scope.yourMagicSchools.push(item.name);
		console.log("added to form");
	};
	$scope.addSpell = (item) => {
		console.log("item", item, item.name);
		$scope.yourSpells.push(item.name);
		console.log("added to form");
		console.log("New Character", newCharacter);
	};

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

//////connect new char notes to form notes and name////////
	$scope.submitNotes = (notes) => {
		console.log("hello");
		console.log("notes", notes);
		$scope.yourNotes.push(notes); 
	};
$scope.submitName = (yourName) => {
		console.log("hello");
		console.log("yourName", yourName);
		$scope.yourName.push(yourName); 
		console.log("yourName", $scope.yourName);
	};

///////submit new character function/////////
$scope.sumbitNewCharacter = () => {
	console.log("function fired");
	var newCharToAdd = newCharacter;
	console.log("newCharToAdd", newCharToAdd);
	postFactory.addCharacter(newCharToAdd);
};


});