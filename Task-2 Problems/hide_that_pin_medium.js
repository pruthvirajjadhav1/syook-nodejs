const prompt = require("prompt-sync")();
var num=prompt("Enter a number : ");

const convertBinaryToPin = (binary)=>{
    var reverse=false;
    var result = [];
    if(binary-10000 >= 0){
        reverse=true;
        binary-=10000;
    }
    if(binary-1000 >= 0){
        result.unshift("fall");
        binary-=1000;
    }
    if(binary-100 >= 0){
        result.unshift("hide your mints");
        binary-=100;
    }
    if(binary-10 >= 0){
        result.unshift("double rip");
        binary=binary-10;
    }
    if(binary==1)
        result.unshift("pop");
    if(reverse)
        result=result.reverse();
    return result;
}

try{
    num=parseInt(num,10);
    if(isNaN(num))
        return new Error("Not a number! enter a correct one");
    var binary = parseInt(num.toString(2),10);
    var pin = convertBinaryToPin(binary);
    console.log(pin);
}
catch(err){
    console.log(err.message);
}