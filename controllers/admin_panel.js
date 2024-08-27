import bcrypt from "bcrypt";
import db from "../config/db.js";

const adminlogin = async(req, res) => {
    const alertMessage = req.query.alert;
    let user = await db.query("SELECT * FROM users");
    res.render("admin_panel.ejs", { usersData : user.rows});
};

export { adminlogin };