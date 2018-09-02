"use strict";

app.controller('MyMapsCtrl', function ($scope, postFactory, userFactory, $location) {


	$scope.regionData = [];
	$scope.characterData = [];


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
		        });
			};


$scope.regionIdFunction = function(characterData, regionData) {
    		$scope.characterRegion = [];

    		regionData.forEach(region => {
    		let aRegionsCharacters = [];

    		characterData.forEach(character => {
    			if(character.regionId === region.id){
    			aRegionsCharacters.push(character);
    		}
    		});

    		region.characters = aRegionsCharacters;
    	});
    		$scope.regionData = regionData;
    	};
});