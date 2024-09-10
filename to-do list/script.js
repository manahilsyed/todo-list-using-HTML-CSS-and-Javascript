var todoList = document.getElementById('todoList');
var input = document.getElementById('userInput');
var clearAllButton = document.getElementById('clearAll'); 

// Listen for Enter key press
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
        addItem(input.value);  // Add input value to the list
        input.value = "";  // Clear input field
    }
});


// Clear All button event listener
clearAllButton.addEventListener('click', function() {
    todoList.innerHTML = ""; // This removes all list items from the to-do list
});


function addItem(itemText) {
    var li = document.createElement('li');  // Create new list item (li)
    li.classList.add("myList");  // Assign class for styling

    // Create text node for the list item and append it
    var liText = document.createElement('span');  // Use span to allow text updates
    liText.textContent = itemText;
    li.appendChild(liText);

    // Create the trash icon and append it
    var trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash');
    trashIcon.addEventListener('click', function() {
        li.remove();  // Remove the item when trash icon is clicked
    });

    // Create the pencil icon and append it
    var pencilIcon = document.createElement('i');
    pencilIcon.classList.add('fa-solid', 'fa-pencil');
    pencilIcon.addEventListener('click', function() {
        editItem(li, liText);  // Call function to edit the item
    });

    // Append the icons to the list item
    li.appendChild(pencilIcon);
    li.appendChild(trashIcon);

    // Append the complete list item to the ul (todoList)
    todoList.appendChild(li);
}

// Function to edit the to-do item
function editItem(li, liText) {
    var inputField = document.createElement('input');  // Create an input field to edit
    inputField.type = 'text';
    inputField.value = liText.textContent;  // Set the current to-do text as input value
    li.replaceChild(inputField, liText);  // Replace the text with the input field

    // Save changes on "Enter" or when input loses focus
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && inputField.value.trim() !== "") {
            liText.textContent = inputField.value;  // Update the span with new text
            li.replaceChild(liText, inputField);  // Replace input field with updated text
        }
    });

    inputField.addEventListener('blur', function() {  // On blur, save the changes
        if (inputField.value.trim() !== "") {
            liText.textContent = inputField.value;  // Update the span with new text
            li.replaceChild(liText, inputField);  // Replace input field with updated text
        }
    });

    inputField.focus();  // Focus the input field for editing
}
