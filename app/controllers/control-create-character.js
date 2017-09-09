"use strict";

app.controller('CreateCharCtrl', function ($scope, $location, $http) {




function callClasses(){
	var classes = 'http://www.dnd5eapi.co/api/classes/';
	console.log(classes);
	$http.get({
		URL: classes,
		dataType: "JSON",
		success: function(result){
			console.log('result', result);
			result.starting_proficiencies.forEach(function(element){
				console.log('element', element.name);
			$('#classList').append(element.name);
			});
		}

	});
}
callClasses();
});