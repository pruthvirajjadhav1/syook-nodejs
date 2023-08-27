const prompt = require("prompt-sync")();
var str=prompt("Enter the string: ");

const shortenTheString = (str)=>{
    var count=0;
    var result="";
    for(var i=0;i<str.length;i++){
        if(str[i]==str[i+1]){
            count+=1;
        }
        else{
            if(count==0){
                result+=str[i];
            }
            else{
                result=result+(count+1)+str[i];
                count=0;
            }
        }
    }
    return result;
}

const convertToOriginalString = (str)=>{
    var count=0;
    var result="";
    for(var i=0;i<str.length;i++){
        var currentCharInInteger = parseInt(str[i],10);
        if(!isNaN(currentCharInInteger)){
            count=count*10 + currentCharInInteger;
        }
        else{
            if(count==0)
                result+=str[i];
            else{
                for(var j=0;j<count;j++){
                    result+=str[i];
                }
                count=0;
            }
        }
    }
    return result;
}

var shortenString = shortenTheString(str);
console.log(shortenString);

var originalString = convertToOriginalString(shortenString);
console.log(originalString);