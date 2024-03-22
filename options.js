document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions);
});

function saveOptions() {
  const classes = [];
  for (let i = 1; i <= 7; i++) {
    const className = document.getElementById('class' + i).value;
    if (className.trim() !== '') {
      classes.push(className);
    }
  }
  chrome.storage.local.set({classes: classes}, function() {
    alert('Classes saved!');
  });
}
