var prompt=require("prompt-sync")();
var num=prompt("Enter a Number: ");
try{
    if(isNaN(parseInt(num,10)))
        throw new Error("Not A number! Enter a correct one");
    num=parseInt(num,10);
    var sum=1;
    for(var i=2;i<=num/2;i++){
        if(num%i===0){
            sum+=i;
        }
    }

    if(sum==num)
        console.log("Perfect");
    else if(sum>num)
        console.log("Abundant");
    else
        console.log("Deficient");
}
catch(err){
    console.log(err.message);
}