import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    auth: {
        user: "smtpmailtransporter@gmail.com",
        pass: "dwjv gdgj zqqn palc",
    },
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
});

export default transporter;