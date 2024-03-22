// Load the school schedule
const schoolSchedule = {
  "Monday": [
    { "start": "08:30", "end": "09:20", "class": "Physics-P" },
    { "start": "9:27", "end": "10:17", "class": "Pre-Calculus-HP" },
    { "start": "10:24", "end": "11:14", "class": "English III-P" },
    { "start": "11:21", "end": "12:14", "class": "Jazz Band II-P" },
    { "start": "12:14", "end": "12:56", "class": "Lunch" },
    { "start": "13:01", "end": "13:51", "class": "AP US History-HP" },
    { "start": "13:58", "end": "14:48", "class": "AP Computer Sci A: Java-HP" },
],
  "Tuesday": [
    { "start": "08:30", "end": "09:20", "class": "Physics-P" },
    { "start": "9:27", "end": "10:17", "class": "Pre-Calculus-HP" },
    { "start": "10:24", "end": "11:14", "class": "English III-P" },
    { "start": "11:21", "end": "12:14", "class": "Jazz Band II-P" },
    { "start": "12:14", "end": "12:56", "class": "Lunch" },
    { "start": "13:01", "end": "13:51", "class": "AP US History-HP" },
    { "start": "13:58", "end": "14:48", "class": "AP Computer Sci A: Java-HP" },
],
  "Wednesday": [
    { "start": "10:02", "end": "11:27", "class": "Pre-Calculus-HP" },
    { "start": "11:34", "end": "12:04", "class": "Flex" },
    { "start": "12:04", "end": "12:38", "class": "Lunch" },
    { "start": "12:48", "end": "14:13", "class": "Jazz Band II-P" },
    { "start": "14:20", "end": "15:45", "class": "AP Computer Sci A: Java-HP" },
],
  "Thursday": [
    { "start": "08:30", "end": "09:55", "class": "Physics-P" },
    { "start": "10:02", "end": "11:27", "class": "English III-P" },
    { "start": "11:34", "end": "12:04", "class": "Flex" },
    { "start": "12:04", "end": "12:38", "class": "Lunch" },
    { "start": "12:48", "end": "14:13", "class": "AP US History-HP" },
],
  "Friday": [
    { "start": "08:30", "end": "09:20", "class": "Physics-P" },
    { "start": "9:27", "end": "10:17", "class": "Pre-Calculus-HP" },
    { "start": "10:24", "end": "11:14", "class": "English III-P" },
    { "start": "11:21", "end": "12:14", "class": "Jazz Band II-P" },
    { "start": "12:14", "end": "12:56", "class": "Lunch" },
    { "start": "13:01", "end": "13:51", "class": "AP US History-HP" },
    { "start": "13:58", "end": "14:48", "class": "AP Computer Sci A: Java-HP" },
],
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