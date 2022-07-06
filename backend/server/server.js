const express = require("express");
const UserRouter = require("./routes/users-router");
const SecurityRouter = require("./routes/security-router");
const AdminRouter = require("./routes/admin-router");

const app = express();
app.use(express.json());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("hello world");
});

app.use("/api/v1", UserRouter);
app.use("/api/v1", SecurityRouter);
app.use("/api/v1", AdminRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
