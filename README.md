# earthPuzzleSolution

Overview
The purpose of this code is to solve a puzzle where you assign unique digits (0-9) to letters in the words "NORTH," "EAST," "SOUTH," "WEST," and "EARTH" such that the equation holds:

NORTH
+
EAST
+
SOUTH
+
WEST
=
EARTH
NORTH+EAST+SOUTH+WEST=EARTH

Code Breakdown

function solveEarthPuzzle() {
    const letters = ["N", "O", "R", "T", "H", "E", "A", "S", "U", "W"];
    const results = [];
    
Function Declaration: The function solveEarthPuzzle is defined.
Letters Array: An array letters contains all unique letters involved in the puzzle.
Results Array: An empty array results is initialized to store any valid solutions found.

Factorial Function (Not Used)
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

This is a recursive function to calculate the factorial of a number. However, it is not utilized in this code, so it can be removed unless needed elsewhere.

Permutation Function

   function permute(array) {
        if (array.length === 0) return [[]];
        const permutations = [];
        for (let i = 0; i < array.length; i++) {
            const rest = array.slice(0, i).concat(array.slice(i + 1));
            for (const perm of permute(rest)) {
                permutations.push([array[i], ...perm]);
            }
        }
        return permutations;
    }
Purpose: This function generates all possible permutations of an input array.
Base Case: If the input array is empty, it returns an array containing an empty array.
Recursive Case: It iterates through the array, taking each element as the first element and recursively generating permutations of the remaining elements. Each permutation is then combined with the current element and stored in the permutations array.

Assign Digits Function
   function assignDigits(permutation) {
        return letters.reduce((map, letter, index) => {
            map[letter] = permutation[index];
            return map;
        }, {});
    }
Purpose: This function maps each letter to a digit based on a provided permutation.
Implementation: Using reduce, it creates an object map where each letter from the letters array is a key, and its corresponding digit from the permutation is the value.

Calculate Word Function

function calculateWord(word, digitMap) {
        return parseInt(word.split("").map(ch => digitMap[ch]).join(""), 10);
    }

Purpose: This function converts a word (like "NORTH") into its numeric representation based on the digit mapping.

Implementation:
It splits the word into individual characters.
Maps each character to its corresponding digit using digitMap.
Joins the digits into a string and converts it to an integer using parseInt.

Main Logic

const permutations = permute([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
Generate Permutations: This line generates all permutations of the digits 0-9 (10 unique digits).

Check Each Permutation

    for (const perm of permutations) {
        const digitMap = assignDigits(perm);
        const NORTH = calculateWord("NORTH", digitMap);
        const EAST = calculateWord("EAST", digitMap);
        const SOUTH = calculateWord("SOUTH", digitMap);
        const WEST = calculateWord("WEST", digitMap);
        const EARTH = calculateWord("EARTH", digitMap);

        if (NORTH + EAST + SOUTH + WEST === EARTH) {
            results.push({ NORTH, EAST, SOUTH, WEST, EARTH });
        }
    }
Loop Through Permutations: For each permutation of digits:
A digit mapping (digitMap) is created.
Each word is converted to its numeric value using calculateWord.
The equation is checked: if the sum of NORTH, EAST, SOUTH, and WEST equals EARTH.
If the equation holds true, the values are pushed into the results array as an object.

Return Results

    return results;
}

The function returns the results array containing all valid solutions.
Execution Time Measurement and Output

console.time("Execution Time");
const solutions = solveEarthPuzzle();
console.timeEnd("Execution Time");

console.log(`Number of solutions: ${solutions.length}`);
if (solutions.length > 0) {
    console.log("Solutions:");
    solutions.forEach((solution, index) => {
        console.log(`Solution ${index + 1}: NORTH=${solution.NORTH}, EAST=${solution.EAST}, SOUTH=${solution.SOUTH}, WEST=${solution.WEST}, EARTH=${solution.EARTH}`);
    });
} else {
    console.log("No solutions found.");
}
Timing: The execution time of the solveEarthPuzzle function is measured and logged.
Output: The number of solutions found is displayed, and if there are any solutions, they are printed in a readable format.

Summary
This code systematically explores all possible digit assignments to solve the puzzle defined by the equation involving the words "NORTH," "EAST," "SOUTH," "WEST," and "EARTH." It uses permutations to ensure unique digit assignments and checks each assignment for validity, ultimately returning and displaying all valid solutions found.
