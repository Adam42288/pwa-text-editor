const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static("../client/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/htmlRoutes")(app);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Now listening on port: ${PORT}`)
);
