// nodes modules
const express = require("express");
// External dependancy
// Domain related modules
const UserRouter = require("./routes/users-router");
const SecurityRouter = require("./routes/security-router");

const app = express();
app.use(express.json());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("hello world");
});

app.use("/api/v1", UserRouter);
app.use("/api/v1", SecurityRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
