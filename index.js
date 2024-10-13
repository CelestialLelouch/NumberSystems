function convertToBinaryString(value, bitLength){
    let upperLimit = 2**bitLength - 1;
    let lowerLimit = -(2**bitLength);

    if(value > upperLimit || value < lowerLimit){
        throw new Error('Input value is out of the range for this bit length.');
    }else{
        let binaryString = value.toString(2);
        if(binaryString.length < bitLength){
            binaryString = '0'.repeat(bitLength - binaryString.length) + binaryString;
        }

        return binaryString;
    }
}

function addBinaryStrings(binValue_a, binValue_b){
    let result="";
    let carry = 0;
    for(let i = binValue_a.length -1; i >= 0; i--){
        value = Number(binValue_a[i]) + Number(binValue_b[i]);
        if(value == 0 && carry == 1){
            carry --;
            value = 1;
        }

        if(value == 2){
            carry ++;
            value = 0;
        }

        result = value + result;
    }

    if(carry > 0){
        for(let i = 0; i < carry; i++){
            result = '1' + result;
        }
    }

    return result;
}

function processExcess2m(value_a, value_b, bits){
    const excess = 2**(bits-1)
    calc_value_a = value_a + excess;
    calc_value_b = value_b + excess;

    total = value_a + value_b + excess;
    if(total > 2**(bits) -1){
        return total + ": Overflow occured "
    }

    let binary_a = convertToBinaryString(calc_value_a, bits);
    let binary_b = convertToBinaryString(calc_value_b, bits);
    let sum = addBinaryStrings(binary_a, binary_b);
    document.getElementById('ord_bin').value = sum;
    if (sum.length > bits){
        sum = sum.slice(sum.length - bits);
    }

    if(sum[0] == "0"){
        sum = sum.split("");
        sum[0] = "1";
    }else{
        sum = sum.split("");
        sum[0] = "0";
    }

    sum = sum.join("")
    return sum;
}


function Add(){
    let a = parseInt(document.getElementById("num1").value);
    let b = parseInt(document.getElementById("num2").value);
    let bits = parseInt(document.getElementById("bits").value);

    document.getElementById("sum_num").value = a + b;
    document.getElementById("bin_num1").value = convertToBinaryString(a + 2**(bits - 1), bits);
    document.getElementById("bin_num2").value = convertToBinaryString(b + 2**(bits - 1), bits);
    document.getElementById("sum_bin_exc").value = processExcess2m(a, b, bits); 
    document.getElementById("exc_bin").value = processExcess2m(a, b, bits);
}


///Floating Point Numbers Processing

function convertProperFractionToBinary(numerator, denominator, pbase, bits){
    let remainder = "";
    let result ="";
    let base = pbase;
    let fraction = numerator / denominator;
    let temp_fraction = fraction;
    while(Math.floor(temp_fraction) - temp_fraction != 0){
        temp_fraction = temp_fraction * base;
        remainder += parseInt(temp_fraction - (temp_fraction - Math.floor(temp_fraction)));
        temp_fraction = temp_fraction - Math.floor(temp_fraction)

        if(temp_fraction == fraction && bits == 0){
            result = "0."+result + "...";
            return result;
        }
        result =  (result +""+ remainder);
        remainder = "";
    }

    if(result.length > bits){
        result = result.slice(0,bits);
    }else if(result.length < bits){
        result = result + "0".repeat(bits - result.length);
    }

    return "0."+result;
}

function calculateFloatingPointNumberSystem(){
    let numerator = parseInt(document.getElementById("numer").value);
    let denominator = parseInt(document.getElementById("denomer").value);
    let base = parseInt(document.getElementById("base").value);
    let bits = document.getElementById("bits").value;
    let output = document.getElementById("output");
    output.value = convertProperFractionToBinary(numerator, denominator, base, bits); 
}