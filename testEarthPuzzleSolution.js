function solveEarthPuzzle() {
    const letters = ["N", "O", "R", "T", "H", "E", "A", "S", "U", "W"];
    const results = [];
    
    // Factorial function (not used in this context)
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

    // Generate permutations of an array
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

    // Map letters to digits based on a permutation
    function assignDigits(permutation) {
        return letters.reduce((map, letter, index) => {
            map[letter] = permutation[index];
            return map;
        }, {});
    }

    // Calculate the numeric value of a word based on the digit map
    function calculateWord(word, digitMap) {
        return parseInt(word.split("").map(ch => digitMap[ch]).join(""), 10);
    }

    // Generate all permutations of the digits 0-9
    const permutations = permute([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // Check each permutation for valid solutions
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

    return results;
}

// Measure execution time
console.time("Execution Time");
const solutions = solveEarthPuzzle();
console.timeEnd("Execution Time");

// Output the results
console.log(`Number of solutions: ${solutions.length}`);
if (solutions.length > 0) {
    console.log("Solutions:");
    solutions.forEach((solution, index) => {
        console.log(`Solution ${index + 1}: NORTH=${solution.NORTH}, EAST=${solution.EAST}, SOUTH=${solution.SOUTH}, WEST=${solution.WEST}, EARTH=${solution.EARTH}`);
    });
} else {
    console.log("No solutions found.");
}


