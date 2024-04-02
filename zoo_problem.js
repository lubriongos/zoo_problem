// Read the content of a file and return it as an array of lines
function readLinesFromFile(filename) {
    const fs = require('fs');
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        // Removes extra carriage return characters and splits the content by lines
        return content.replace(/\r/g, '').trim().split('\n');
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return [];
    }
}

// Function to find the extra food
function findExtraFood(animals, food) {
    // Create a map to keep track of the count of each food item
    const foodCount = new Map();
    food.forEach(item => {
        foodCount.set(item, (foodCount.get(item) || 0) + 1);
    });

    // Iterate through the animals and decrement the count of corresponding food item
    animals.forEach(animal => {
        let foodItem = animal;
        switch (animal) {
            case 'tiger':
                foodItem = 'deer';
                break;
            case 'donkey':
                foodItem = 'hay';
                break;
            case 'cat':
                foodItem = 'fish';
                break;
            case 'dog':
                foodItem = 'dogfood';
                break;
            case 'rabbit':
                foodItem = 'carrot';
                break;
        }

        if (foodCount.get(foodItem) > 0) {
            foodCount.set(foodItem, foodCount.get(foodItem) - 1);
        }
    });

    // Collect the remaining food items
    const leftoverFood = [];
    foodCount.forEach((count, foodItem) => {
        for (let i = 0; i < count; i++) {
            leftoverFood.push(foodItem);
        }
    });

    // Create the leftover food string
    const leftoverFoodStr = leftoverFood.join('-');
    return leftoverFoodStr;
}

// Export the findExtraFood function to be accessible from other files
module.exports = {
    readLinesFromFile: readLinesFromFile,
    findExtraFood: findExtraFood
};

// Read the lists from files
const path = require('path');
const animalsPath = path.join(__dirname, 'animals.txt');
const animals = readLinesFromFile(animalsPath);
const foodPath = path.join(__dirname, 'food.txt');
const food = readLinesFromFile(foodPath);

// Find the extra food and display the result
console.log(findExtraFood(animals, food));
