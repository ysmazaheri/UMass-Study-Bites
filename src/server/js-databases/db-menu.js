import PouchDB from "pouchdb";
import Menu from "../../client/js-models/menu.js";

const menuDB = new PouchDB("menu");


/**
 * Asynchronously adds a new menu to the database, generating a random id in the process
 * @async
 * @param {object} menu - JSON object representing a menu
 * @returns {Promise<void>} - A promise that resolves when the menu has been saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function createMenu(menu) {
    await menuDB.post(menu);
}

/**
 * Asynchronously modifies an existing menu in the database.
 *
 * @async
 * @param {Object} user - The menu to be updated.
 * @returns {Promise<void>} - A promise that resolves when the menu has been
 * successfully modified.
 * @throws {Error} - Throws an error if the operation fails, e.g., the menu
 * does not exist or database issues.
 */
export async function modifyMenu(menu) {
    await menuDB.put(menu);
}

/**
 * Asynchronously retrieves a menu from the database by its id.
 *
 * @async
 * @param {string} userId - The id of the menu to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the menu.
 * @throws {Error} - Throws an error if the menu cannot be found or if there
 * is a database issue.
 */
export async function loadMenu(menuId) {
    const menu = await menuDB.get(menuId);
    return menu;
}

/**
 * Asynchronously removes a menu from the database by its id.
 *
 * @async
 * @param {string} menuId - The id of the menu to be removed.
 * @returns {Promise<void>} - A promise that resolves when the menu has been
 * successfully removed.
 * @throws {Error} - Throws an error if the menu cannot be removed, e.g., it
 * does not exist or due to database issues.
 */
export async function removeMenu(menuId) {
    await menuDB.remove(menuId);
}

/**
 * Asynchronously returns all menus in the database
 *
 * @async
 * @returns {Promise<void>} - A promise that resolves when the menus have been
 * successfully returned.
 * @throws {Error} - Throws an error if the menus cannot be returned.
 */

export async function loadAllMenus() {
    const result = await menuDB.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
}


/**
 * Asynchronously refreshes all menus in the database
 * First, deletes all menus, then deletes by id
 * Finally, adds placeholder data into pouch
 *
 * @async
 * @returns {Promise<void>} - A promise that resolves when the menus have been
 * successfully returned.
 * @throws {Error} - Throws an error if the menus cannot be returned.
 */

export async function refreshMenus() {
    //gets all menus
    const result = await menuDB.allDocs({ include_docs: true });
    let menuArr = result.rows.map((row) => row.doc);

    //removes by id
    for(let i=0; i<menuArr.length; i++){
        let id = menuArr[i]._id;
        let rev = menuArr[i]._rev;
        console.log(id);
        if(id !== undefined){
            await menuDB.remove(id,rev);
        }
    }
    console.log('removed success');

    //adds new copies of menu
    let jsonMenu = JSON.stringify(frankBreakfastMenu);
    let menuToAdd = new Menu('Franklin Dining Commons','Breakfast',jsonMenu);

    let a = await menuDB.post(menuToAdd);

    jsonMenu = JSON.stringify(frankLunchMenu);
    menuToAdd = new Menu('Franklin Dining Commons','Lunch',jsonMenu);

    await menuDB.post(menuToAdd);

    jsonMenu = JSON.stringify(frankDinnerMenu);
    menuToAdd = new Menu('Franklin Dining Commons','Dinner',jsonMenu);

    await menuDB.post(menuToAdd);

    jsonMenu = JSON.stringify(wooBreakfastMenu);
    menuToAdd = new Menu('Worcester Dining Commons','Breakfast',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(wooLunchMenu);
    menuToAdd = new Menu('Worcester Dining Commons','Lunch',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(wooDinnerMenu);
    menuToAdd = new Menu('Worcester Dining Commons','Dinner',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(berkBreakfastMenu);
    menuToAdd = new Menu('Berkshire Dining Commons','Breakfast',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(berkLunchMenu);
    menuToAdd = new Menu('Berkshire Dining Commons','Lunch',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(berkDinnerMenu);
    menuToAdd = new Menu('Berkshire Dining Commons','Dinner',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(hampBreakfastMenu);
    menuToAdd = new Menu('Hampshire Dining Commons','Breakfast',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(hampLunchMenu);
    menuToAdd = new Menu('Hampshire Dining Commons','Lunch',jsonMenu);

    await menuDB.post(menuToAdd);
    
    jsonMenu = JSON.stringify(hampDinnerMenu);
    menuToAdd = new Menu('Hampshire Dining Commons','Dinner',jsonMenu);

    await menuDB.post(menuToAdd);

    console.log('added success');
}


//Placeholder menus used, as scraping real menus is not permitted by UMass, and out-of-scope for this project

let frankBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Sausage Links", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]},
      {name: "Omelette Station", tags: []}
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Toast Bar": [
        {name: "White Bread", tags: ["vegetarian"]},
        {name: "Everything Bagel", tags: ["vegetarian"]},
        {name: "Rye Bread", tags: ["vegetarian"]},
        {name: "Peanut Butter", tags: ["vegetarian"]},
        {name: "Butter", tags: ["vegetarian"]},
        {name: "Cream Cheese", tags: ["vegetarian"]},
        {name: "Strawberry Jelly", tags: ["vegetarian"]},
      ]
  };
  
  let frankLunchMenu = {
    "Entrees": [
      {name: "Grilled Chicken Breast", tags: []},
      {name: "Beef Lasagna", tags: []},
      {name: "Fried Rice", tags: []},
      {name: "Grilled Salmon", tags: []},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]}
    ],
    "Latino food": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Mango Salad", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]},
      {name: "Brownies", tags: ["vegetarian"]},
      {name: "Ice Cream", tags: ["vegetarian"]}
    ]
  };
  
  let frankDinnerMenu = {
    "Entrees": [
      {name: "Fried Rice", tags: []},
      {name: "Grilled Salmon", tags: []},
      {name: "Roast Pork", tags: []},
    ],
    "Express": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetable Lasagna", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Mango Salad", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Cheesecake", tags: ["vegetarian"]},
      {name: "Apple Pie", tags: ["vegetarian"]},
    ]
  };
  
  let wooBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "Pancakes with Maple Syrup", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]}
    ],
    "Cold Breakfast Items": [
      {name: "Greek Yogurt with Granola", tags: ["vegetarian"]},
      {name: "Assorted Cereal Bar with Milk", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Extras": [
      {name: "Toast Bar", tags: ["vegetarian"]},
    ]
  };
  
  let wooLunchMenu = {
    "Entrees": [
      {name: "Grilled Chicken Breast", tags: []},
      {name: "Stir-Fry", tags: ["vegetarian"]},
      {name: "Beef Lasagna", tags: []},
      {name: "Pasta with Marinara Sauce", tags: ["vegetarian"]},
    ],
    "Latino Food": [
      {name: "Spicy Mango Salad", tags: ["vegetarian"]},
      {name: "Beef Fajitas", tags: []},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]}
    ]
  };
  
  let wooDinnerMenu = {
    "Grill": [
      {name: "Burger", tags: []},
      {name: "French Fries", tags: ["vegetarian"]},
      {name: "Grilled Chicken", tags: []},
      {name: "Jerk Chicken", tags: []}
    ],
    "Salad Bar": [
      {name: "Mixed Green Salad", tags: ["vegetarian"]}
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Brownies", tags: ["vegetarian"]}
    ]
  };
  
  let hampBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Sausage Links", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]},
    ],
    "Cold Breakfast Items": [
        {name: "Vanilla Yogurt", tags: ["vegetarian"]},
        {name: "Strawberry Yogurt", tags: ["vegetarian"]},
        {name: "Granola", tags: ["vegetarian"]},
        {name: "Strawberries", tags: ["vegetarian"]},
        {name: "Blackberries", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Toast Bar": [
      {name: "White Bread", tags: ["vegetarian"]},
      {name: "Everything Bagel", tags: ["vegetarian"]},
      {name: "Rye Bread", tags: ["vegetarian"]},
      {name: "Peanut Butter", tags: ["vegetarian"]},
      {name: "Butter", tags: ["vegetarian"]},
      {name: "Cream Cheese", tags: ["vegetarian"]},
      {name: "Strawberry Jelly", tags: ["vegetarian"]},
    ],
  };
  
  let hampLunchMenu = {
    "Entrees": [
      {name: "Hampshire Chicken Breast", tags: []},
      {name: "Beef Lasagna", tags: []},
      {name: "Fried Rice", tags: []},
      {name: "Grilled Salmon", tags: []},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]}
    ],
    "Latino food": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Baked Beans", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]},
      {name: "Brownies", tags: ["vegetarian"]},
      {name: "Ice Cream", tags: ["vegetarian"]}
    ]
  };
  
  let hampDinnerMenu = {
    "Entrees": [
      {name: "Grilled Salmon", tags: []},
      {name: "Roast Pork", tags: []},
    ],
    "Express": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetable Lasagna", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Baked Beans", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Cheesecake", tags: ["vegetarian"]},
      {name: "Apple Pie", tags: ["vegetarian"]},
    ]
  };
  
  let berkBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "Pancakes with Maple Syrup", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]}
    ],
    "Cold Breakfast Items": [
      {name: "Greek Yogurt with Granola", tags: ["vegetarian"]},
      {name: "Assorted Cereal Bar with Milk", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Extras": [
      {name: "Toast Bar", tags: ["vegetarian"]},
    ]
  };
  
  let berkLunchMenu = {
    "Entrees": [
      {name: "Grilled Chicken Breast", tags: []},
      {name: "Stir-Fry", tags: ["vegetarian"]},
      {name: "Beef Lasagna", tags: []},
      {name: "Pasta with Marinara Sauce", tags: ["vegetarian"]},
    ],
    "Latino Food": [
      {name: "Spicy Mango Salad", tags: ["vegetarian"]},
      {name: "Beef Fajitas", tags: []},
    ],
    "Express": [
        {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
        {name: "Fried Rice", tags: []}
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]}
    ]
  };
  
  let berkDinnerMenu = {
    "Grill": [
      {name: "Berkshire Burger", tags: []},
      {name: "French Fries", tags: ["vegetarian"]},
      {name: "Grilled Chicken", tags: []},
      {name: "Jerk Chicken", tags: []}
    ],
    "Express": [
        {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
        {name: "Fried Rice", tags: []}
    ],
    "Salad Bar": [
      {name: "Mixed Green Salad", tags: ["vegetarian"]}
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Brownies", tags: ["vegetarian"]}
    ]
  };