const assert = require('assert');
const path = require('path');
const { readLinesFromFile, findExtraFood, getFoodItem } = require('./zoo_problem');

function testGivenExampleDataWhenFindExtraFoodReturnsExpectedResult() {
    const animalsPath = path.join(__dirname, 'test_animals.txt');
    const foodPath = path.join(__dirname, 'test_food.txt');
    const animals = readLinesFromFile(animalsPath);
    const food = readLinesFromFile(foodPath);

    const expectedResult = 'deer-deer-dogfood';
    const result = findExtraFood(animals, food);

    if (result === expectedResult) {
        console.log('Test passed: Basic case');
    } else {
        console.error(`Test failed: Basic case. Expected "${expectedResult}", but got "${result}"`);
    }
}

function testGivenMoreAnimalsWhenFindExtraFoodThrowsError() {
    const animals = ['cat', 'tiger', 'donkey'];
    const food = ['fish', 'deer'];

    try {
        findExtraFood(animals, food);
        assert.fail('Expected an error to be thrown');
    } catch (error) {
        assert.strictEqual(error.message, 'There are more animals than food');
        console.log('Test passed: More Animals Than Food');
    }
}

function testGivenEmptyAnimalsFileWhenReadLinesFromFileThrowsErrorForEmptyAnimals() {
    const emptyAnimalsFile = 'empty_animals.txt';
    const foodFile = 'test_food.txt';

    try {
        const animals = readLinesFromFile(emptyAnimalsFile);
        const food = readLinesFromFile(foodFile);

        assert.fail('Expected an error to be thrown');
    } catch (error) {
        assert.ok(error.message.includes(`File ${emptyAnimalsFile} is empty`));
        console.log('Test passed: Empty animals file');
    }
}

function testGivenEmptyFoodFileWhenReadLinesFromFileThrowsErrorForEmptyFood() {
    const animalsFile = 'test_animals.txt';
    const emptyFoodFile = 'empty_food.txt';

    try {
        const animals = readLinesFromFile(animalsFile);
        const food = readLinesFromFile(emptyFoodFile);

        assert.fail('Expected an error to be thrown');
    } catch (error) {
        assert.ok(error.message.includes(`File ${emptyFoodFile} is empty`));
        console.log('Test passed: Empty food file');
    }
}

function testGivenNonexistentAnimalFileWhenReadLinesFromFileThrowsErrorForNonexistentAnimalFile() {
    const nonexistentAnimalsFile = 'nonexistent_animals.txt';
    const foodFile = 'test_food.txt';

    try {
        const animals = readLinesFromFile(nonexistentAnimalsFile);
        const food = readLinesFromFile(foodFile);

        assert.fail('Expected an error to be thrown');
    } catch (error) {
        assert.strictEqual(error.message, `Error reading file ${nonexistentAnimalsFile}: ENOENT: no such file or directory, open '${nonexistentAnimalsFile}'`);
        console.log('Test passed: Nonexistent files');
    }
}

function testGivenNonexistentFoodFileWhenReadLinesFromFileThrowsErrorForNonexistentFoodFile() {
    const animalsFile = 'test_animals.txt';
    const nonexistentFoodFile = 'nonexistent_food.txt';

    try {
        const animals = readLinesFromFile(animalsFile);
        const food = readLinesFromFile(nonexistentFoodFile);

        assert.fail('Expected an error to be thrown');
    } catch (error) {
        assert.strictEqual(error.message, `Error reading file ${nonexistentFoodFile}: ENOENT: no such file or directory, open '${nonexistentFoodFile}'`);
        console.log('Test passed: Nonexistent files');
    }
}

function testGivenUnknownAnimalWhenFindExtraFoodThrowsErrorForUnknownAnimal() {
    const animals = ['cat', 'tiger', 'dog', 'elephant'];
    const food = ['fish', 'deer', 'dogfood', 'carrot', 'hay'];

    try {
        findExtraFood(animals, food);
        assert.fail('Expected an error to be thrown');
    } catch (error) {
        assert.strictEqual(error.message, 'Unknown animal: elephant');
        console.log('Test passed: Unknown animal');
    }
}

function testGivenUnknownFoodWhenFindExtraFoodThrowsErrorForUnknownFood() {
    const animals = ['cat', 'tiger', 'dog'];
    const food = ['fish', 'deer', 'dogfood', 'carrot', 'empanada'];

    const expectedResult = 'carrot-empanada';
    const result = findExtraFood(animals, food);

    if (result === expectedResult) {
        console.log('Test passed: Unknown food');
    } else {
        console.error(`Test failed: Unknown food. Expected "${expectedResult}", but got "${result}"`);
    }
}

function testGivenNoExtraFoodWhenFindExtraFoodReturnsEmptyString() {
    const animals = ['cat', 'tiger', 'dog'];
    const food = ['fish', 'deer', 'dogfood'];

    const expectedResult = '';
    const result = findExtraFood(animals, food);

    if (result === expectedResult) {
        console.log('Test passed: No extra food');
    } else {
        console.error(`Test failed: No extra food. Expected "${expectedResult}", but got "${result}"`);
    }
}

function testGivenAnimalWithoutFoodWhenFindExtraFoodThrowsError() {
    const animals = ['cat', 'tiger', 'dog'];
    const food = ['fish', 'deer', 'carrot'];

    try {
        findExtraFood(animals, food);
        assert.fail('Expected an error to be thrown');
    } catch (error) {
        const animal = animals.find(animal => !food.includes(getFoodItem(animal)));
        assert.strictEqual(error.message, `Animal ${animal} doesn't have food`);
        console.log(`Test passed: No food for ${animal}`);
    }
}

function runTests() {
    testGivenExampleDataWhenFindExtraFoodReturnsExpectedResult();
    testGivenMoreAnimalsWhenFindExtraFoodThrowsError()
    testGivenEmptyAnimalsFileWhenReadLinesFromFileThrowsErrorForEmptyAnimals();
    testGivenEmptyFoodFileWhenReadLinesFromFileThrowsErrorForEmptyFood();
    testGivenNonexistentAnimalFileWhenReadLinesFromFileThrowsErrorForNonexistentAnimalFile();
    testGivenNonexistentFoodFileWhenReadLinesFromFileThrowsErrorForNonexistentFoodFile();
    testGivenUnknownAnimalWhenFindExtraFoodThrowsErrorForUnknownAnimal();
    testGivenUnknownFoodWhenFindExtraFoodThrowsErrorForUnknownFood();
    testGivenNoExtraFoodWhenFindExtraFoodReturnsEmptyString();
    testGivenAnimalWithoutFoodWhenFindExtraFoodThrowsError()
}

runTests();
