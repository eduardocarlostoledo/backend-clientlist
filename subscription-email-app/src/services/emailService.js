import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
    // Esto asegura que la conexión no falle por certificados autofirmados
    rejectUnauthorized: true // Dejar en true para producción, o probar con false en local si hay problemas.
  }
});

const readTemplate = (templatePath) => new Promise((resolve, reject) => {
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
    });
});

const sendOfferEmail = async (email) => {
    try {
        const templatePath = path.join(__dirname, '../templates/emailTemplate.html');
        const html = await readTemplate(templatePath);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Exclusive Offer Just for You!',
            html: html
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                else resolve(info);
            });
        });
    } catch (error) {
        console.error('Error sending offer email:', error);
        throw error;
    }
};

const sendConfirmationEmail = async (email) => {
    try {
        const templatePath = path.join(__dirname, '../templates/emailTemplate.html');
        const html = await readTemplate(templatePath);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome! Subscription Confirmed',
            html: html
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                else resolve(info);
            });
        });
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};

export { sendOfferEmail, sendConfirmationEmail };