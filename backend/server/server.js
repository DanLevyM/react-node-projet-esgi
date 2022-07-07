/* eslint-disable no-undef */
const express = require("express");
const morgan = require("morgan");

const errorHandler = require("./middlewares/error");
const UserRouter = require("./routes/users-router");
const SecurityRouter = require("./routes/security-router");
const AdminRouter = require("./routes/admin-router");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auth", SecurityRouter);
app.use("/api/v1/admin", AdminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
