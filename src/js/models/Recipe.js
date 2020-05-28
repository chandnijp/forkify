import axios from 'axios';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;            
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length; //calculates how many ingredients
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // replace everything that is in the parentheses with a regular expression

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' '); //put the ingredients in an array
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2)) //for each current element, test if that element is inside of the units array and return the index

            let objIng;

            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") = 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+')); // if there is a minus between the 2 values (1-1/3 onions), replace with a + and evaluate
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) { //take the first element of the array and convert it into a number, if this is successful then it will coerce to true, else it will coerce to false
                // There is NO unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') // return the ingredients starting from index 1 (after the number) and join then back into a string
                }

            } else if (unitIndex === -1) {
                // There is no unit and NO number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient // (ingredient: ingredient)
                }
            }

            return objIng;

        });
        this.ingredients = newIngredients;
    }

    updateServings (type) { // type = + or -
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings) //1 onion for 4 people.. now 3 people so 1 * (3/4) = 3/4 onions for 3 people
        });

        this.servings = newServings;
    }
}