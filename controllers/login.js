import bcrypt from "bcrypt";
import db from "../config/db.js";

const loginpage = async(req, res) => {
    const alertMessage = req.query.alert;
    res.render("login.ejs", { alertMessage });
};

const authenticateUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user is an admin
        if (password === process.env.ADMIN_PASS && email === process.env.ADMIN_EMAIL) {
            res.redirect(`/admin?alert=Welcome ADMIN`);
            return;
        }

        let user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rowCount === 0) {
            res.redirect(`/?alert=Invalid user, register yourself first`);
        } else if (bcrypt.compareSync(password, user.rows[0].password)) {
            const userId = user.rows[0].user_id;

            // Check if there's already an entry for today
            const existingTiming = await db.query(
                "SELECT * FROM timing WHERE user_id = $1 AND date = CURRENT_DATE", 
                [userId]
            );

            if (existingTiming.rows.length === 0) {
                // No timing entry for today, create one
                await db.query(
                    "INSERT INTO timing (user_id, currenttime, breaktime, date) VALUES ($1, $2, $3, CURRENT_DATE)",
                    [userId, '00:00:00', '00:00:00']
                );
            }

            res.redirect(`/timing?userid=${userId}`);
        } else {
            res.redirect(`/?alert=Wrong password`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export { loginpage, authenticateUser };
