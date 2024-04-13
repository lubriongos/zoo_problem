const fs = require('fs');
const path = require('path');

// Function to read the content of a file and return it as an array of lines
function readLinesFromFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        // If file is empty, throws error
        if (content.trim() === '') {
            throw new Error(`File ${filename} is empty`);
        }
        // Removes extra carriage return characters and splits the content by lines
        return content.replace(/\r/g, '').trim().split('\n');
    } catch (error) {
        throw new Error(`Error reading file ${filename}: ${error.message}`);
    }
}

// Function to find the extra food
function findExtraFood(animals, food) {
    // Check if there are more animals than food
    if (animals.length > food.length) {
        throw new Error('There are more animals than food');
    }

    // Create a map to keep track of the count of each food item
    const foodCount = new Map();
    food.forEach(item => {
        foodCount.set(item, (foodCount.get(item) || 0) + 1);
    });

    // Iterate through the animals and decrement the count of corresponding food item
    animals.forEach(animal => {
        let foodItem = getFoodItem(animal);

        // Check whether the animal has food allocated to it
        if (!foodCount.has(foodItem) || foodCount.get(foodItem) === 0) {
            throw new Error(`Animal ${animal} doesn't have food`);
        }

        foodCount.set(foodItem, foodCount.get(foodItem) - 1);
    });

    // Collect the remaining food items
    const leftoverFood = [];
    foodCount.forEach((count, foodItem) => {
        for (let i = 0; i < count; i++) {
            leftoverFood.push(foodItem);
        }
    });

    // Create the leftover food string
    return leftoverFood.join('-');
}

// Function to map animal to food item
function getFoodItem(animal) {
    switch (animal) {
        case 'tiger':
            return 'deer';
        case 'donkey':
            return 'hay';
        case 'cat':
            return 'fish';
        case 'dog':
            return 'dogfood';
        case 'rabbit':
            return 'carrot';
        default:
            throw new Error(`Unknown animal: ${animal}`);
    }
}

module.exports = {
    readLinesFromFile: readLinesFromFile,
    findExtraFood: findExtraFood,
    getFoodItem: getFoodItem
};

// Read the lists from files
const animalsPath = path.join(__dirname, 'animals.txt');
const foodPath = path.join(__dirname, 'food.txt');
const animals = readLinesFromFile(animalsPath);
const food = readLinesFromFile(foodPath);

// Find the extra food and display the result
console.log(findExtraFood(animals, food));
