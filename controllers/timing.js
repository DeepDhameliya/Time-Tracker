import db from "../config/db.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const timingget = async (req, res) => {
    try {
        const userId = req.query.userid;

        // Fetch the most recent timing entry for the user
        const result = await db.query(
            "SELECT currenttime, breaktime FROM timing WHERE user_id = $1 ORDER BY date DESC LIMIT 1",
            [userId]
        );

        let currentTime = "00:00:00";
        let breakTime = "00:00:00";

        if (result.rows.length > 0) {
            currentTime = result.rows[0].currenttime;
            breakTime = result.rows[0].breaktime;
        }

        // Render the timing.ejs page with the stored time
        res.render("timing.ejs", { userid: userId, currentTime, breakTime });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const timingpost = async (req, res) => {
    try {
        const currentDate = req.body.currentDate;
        const userId = req.body.userid;
        const currentTime = req.body.currentTime;
        const breakTime = req.body.breakTime;

        // Check if there's an existing record for today (12 AM - 12 AM)
        const existingEntry = await db.query(
            "SELECT * FROM timing WHERE user_id = $1 AND date = $2",
            [userId, currentDate]
        );

        if (existingEntry.rows.length > 0) {
            // Update the existing record to reflect the new timing
            await db.query(
                "UPDATE timing SET currenttime = $1, breaktime = $2 WHERE user_id = $3 AND date = $4",
                [currentTime, breakTime, userId, currentDate]
            );
        } else {
            // Insert a new record for the current day if none exists
            await db.query(
                "INSERT INTO timing (user_id, currenttime, breaktime, date) VALUES ($1, $2, $3, $4)",
                [userId, currentTime, breakTime, currentDate]
            );
        }

        // Send an email confirmation if necessary
        const emailQuery = `SELECT email FROM users WHERE user_id = $1`;
        const emailResult = await db.query(emailQuery, [userId]);

        const userEmail = emailResult.rows[0]?.email;
        if (userEmail) {
            const mailOptions = {
                from: process.env.ADMIN_EMAIL,
                to: userEmail,
                subject: 'Your timing',
                text: `Just a quick note to say thanks for your hard work. Your dedication during work hours ${currentTime} and break hours ${breakTime} on Date:${currentDate}.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Timing email sent:', info.response);
                }
            });
        }

        res.redirect("/?alert=Your time has been stored");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export { timingget, timingpost };
