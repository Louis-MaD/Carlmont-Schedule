// Load the school schedule
const schoolSchedule = {
  "Monday": [
    { "start": "08:00", "end": "09:30", "class": "Math" },
    { "start": "10:00", "end": "11:30", "class": "Science" },
    // Add more classes as needed
  ],
  // Add schedule for other days of the week
};

// Function to get the current day and time
function getCurrentDayAndTime() {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return { day, time };
}

// Function to find the current class
function getCurrentClass(schedule, day, time) {
  const classes = schedule[day];
  if (!classes) return null;

  for (const cls of classes) {
    if (time >= cls.start && time <= cls.end) {
      return cls;
    }
  }
  return null;
}

// Function to find the next class
function getNextClass(schedule, day, time) {
  const classes = schedule[day];
  if (!classes) return null;

  for (const cls of classes) {
    if (time < cls.start) {
      return cls;
    }
  }
  return null;
}

// Function to update the badge text
function updateBadgeText(text) {
  chrome.browserAction.setBadgeText({ text: text });
}

// Function to update the popup content
function updatePopupContent(content) {
  chrome.storage.local.set({ popupContent: content });
}

// Function to update the extension data
function updateExtensionData() {
  const { day, time } = getCurrentDayAndTime();
  const currentClass = getCurrentClass(schoolSchedule, day, time);
  const nextClass = getNextClass(schoolSchedule, day, time);

  const popupContent = {
    day,
    time,
    currentClass,
    nextClass
  };

  updatePopupContent(popupContent);
  updateBadgeText(currentClass ? "In class" : "Not in class");
}

// Update extension data every minute
setInterval(updateExtensionData, 60000);

// Initial update
updateExtensionData();