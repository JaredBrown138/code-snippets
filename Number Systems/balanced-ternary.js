/**
 *  Author: Jared Brown
 *  Date: 1/26/2019
 *  Title: Balanced Ternary Snippets
 * 
 */


function main() {

    convertDecimalToBlancedTernary(256);

    convertToDecimal("+00+++");

}

/**
 * Converts a balanced Ternary into a decimal number
 * @param {*} val 
 */
function convertToDecimal(val) {
    console.log(
        "\nNow let us convert balanced ternary into decimal! \n" +
        "\nTo do so, we convert the +'s and -'s into 1's and -1's respectively. \n" +
        "Then we multiply that -1, 0, or 1 by 3 and raise it to it's index (relative to the radix)\n" +
        "For examble ++-0 would be 3^3 + 3^3 + (-3^1) + 0^0. Here we go!\n"
    );
    var componentPartsArray = [];
    var workingArray = val.split("");

    workingArray.reverse()
    workingArray.forEach((value, index, array) => {

        if (value == '+') {
            componentPartsArray.push(Number(Math.pow(3, index)).toString());
        }
        if (value == '-') {
            componentPartsArray.push("-" + Number(Math.pow(3, index)).toString());
        }
        if (value == "0") {
            componentPartsArray.push("0");
        }

    });
    console.log(componentPartsArray.reverse());
    console.log("\nNow we add them!");
    componentPartsArray.reverse();
    var decimalNumber = sumArray(componentPartsArray);
    console.log("\n[" + decimalNumber + "]");
    console.log("\nThe Blanced Ternary number " + val + " is equal to " + decimalNumber + " in base10!");

    return decimalNumber;
}

/**
 * A helper function which sums the array
 * @param {} array 
 */
function sumArray(array) {
    var sum = 0;
    array.forEach(v => {
        sum += parseInt(v);
    })
    return sum;
}

/**
 * A helper function which takes an int and
 * splits it into an array. Ex -> 453 -> [4,5,3]
 * @param {*} intVar 
 */
function intToArray(intVar) {
    return intVar.toString().split("").map(value => {
        return parseInt(value, 10)
    });
}

/**
 * Converts from Decimal to Ternary
 * @param {*} decimalNum 
 */
function convertFromDecimalToTernary(decimalNum) {
    console.log("First we convert Decimal into unbalanced Ternary! \n");
    console.log(
        "To do so we will divide by 3 and divide each subsequent quotient by 3" +
        ". The remainders will become our new unbalanced ternary number until our " +
        "quotient becomes 0! \n"
    );
    var originalDecimalNum = decimalNum;
    var decimalNumCopy = decimalNum;
    remainderValues = [];

    while (decimalNum != 0) {
        remainder = (decimalNum % 3);
        remainderValues.push(remainder);
        decimalNum = (Math.trunc(decimalNum / 3));
        console.log(
            decimalNumCopy + "/ 3 = " + decimalNum + " (quotient) | remainder = " + remainder
        );
        decimalNumCopy = decimalNum;


    }
    console.log("\nAnd then we invert the number! \n");
    remainderValues.reverse();
    console.log(
        "The decimal number " + originalDecimalNum + " is equal to " + remainderValues.join("") +
        " in unbalanced Ternary. \n\nNext we convert it to balanced Ternary! \n"
    );
    return parseInt(remainderValues.join(""));
}

/**
 * Converts an unbalnced Ternary into a balanced Ternary
 * @param {*} unbalancedTernary 
 */
function convertTernaryToBalancedTernary(unbalancedTernary) {

    var balancedTernary = [];
    unbalancedTernary = intToArray(unbalancedTernary);

    for (var x = (unbalancedTernary.length - 1); x >= 0; x--) {

        if (unbalancedTernary[x] == 0) {
            balancedTernary.unshift("0");
        }
        if (unbalancedTernary[x] == 1) {
            balancedTernary.unshift("+");
        }
        if (unbalancedTernary[x] == 2) {

            balancedTernary.unshift("-");
            if (x <= 0) {
                //If at the end of the number (and we no where to carry), prepend the + to the balanced Ternary
                balancedTernary.unshift("+");
            } else {
                unbalancedTernary[(x - 1)] = unbalancedTernary[(x - 1)] + 1;
            }

        }
        if (unbalancedTernary[x] == "3") {

            balancedTernary.unshift("0");
            if (x <= 0) {
                //If at the end of the number (and we no where to carry), prepend the + to the balanced Ternary
                balancedTernary.unshift("+");
            } else {
                unbalancedTernary[(x - 1)] = (parseInt(unbalancedTernary[(x - 1)]) + 1).toString();
            }

        }

        console.log("Round " + x + " --> " + unbalancedTernary + " Balanced --> " + balancedTernary);
    }

    return balancedTernary.join("");
}

function convertDecimalToBlancedTernary(decimalNum) {
    var balancedTernary = convertTernaryToBalancedTernary(convertFromDecimalToTernary(decimalNum));
    console.log(
        "\nThe decimal number " + decimalNum + " is equal to " + balancedTernary +
        " in balanced Ternary!"
    );
}

main();
