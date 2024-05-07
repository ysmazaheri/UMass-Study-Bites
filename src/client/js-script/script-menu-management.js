/*import Menu from '../js-models/menu.js';

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener('click', refreshMenus);
const URL = "http://localhost:3000";


//Removes current instances of menus from local PouchDB instance, then fills it with placeholder menus below
//This ensures there are no duplicate entries, and lends itself to a more efficient full implementation

async function refreshMenus() {

  //refresh menus
  try{
    let menuResponse = await fetch(`${URL}/menu-refresh`, {
      method: "GET",
    });
    console.log('Refreshed Menus');
  }catch(ex){
    console.log('Error refreshing menus');
  }


  //Retrieve all current menus from PouchDB
  try{
    let menuResponse = await fetch(`${URL}/menu-all`, {
      method: "GET",
    });
    let menuJson = await menuResponse.json();
    let menuArr = menuJson.menus;
    console.log(menuArr);
  }catch(ex){
    console.log('Error retrieving menus');
  }

}
*/