"use strict"; 
app.factory("postFactory", function($q, $http, FBCreds) {

//ADD CHARACTER TO FB
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


//GET ALL USER CHARACTERS
const getUserCharacters = (user) => {
		let userCharArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/characters.json?orderBy="uid"&equalTo="${user}"`)
			.then((userCharObj) => {
				console.log( "user", user );
				console.log( "userCharObj", userCharObj );
				let userChar = userCharObj.data;
				Object.keys(userChar)
				.forEach((key) => {
					userChar[key].id = key;
					userCharArray.push(userChar[key]);
				});
				console.log( "userCharArray", userCharArray );
				resolve(userCharArray);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};


//DELETES INDEVIDUAL CHARACTER
 	const deleteChar = (id) => {
 		return $q((resolve, reject) => {
 			$http.delete(`${FBCreds.databaseURL}/characters/${id}.json`)
 			.then((response) => {
 				console.log( "response", response );
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
 	 	console.log('id obj', id, obj);
 		return $q((resolve, reject) => {
 			let newObj = JSON.stringify(obj);
 			console.log('new', newObj);
 			$http.patch(`${FBCreds.databaseURL}/characters/${id}.json`, newObj)
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


 	const getSingleChar = (id) => {
 		return $q((resolve,reject) => {
 			$http.get(`${FBCreds.databaseURL}/characters/${id}.json`)
 			.then((CharObj) => {
 				console.log( "CharObj.data", CharObj.data );
 				resolve(CharObj.data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};

return {addCharacter, getUserCharacters, deleteChar, editChar, getSingleChar};
});