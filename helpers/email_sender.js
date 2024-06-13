
import nodemailer from "nodemailer";

export const sendMail = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'onlyaddy68@gmail.com',
                pass: 'swjqeaqnpmglpcml'
            }
        });

        const mailOptions = {
            from: 'onlyaddy68@gmail.com',
            to: email,
            subject: subject,
            text: body,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return 'Email sent successfully!';
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error('Failed to send email');
    }
};