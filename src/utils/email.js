import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    // Configuración del servicio de correo electrónico
});

export const sendPasswordResetEmail = (email, resetToken) => {
    const mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: 'Reset Password',
        html: `<p>Click <a href="http://your_domain/reset-password/${resetToken}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};