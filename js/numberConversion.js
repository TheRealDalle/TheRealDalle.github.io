
var myButton = document.getElementById("convertNumbers");
var power2 = document.getElementById("base2");
var power10 = document.getElementById("base10");
var value = document.getElementById("totalValue");

var totalValue;


function clear(){
    power2.value = 0;
    power10.value = 0;
    value.value = 1;
}

function fromBase2(){
    totalValue = Math.pow(2,power2.value);

    value.value = totalValue;

    var tenValue = power2.value*(Math.log10(2));
    power10.value = tenValue;
}

function fromBase10(){

    totalValue = Math.pow(10,power10.value);

    value.value = totalValue;

    var twoValue = power10.value/(Math.log10(2));

    power2.value = twoValue;



}

function fromNum(){
    power10.value = Math.log10(value.value);
    power2.value = Math.log10(value.value)/Math.log10(2);
}


power2.addEventListener("input", fromBase2); 
power10.addEventListener("input", fromBase10); 
value.addEventListener("input", fromNum); 

myButton.addEventListener('mousedown', clear);
