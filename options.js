// Function to save options
function saveOptions() {
  // Define an array to store user classes
  const userClasses = [];

  // Loop through each class input field
  for (let i = 1; i <= 7; i++) { // Assuming there are 7 classes
    const classInput = document.getElementById("Class" + i);
    if (classInput && classInput.value.trim() !== "") {
      userClasses.push({
        class: classInput.value.trim(),
        // You can also include other properties like start and end times if needed
      });
    }
  }

  // Save userClasses array to Chrome storage
  chrome.storage.local.set({ userSchedule: userClasses }, function() {
    console.log('User class schedule saved successfully.');
  });
}

// Add event listener to the save button
document.getElementById("saveButton").addEventListener("click", saveOptions);
