const { app } = require("./server/routes/routes");

app.listen(8083, (req, res) => {
  console.log("The server is running on 8083");
});
