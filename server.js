// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = 4000;

// // Serve static files
// app.use(express.static(path.join(__dirname, "public")));

// // Serve HTML
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
// });


const express = require("express");
const path = require("path");

const app = express();
const PORT = 4300;

// ✅ Serve static files correctly
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});
