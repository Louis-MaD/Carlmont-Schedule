// Function to get the current day and time
function getCurrentDayAndTime() {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return { day, time };
}

// Function to get the user-defined class schedule from Chrome storage
function getUserSchedule(callback) {
  chrome.storage.local.get("userSchedule", function(data) {
    const userSchedule = data.userSchedule || [];
    callback(userSchedule);
  });
}

// Function to find the current class based on the user-defined schedule
function getCurrentClass(userSchedule, day, time) {
  const classes = userSchedule[day];
  if (!classes) return null;

  for (const cls of classes) {
    if (time >= cls.start && time <= cls.end) {
      return cls;
    }
  }
  return null;
}

// Function to find the next class based on the user-defined schedule
function getNextClass(userSchedule, day, time) {
  const classes = userSchedule[day];
  if (!classes) return null;

  for (const cls of classes) {
    if (time < cls.start) {
      return cls;
    }
  }
  return null;
}

// Function to update the extension data
function updateExtensionData() {
  const { day, time } = getCurrentDayAndTime();

  // Retrieve user-defined schedule
  getUserSchedule(function(userSchedule) {
    const currentClass = getCurrentClass(userSchedule, day, time);
    const nextClass = getNextClass(userSchedule, day, time);

    const popupContent = {
      day,
      time,
      currentClass,
      nextClass
    };

    // Update popup content
    chrome.storage.local.set({ popupContent: popupContent });
    updateBadgeText(currentClass ? "In class" : "Not in class");
  });
}

// Update extension data every minute
setInterval(updateExtensionData, 60000);

// Initial update
updateExtensionData();
