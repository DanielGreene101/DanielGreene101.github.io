"use strict";

app.controller('MyMapsCtrl', function ($scope, postFactory, userFactory, $location) {


	$scope.regionData = [];
	$scope.characterData = [];


	//GET ALL REGIONS FOR USER 
	$scope.showMyRegions = () => {
		// console.log("showMyRegions firing");
		postFactory.getUserRegions(userFactory.getCurrentUser())
			.then((data) => {
				// console.log("data", data);
				$scope.regionData = data;
				console.log("region data", $scope.regionData);
				// console.log("$scope.regionData", $scope.regionData);
			}).then(()=>{
				$scope.showThisRegionsCharacters();
			});
	};

	//PULL IN CHARACTERS WITH MATCHING REGION
		$scope.showThisRegionsCharacters = () =>{
			console.log("showThisRegionsCharacters firing");
			//pull in character data
			postFactory.getUserCharacters(userFactory.getCurrentUser())
				.then((data) => {
					console.log("data", data);
					$scope.characterData = data;
					console.log("$scope.characterData", $scope.characterData);
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
		        });
			};


$scope.regionIdFunction = function(characterData, regionData) {
    	// console.log(characterData, regionData);//THE DATA PULLED IN
    		$scope.characterRegion = [];

    		regionData.forEach(region => {
    		// console.log("region", region);//OBJECTS IN THE REGION ARRAY
    		console.log("first for each", region);
    		let aRegionsCharacters = [];

    		characterData.forEach(character => {
    			console.log("second for each");
    			if(character.regionId === region.id){
    			// console.log("region - character", region, character);
    			aRegionsCharacters.push(character);
    			console.log("$scope.characterRegion", $scope.characterRegion);
    		}else{
    			console.log("region - character did not match");
    		}
    		});

    		region.characters = aRegionsCharacters;
    	});
    		$scope.regionData = regionData;
    		console.log("NEW REGIONS", $scope.regionData);

    	};
});