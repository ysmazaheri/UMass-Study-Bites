# UMass-Study-Bites
Campus Food Delivery Service:
- for dining halls
- accessing API's for addresses
- using express.js to host a server containing menus, orders, and users
- using maps for coordinates

run "npm start" to begin the server, then visit 'localhost:3000' to view the homepage.

**IMPORTANT**
On pages containing menus, if your local database is empty, it is required to 'refresh menus' via the button.
This will populate your database with our placeholder menus


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

Our file structure is simple
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


Our server uses http fetch() calls to create, remove, update, and delete the User, Menu, and Order objects present in PouchDB.
It also contains custom URLs for more precise actions, such as refreshing all of the menus present in the database, and adding a deliverer to an order.
These functions contain mutliple CRUD operations.

Updating these structures via fetch() will create menu/ orders/ and users/ folders. If these are deleted, your local database will be emptied