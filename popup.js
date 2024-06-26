chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.badgeText) {
    // Update badge text using Chrome Extension API
    chrome.browserAction.setBadgeText({ text: message.badgeText });
  }
});


// Load the extension data and update the popup content
chrome.storage.local.get(["popupContent", "classes"], function (data) {
  const { day, time, currentClass, nextClass } = data.popupContent;
  const classes = data.classes;

  let scheduleInfo = "<p>Today is " + day + " and the current time is " + time + ".</p>";

  if (currentClass) {
    scheduleInfo += "<p>You are currently in " + currentClass.class + " class. It ends at " + currentClass.end + ".</p>";
  } else {
    scheduleInfo += "<p>You don't have any class right now.</p>";
  }

  if (nextClass) {
    scheduleInfo += "<p>Your next class is " + nextClass.class + ". It starts at " + nextClass.start + ".</p>";
  } else {
    scheduleInfo += "<p>You don't have any more classes today.</p>";
  }

  document.getElementById("schedule-info").innerHTML = scheduleInfo;
});


