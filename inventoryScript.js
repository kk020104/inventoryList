let inventoryLists = {
    fridge: [],
    freezer: [],
    pantry: [],
    counter: []
};
let currentLocation = "fridge";
const inventoryListTable = document.getElementById("inventory-list");
const itemCountSpan = document.getElementById("item-count");
const popup = document.getElementById("popup");
const popup2 = document.getElementById("addToShoppingPopup");
const locationsMenu = document.getElementById("locations");

let shoppingList = [];

// Show popup to add an item
function showAddItemPopup() {
    popup.classList.remove("hidden");
}

// Close the add item popup
function closePopup() {
    document.getElementById("item-name").value = ""; // Clear input
    document.getElementById("amt").value = ""; // Clear input
    document.getElementById("unit").value = ""; // Clear input
    document.getElementById("tag-name").value = ""; // Clear input
    popup.classList.add("hidden");
}

function setCurrentLocation() {
    currentLocation = locationsMenu.value.toLowerCase();
    localStorage.setItem("currentLocation", currentLocation)
    document.getElementById("locationTitle").innerHTML = `${currentLocation} list`;
    updateInventoryList();
}

function go() {
    document.getElementById("filter").value = ""; // Clear input
    setCurrentLocation();
}

function sort() {
    let currentFilter = document.getElementById("filter").value;
    let sortedList = [...inventoryLists[currentLocation]];
    if (currentFilter === "full list") {
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
        sortedList = sortedList.filter(item => item.tagName === currentFilter);
        sortedList.sort((a,b) => a.name.localeCompare(b.name));
        saveInventoryListToLocalStorage();
        updateInventoryList(sortedList);
    } else {
        alert("invalid filter entry");
        return;
    }
}

// Add an item to the inventory list from the popup input fields
function addInventoryItem() {
    const itemName = document.getElementById("item-name").value;
    const amt = parseInt(document.getElementById("amt").value, 10);
    const unit = document.getElementById("unit").value;
    const tagName = document.getElementById("tag-name").value;

    if (itemName && amt > 0) {
        const inventoryList = inventoryLists[currentLocation];
        const existingItem = inventoryList.find(item => item.name.toLowerCase() === itemName.toLowerCase());
        
        if (existingItem) {
            existingItem.amt += amt;
        } else {
            inventoryList.push({ name: itemName, amt, unit, tagName});
        }
        saveInventoryListToLocalStorage();
        updateInventoryList();
    }
    
    closePopup();

    document.getElementById("item-name").value = ""; // Clear input
    document.getElementById("amt").value = ""; // Clear input
    document.getElementById("unit").value = ""; // Clear input
    document.getElementById("tag-name").value = ""; // Clear input
}


// Update the inventory list display
function updateInventoryList(list = inventoryLists[currentLocation]) {
    const tbody = inventoryListTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear previous items

    itemCountSpan.textContent = `(${inventoryLists[currentLocation].length})`;

    list.forEach((item, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const amtCell = document.createElement("td");
        amtCell.textContent = `${item.amt} ${item.unit}`;

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
        addToShoppingButton.onclick = () => addToShopping(item.name, item.amt);
        buttonCell.appendChild(addToShoppingButton);

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => removeItem(index);
        buttonCell.appendChild(deleteButton);

        row.append(nameCell, amtCell, buttonCell);

        tbody.appendChild(row);
    });
}

// Update the amt of an item in the inventory list
function updateAmt(index, change) {
    const inventoryList = inventoryLists[currentLocation];
    const item = inventoryList[index];
    item.amt += change;

    // Remove the item if amt falls below 1
    if (item.amt <= 0) {
        inventoryList.splice(index, 1);
    }
    saveInventoryListToLocalStorage();
    updateInventoryList();
}

// Remove an item from the inventory list
function removeItem(index) {
    const inventoryList = inventoryLists[currentLocation];
    inventoryList.splice(index, 1);
    saveInventoryListToLocalStorage();
    updateInventoryList();
}

//IN PROGRESS
function addToShopping(name, amt) {
    const savedList = localStorage.getItem("shoppingList");
    let shoppingList;

    if (savedList) {
        shoppingList = JSON.parse(savedList);
    } else {
        shoppingList = [];
    }

    const existingItem = shoppingList.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
        existingItem.quantity += amt;
    } else {
        shoppingList.push({ name: name, quantity: amt });
    }
    
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    updateShoppingList();
    
}

function saveInventoryListToLocalStorage() {
    localStorage.setItem("inventoryLists", JSON.stringify(inventoryLists));
}

function loadInventoryListFromLocalStorage() {
    const savedList = localStorage.getItem("inventoryLists");
    if (savedList) {
        inventoryLists = JSON.parse(savedList);
    }

    const savedLocation = localStorage.getItem("currentLocation");
    if (savedLocation && inventoryLists.hasOwnProperty(savedLocation)) {
        currentLocation = savedLocation;
        locationsMenu.value = currentLocation;
        document.getElementById("locationTitle").innerHTML = `${currentLocation} list`;
    } else {
        currentLocation = "fridge";
        locationsMenu.value = currentLocation;
        document.getElementById("locationTitle").innerHTML = `${currentLocation} list`;
    }
}

// Run initialization functions
document.addEventListener("DOMContentLoaded", () => {
    loadInventoryListFromLocalStorage();
    updateInventoryList();
});