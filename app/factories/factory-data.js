"use strict"; 
app.factory("postFactory", function($q, $http, FBCreds, $location) {

//ADD CHARACTER TO FB
const addCharacter = (obj) => {
		let newObj = JSON.stringify(obj);
		return $q((resolve, reject) => {
			console.log( "OBJ?", newObj );
			$http.post(`${FBCreds.databaseURL}/characters.json`, newObj)
			.then((data) => {
				console.log( "data", data );
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
			console.log( "OBJ?", newObj );
			$http.post(`${FBCreds.databaseURL}/regions.json`, newObj)
			.then((data) => {
				console.log( "data", data );
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
				// console.log( "user", user );
				// console.log( "userCharObj", userCharObj );
				let userChar = userCharObj.data;
				Object.keys(userChar)
				.forEach((key) => {
					userChar[key].id = key;
					userCharArray.push(userChar[key]);
				});
				// console.log( "userCharArray", userCharArray );
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
			// console.log( "user", user );
			// console.log( "userRegObj", userRegObj );
			let userReg = userRegObj.data;
			Object.keys(userReg)
			.forEach((key) => {
				userReg[key].id = key;
				userRegArray.push(userReg[key]);
			});
			// console.log( "userRegArray", userRegArray );
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
 				console.log( "response", response );
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

//EDITED REGION SUBMITTED TO FB
 	 	const editRegion = (id, obj) => {
 	 	console.log('id obj', id, obj);
 		return $q((resolve, reject) => {
 			let newObj = JSON.stringify(obj);
 			console.log('new', newObj);
 			$http.patch(`${FBCreds.databaseURL}/regions/${id}.json`, newObj)
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

//GET SINGLER CHARACTER TO EDIT
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

//GET SINGLER REGION TO EDIT
 	 const getSingleRegion = (id) => {
 		return $q((resolve,reject) => {
 			$http.get(`${FBCreds.databaseURL}/regions/${id}.json`)
 			.then((RegObj) => {
 				console.log( "RegObj.data", RegObj.data );
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