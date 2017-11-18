"use strict" 

Function fizzyBuzzy() {
    var x = 100;
    for (var i = 0; i <= x; i++){
        if (i % 3 == 0 && i % 5 == 0){
            console.log("FizzBuzz");
        }else if(i % 3 == 0){
            console.log("fizz");
        }else if(i % 5 == 0){
            console.log("buzz");
        }else{
            console.log(".");
        };
    };
};
fizzyBuzzy();