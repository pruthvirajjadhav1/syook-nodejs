try{
    const prompt = require("prompt-sync")();
    var k=parseInt(prompt("Enter the value of k: "));
    var l=parseInt(prompt("Enter the value of l: "));
    var m=parseInt(prompt("Enter the value of m: "));
    var n=parseInt(prompt("Enter the value of n: "));
    var total=parseInt(prompt("Enter the value of total: "));

    if(isNaN(k) || isNaN(l) || isNaN(m) || isNaN(n) || isNaN(total))
        throw new Error("Oops! Some thing is Not a Number! enter correct input");

    const countNumberOfFishes = (k,l,m,n,total)=>{
        if(k==1 || l==1 || m==1 || n==1)
            return total;
        var fishes=0;
        for(var i=1;i<=total;i++){
            if(i%k==0 || i%l==0 || i%m==0 || i%n==0)
                fishes+=1;
        }
        return fishes;
    }

    const fishesCatched = countNumberOfFishes(k,l,m,n,total);
    console.log(fishesCatched);
}
catch(err){
    console.log(err.message);
}