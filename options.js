// options.js

// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Find the save button element
    const saveButton = document.getElementById('save');

    // Check if the save button element exists
    if (saveButton) {
        // Add a click event listener to the save button
        saveButton.addEventListener('click', saveOptions);
    } else {
        console.error('Save button not found!');
    }
});

// Function to save options
function saveOptions() {
    // Find the input element by its ID
    const inputElement = document.getElementById('input-id');

    // Check if the input element exists and has a value
    if (inputElement && inputElement.value) {
        // Save the input value to Chrome storage or do other operations
        chrome.storage.local.set({ key: inputElement.value }, function () {
            console.log('Value is set to ' + inputElement.value);
        });
    } else {
        console.error('Input element not found or has no value!');
    }
}
