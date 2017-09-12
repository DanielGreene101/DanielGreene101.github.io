"use strict"; 
app.factory("postFactory", function($q, $http, FBCreds) {


const addCharacter = (obj) => {
		let newObj = JSON.stringify(obj);
		return $q((resolve, reject) => {
			console.log( "OBJ?", newObj );
			$http.post(`${FBCreds.databaseURL}/characters.json`, newObj)
			.then((data) => {
				console.log( "data", data );
				resolve(data);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};



// const getUserChar = (user) => {
// 		let userCharArray = [];
// 		return $q((resolve, reject) => {
// 			$http.get(`${FBCreds.databaseURL}/characters.json?orderBy="uid"&equalTo="${user}"`)
// 			.then((userCharObj) => {
// 				console.log( "user", user );
// 				console.log( "userCharObj", userCharObj );
// 				let userChar = userCharObj.data;
// 				Object.keys(userChar)
// 				.forEach((key) => {
// 					userChar[key].id = key;
// 					userCharArray.push(userChar[key]);
// 				});
// 				console.log( "userCharArray", userCharArray );
// 				resolve(userCharArray);
// 			})
// 			.catch((error) => {
// 				console.log( "error", error );
// 				reject(error);
// 			});
// 		});
// 	};
return {addCharacter};
});