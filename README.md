# UMass-Study-Bites
Campus Food Delivery Service:
- for dining halls
- accessing API's for addresses
- using express.js to host a server containing menus, orders, and users
- using maps for coordinates

**Setup**

Run "npm i" or "npm install" to download all required packages
Rename src/client/YOUR_SECRETS.js to 'secrets.js', and put your Google Maps API key (if you have one) in the specified place in the file
- If you do not have a Google Maps API key, you must still rename the file, the map will simply not appear
Run "npm start" to begin the server, then visit 'localhost:3000' to view the homepage and begin using the app.


**IMPORTANT**
If a 'node-modules' folder is present BEFORE running npm install (this is unlikely to ever occur), make sure to delete it before installing packages.
Some packages are OS-specific, and may not be compatible with your machine.

On pages containing menus, if your local database is empty, it is required to 'refresh menus' via the button.
This will populate your database with our placeholder menus.


**Updating Local Storage**

The placeholder menus used in this project are stored in src/server/js-databases/db-menu.js
To change any of these menus, simply update the JSON object in that file, save, and restart the server. 
Then, clicking 'refresh menus' on any of the pages with that button will refresh your local database with the new menu(s).

Updating locally stored users and deliveries requires creating users and ordering food in the app itself.
Users cannot be deleted through the app, but orders are deleted by completing them via the Delivery page


**Pages**

Our project is a campus food delivery students intended to be used between students. It allows students to order dining hall food at the cost of 1 token. Each token is earned by delivering a meal from a dining hall to another student.

Right now, we have 4 main pages accessible from a sidebar
1) a homepage, which allows the user to choose a dining hall to order from, then their location to get it delivered to.
After this, they are presented with that dining hall's current menu (from PouchDB), which allows them to select what their order should be.

2) a menu page, which allows the user to easily browse all of the day's dining hall menus. All 4 dining halls and all 3 meals can be selected from this screen, whereupon they are pulled from PouchDB and programically displayed.
A user's current order is stored in local browser storage until the order is placed, at which point it is pushed to PouchDB

Both of the above pages allow selection of a location via a list, a searchbar, and a map using Google Maps' API

3) a deliver page, where the user can see all outstanding deliveries (pulled from PouchDB), and assign one to themselves to deliver it
All of these pages can be filtered by text, so the user can find what they are looking for with ease

4) a sign-in page, which simply allows users to log in

**Workflow**
In our app, the user experience is as follows
- Sign up or sign in via the proper screen
- Use the 'menus' page to browse the menus at all dining halls
- Use the homepage to select a location to order from
- Click next, then select your delivery location
- Select desired foods from the menu
- Place order

Another user will deliver this order
- Use the 'deliver' page to view available deiliveries
- Click a delivery to assign the delivery to yourself
- Upon the delivery's completion, the order is removed from the database


**File Structure**

Our file structure is as follows:

- client/ contains all client-side code
  - all html pages are present in client/
  - assets/ contains the necessary images
  - css-styles/ contains all css files
  - js-models/ contains files for the custom classes used. This includes menu, order, orderCart, orderStorage, and user classes
  - js-script/ contains script files for each page, as well as a universal script shared across the entire site
  - test-files/ can be ignored, and nothing contained in it is used in our live project


- server/ contains all server-side code
  - js-databases contains our files for databases. This includes a database for menus, orders, and users running on PouchDB
  - server.js contains all code required for running our server on port 3000


**Server Functionality**

Our server uses http fetch() calls to create, remove, update, and delete the User, Menu, and Order objects present in PouchDB.
It also contains custom URLs for more precise actions, such as refreshing all of the menus present in the database, and adding a deliverer to an order.
These functions contain mutliple CRUD operations.

Updating these structures via fetch() will create menu/ orders/ and users/ folders. If these are deleted, your local database will be emptied