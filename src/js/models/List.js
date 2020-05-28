import uniqid from 'uniqid';


export default class List {
    constructor() {
        this.items = []; //starts off empty, new items get stored as objects in here over time
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(), //creates a unique id for each of these items using 3rd party package
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id)
        // [2,4,8] splice(1, 1); (1 = index, 1 = how many elements) // returns 4, original array is [2, 8] (mutates the original array)
        // [2,4,8] slice(1, 2); (1 = index, 2 = up til when and not including? // returns 4, original array is [2, 4, 8] (does not mutate the original array)
        this.items.splice(index, 1) // want to remove 1 item with a specific index
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
        // loop through all elements in the items array and select the one that has the id that we pass in to the function
        // then we return an object and change the count property on it
    }
 }