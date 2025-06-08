# 📦 Setup Instructions

## Clone the Repository

```bash
git clone https://github.com/your-username/inquiry-backend.git
cd inquiry-backend
```

## 🧠 Apps Script Overview

```bash
function onFormSubmit(e) {
  # Replace with your backend URL
  var url = "";

  # Extract form responses
  var responses = e.namedValues; // Gets a named key-value pair object
  var payload = {};

  # Convert form responses to a plain object
  for (var field in responses) {
    payload[field] = responses[field][0]; // Use first response for each field
  }

  # Setup POST request options
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true // Optional: logs error response if the request fails
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  } catch (error) {
    Logger.log("POST request failed: " + error);
  }
}
```

## 📁 Project Structure

```bash
project-root/
├── README.md                 # 🔗 Main readme (outer)
├── frontend/
│   └── README.md             # 📘 Frontend-specific readme
└── backend/
    └── README.md             # 📘 Backend-specific readme
```

## 📁 Project Docs

- 🔧 [Backend Documentation](./backend/README.md)
- 🎨 [Frontend Documentation](./frontend/README.md)
