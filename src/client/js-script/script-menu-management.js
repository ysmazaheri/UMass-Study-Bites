import { loadAllMenus } from "../../server/js-databases/db-menu.js";

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener('click', refreshMenus);

function refreshMenus() {
  

  //console.log(frankBreakfastMenu['Hot Breakfast Items'][0].name);
}

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