let inventoryList = loadInventoryListFromLocalStorage();
// const inventoryLists = {
//     fridge: [],
//     freezer: [],
//     pantry: [],
//     counter: []
// };
// let currentLocation = "";

const inventoryListTable = document.getElementById("inventory-list");
const itemCountSpan = document.getElementById("item-count");
const popup = document.getElementById("popup");

function go() {
    const location = document.getElementById("locations").value.toLowerCase();
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add("hidden"));

    // if (inventoryLists.hasOwnProperty(location)) {
    //     currentLocation = location;
    //     document.getElementById("location").classList.remove("hidden");
    //     updateInventoryList();
    // } else {
    //     alert("invalid invenotry entry")
    //     return;
    // }

    // const content = `<div id="scroll">
    //     <div id="inventory-container">
    //         <div id="inventory-list-section">
    //             <div class="section-title">
    //                 <h2>${location} list <span id="item-count">(0)</span></h2>
    //             </div>
    //             <div class="inventory-buttons">
    //                 <input list="filter-options" id="filter" placeholder="filter">
    //                 <datalist id="filter-options">
    //                     <option value="alphabetical">
    //                     <option value="fruits">
    //                     <option value="vegetables">
    //                     <option value="grains">  
    //                     <option value="meat">
    //                     <option value="poultry">
    //                     <option value="seafood">
    //                     <option value="nuts/seeds">
    //                     <option value="dairy">
    //                     <option value="herbs/spices">
    //                     <option value="beverages">
    //                     <option value="condiments/sauces">
    //                 </datalist><br><br>
    //                 <button id="sort-button" onclick="sort()">Sort</button>
    //                 <button id="addItemButton" class="add-item-button" onclick="showAddItemPopup()">Add an Item</button>
    //             </div>
    //             <table id="inventory-list">
    //                 <tbody></tbody>
    //             </table>
    //         </div>
    //     </div>
    // </div>

    // <div id="popup" class="hidden">
    //     <div class="popup-content">
    //         <label>Input Information Below</label>
    //         <input type="text" id="item-name" placeholder="enter item name..."><br>
    //         <input type="number" id="amt" min="1" placeholder="enter amt...">
    //         <input type="text" id="unit" placeholder="enter unit of measurement..."><br>
    //         <input list="tag-options" id="tag-name" placeholder="choose tag name">
    //                 <datalist id="tag-options">
    //                     <option value="fruits">
    //                     <option value="vegetables">
    //                     <option value="grains">  
    //                     <option value="meat">
    //                     <option value="poultry">
    //                     <option value="seafood">
    //                     <option value="nuts/seeds">
    //                     <option value="dairy">
    //                     <option value="herbs/spices">
    //                     <option value="beverages">
    //                     <option value="condiments/sauces">
    //                 </datalist><br><br>
    //         <button onclick="addItem()" class="popUpButtons" id="addItem">Add Item</button>
    //         <button onclick="closePopup()" class="popUpButtons" id="cancel">Cancel</button>
    //     </div>
    // </div>

    // <div id="footerBackground">
    //     <footer>
    //         <a href="inventory.html" id="inventoryIcon"><img src="icons/inventoryIcon.png" alt="inventoryIcon"></a>
    //         <a href="shopping.html" id="shoppingIcon"><img src="icons/shoppingIcon.png" alt="shoppingIcon"></a>
    //         <a href="recipes.html" id="recipesIcon"><img src="icons/recipesIcon.png" alt="recipesIcon"></a>
    //         <a href="profile.html" id="profileIcon"><img src="icons/profileIcon.png" alt="profileIcon"></a>
    //     </footer>
    // </div>`;
    
    // const validLocations = ["fridge", "freezer", "pantry", "counter"];
    // if (validLocations.includes(location)) {
    //     location.classList.remove("hidden");
    //     location.innerHTML = content;
    // }

    if (location === "fridge") {
        document.getElementById("fridge").classList.remove("hidden");
        // document.querySelector("#fridge").innerHTML = content;
    } else if (location === "freezer") {
        document.getElementById("freezer").classList.remove("hidden");
        // document.querySelector("#freezer").innerHTML = content;
    } else if (location === "pantry") {
        document.getElementById("pantry").classList.remove("hidden");
        // document.querySelector("#pantry").innerHTML = content;
    } else if (location === "counter") {
        document.getElementById("counter").classList.remove("hidden");
        // document.querySelector("#counter").innerHTML = content;
    } else {
        /* another way instead of alert */
        alert("invalid location entry")
        return;
    }

    // document.getElementById("sort-button").onclick = sort;
    // document.getElementById("addItemButton").onclick = showAddItemPopup;
    // document.getElementById("addItem").onclick = addItem;
    // document.getElementById("cancel").onclick = closePopup;

    // document.getElementById("sort-button").addEventListener("click", sort);
    // document.getElementById("addItemButton").addEventListener("click", showAddItemPopup);
    // document.getElementById("addItem").addEventListener("click", addItem);
    // document.getElementById("cancel").addEventListener("click", closePopup);
}

// Show popup to add an item
function showAddItemPopup() {
    // const popup = document.getElementById("popup");
    // if(!popup) {
    //     console.error("error found");
    //     return;
    // }
    popup.classList.remove("hidden");
}

// Close the add item popup
function closePopup() {
    // const popup = document.getElementById("popup");
    // if(!popup) {
    //     console.error("error found");
    //     return;
    // }
    document.getElementById("item-name").value = ""; // Clear input
    document.getElementById("amt").value = ""; // Clear input
    document.getElementById("unit").value = ""; // Clear input
    document.getElementById("tag-name").value = ""; // Clear input
    popup.classList.add("hidden");
}

function sort() {
    let currentFilter = document.getElementById("filter").value;
    let sortedList = [...inventoryList];
    if (currentFilter === "original list") {
        saveInventoryListToLocalStorage();
        updateInventoryList();
    } else if (currentFilter === "alphabetical") {
        sortedList.sort((a,b) => a.name.localeCompare(b.name));
        saveInventoryListToLocalStorage();
        updateInventoryList(sortedList);
    } else if (currentFilter === "fruits" || currentFilter === "vegetables" || currentFilter === "grains" || 
                currentFilter === "meat" || currentFilter === "poultry" || currentFilter === "seafood" || 
                currentFilter === "nuts/seeds" || currentFilter === "dairy" || currentFilter === "herbs/spices" || 
                currentFilter === "beverages" || currentFilter === "condiments/sauces") {
        alert("sort by tag");
        sortedList = sortedList.filter(item => item.tagName === currentFilter);
        sortedList.sort((a,b) => a.name.localeCompare(b.name));
        saveInventoryListToLocalStorage();
        updateInventoryList(sortedList);
    } else {
        alert("invalid filter entry")
        return;
    }
}

// Add an item to the inventory list from the popup input fields
function addItem() {
    // event.preventDefault();
    const itemName = document.getElementById("item-name").value;
    const amt = parseInt(document.getElementById("amt").value, 10);
    const unit = document.getElementById("unit").value;
    const tagName = document.getElementById("tag-name").value;

    if (itemName && amt > 0) {
        const existingItem = inventoryList.find(item => item.name.toLowerCase() === itemName.toLowerCase());
        
        if (existingItem) {
            existingItem.amt += amt;
        } else {
            inventoryList.push({ name: itemName, amt, unit, tagName });
        }
        saveInventoryListToLocalStorage();
        updateInventoryList();
        itemCountSpan.textContent = `(${inventoryList.length})`;
    }
    
    closePopup();

    document.getElementById("item-name").value = ""; // Clear input
    document.getElementById("amt").value = ""; // Clear input
    document.getElementById("unit").value = ""; // Clear input
    document.getElementById("tag-name").value = ""; // Clear input
}


// Update the inventory list display
function updateInventoryList(list = inventoryList) {
    const tbody = inventoryListTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear previous items
    list.forEach((item, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const amtCell = document.createElement("td");
        amtCell.textContent = item.amt;

        const unitCell = document.createElement("td");
        unitCell.textContent = item.unit;

        const buttonCell = document.createElement("td");

        // Create the minus button
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("minus-button");
        minusButton.onclick = () => updateAmt(index, -1);
        buttonCell.appendChild(minusButton);

        // Create the plus button
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("plus-button");
        plusButton.onclick = () => updateAmt(index, 1);
        buttonCell.appendChild(plusButton);

        // Create the addToShopping button
        const addToShoppingButton = document.createElement("button");
        addToShoppingButton.textContent = "Add to Shopping";
        addToShoppingButton.classList.add("addToShopping-button");
        addToShoppingButton.onclick = () => addToShopping();
        buttonCell.appendChild(addToShoppingButton);

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => removeItem(index);
        buttonCell.appendChild(deleteButton);

        row.append(nameCell, amtCell, unitCell, buttonCell);

        tbody.appendChild(row);
    });
}

// Update the amt of an item in the inventory list
function updateAmt(index, change) {
    const item = inventoryList[index];
    item.amt += change;

    // Remove the item if amt falls below 1
    if (item.amt <= 0) {
        inventoryList.splice(index, 1);
    }
    saveInventoryListToLocalStorage();
    updateInventoryList();
    itemCountSpan.textContent = `(${inventoryList.length})`;
}

// Remove an item from the inventory list
function removeItem(index) {
    inventoryList.splice(index, 1);
    saveInventoryListToLocalStorage();
    updateInventoryList();
    itemCountSpan.textContent = `(${inventoryList.length})`;
}

function addToShopping() {

}

function saveInventoryListToLocalStorage() {
    localStorage.setItem("inventoryList", JSON.stringify(inventoryList));
}

function loadInventoryListFromLocalStorage() {
    const savedList = localStorage.getItem("inventoryList");
    return savedList ? JSON.parse(savedList) : [];
}

// Run initialization functions
document.addEventListener("DOMContentLoaded", () => {
    updateInventoryList();
});