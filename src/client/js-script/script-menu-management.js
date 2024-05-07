import Menu from '../js-models/menu.js';

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener('click', refreshMenus);
const URL = "http://localhost:3000";


//Removes current instances of menus from local PouchDB instance, then fills it with placeholder menus below
//This ensures there are no duplicate entries, and lends itself to a more efficient full implementation

async function refreshMenus() {

  //Retrieve all current menus from PouchDB
  let menuResponse = await fetch(`${URL}/menu-all`, {
    method: "GET",
  });
  let menuJson = await menuResponse.json();
  let menuArr = menuJson.menus;
  console.log(menuArr);


  //Attempts to delete all menus by id. Logs success or failure, and returns on failure
  try{
    for(let i=0; i<menuArr.length; i++){
      let menu = menuArr[i];
      await fetch(`${URL}/menu-delete?id=${menu._id}`, {
        method: "DELETE",
      });
      console.log('Successfully removed menu');
    }
  }catch(ex){
    console.log('Error deleting old menus');
    return;
  }

  //Adds placeholder menus into Pouch via addMenu function (reduces duplicate code)
  await addMenu('Franklin Dining Commons', 'Breakfast', frankBreakfastMenu);
  await addMenu('Franklin Dining Commons', 'Lunch', frankLunchMenu);
  await addMenu('Franklin Dining Commons', 'Dinner', frankDinnerMenu);

  await addMenu('Worcester Dining Commons', 'Breakfast', wooBreakfastMenu);
  await addMenu('Worcester Dining Commons', 'Lunch', wooLunchMenu);
  await addMenu('Worcester Dining Commons', 'Dinner', wooDinnerMenu);

  await addMenu('Berkshire Dining Commons', 'Breakfast', berkBreakfastMenu);
  await addMenu('Berkshire Dining Commons', 'Lunch', berkLunchMenu);
  await addMenu('Berkshire Dining Commons', 'Dinner', berkDinnerMenu);

  await addMenu('Hampshire Dining Commons', 'Breakfast', hampBreakfastMenu);
  await addMenu('Hampshire Dining Commons', 'Lunch', hampLunchMenu);
  await addMenu('Hampshire Dining Commons', 'Dinner', hampDinnerMenu);

  console.log('done');
  let newMenuResponse = await fetch(`${URL}/menu-all`, {
    method: "GET",
  });
  let newMenuJson = await newMenuResponse.json();
  let newMenuArr = menuJson.menus;
  console.log(newMenuArr);
}

//Adds a given menu to Pouch via fetch calls
async function addMenu(diningHall,meal,food) {
  let jsonMenu = JSON.stringify(food);
  let menuToAdd = new Menu(diningHall,meal,jsonMenu);
  let stringifiedMenu = JSON.stringify(menuToAdd);
  try{
    let menuResponse = await fetch(`${URL}/menu-create?menu=${stringifiedMenu}`, {
      method: "POST",
    });
    console.log(menuResponse);
  }catch(ex){
    console.log('Failed to add menu from ' + menuToAdd.diningHall);
  }

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