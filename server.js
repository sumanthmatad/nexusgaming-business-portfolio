console.log("Correct File Running");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// 🔐 Admin credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "nexus123";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

/* ================= HOME ROUTE ================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ================= CONTACT FORM ================= */

app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const data = `
Date: ${date}
Time: ${time}
Name: ${name}
Email: ${email}
Message: ${message}
----------------------------
`;

  fs.appendFile("messages.txt", data, () => {
    res.redirect("contact-success.html");
  });
});

/* ================= ADMIN LOGIN ================= */

app.post("/admin/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // ❌ Wrong credentials → styled error page
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Access Denied | Nexus Gaming</title>
  <style>
    body {
      background:#000;
      color:#ff4d4d;
      font-family:monospace;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
    }
    .box {
      border:2px solid #ff4d4d;
      padding:30px;
      box-shadow:0 0 20px #ff4d4d;
    }
    a {
      display:inline-block;
      margin-top:20px;
      color:#0ff;
      text-decoration:none;
      font-size:18px;
    }
  </style>
</head>
<body>
  <div class="box">
    <h2>❌ ACCESS DENIED</h2>
    <p>Invalid Admin Credentials</p>
    <a href="/admin.html">← Back to Admin Login</a>
  </div>
</body>
</html>
    `);
  }

  // ✅ Correct credentials → admin dashboard
  fs.readFile("messages.txt", "utf8", (err, data) => {
    if (err) data = "No messages found.";

    const count = (data.match(/----------------------------/g) || []).length;

    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Nexus Admin | Messages</title>
  <style>
    body {
      background:#000;
      color:#0f0;
      font-family:monospace;
      padding:30px;
    }
    h2 {
      text-align:center;
      color:#0ff;
      text-shadow:0 0 15px #0ff;
    }
    .count {
      text-align:center;
      margin-bottom:20px;
      color:#fff;
      font-size:18px;
    }
    pre {
      background:#111;
      padding:20px;
      border-radius:10px;
      white-space:pre-wrap;
      box-shadow:0 0 15px #0f0;
    }
    a {
      display:block;
      text-align:center;
      margin-top:20px;
      color:#0ff;
      text-decoration:none;
    }
  </style>
</head>
<body>

  <h2>🎮 Incoming Player Messages:</h2>
  <div class="count">Total Messages: ${count}</div>

  <pre>${data}</pre>

  <a href="/admin.html">← Logout</a>

</body>
</html>
    `);
  });
});

/* ================= START SERVER ================= */

app.listen(PORT, () => {
  console.log(`On 
    http://localhost:${PORT}`);
});






