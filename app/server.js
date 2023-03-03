const { PORT } = require("./config");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});
