import { EMAIL_PASS, EMAIL_USER } from "../configs/constants.js";
import { HandlerCustom } from "../configs/custom.js";
import nodemailer from 'nodemailer';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export enum EmailTemplate {
    SEND_OTP = "../templates/sendOTP.html",
    WELCOME = "../templates/welcome.html",
    RESET_PASSWORD = "../templates/resetPassword.html",
    CONTACT_CONFIRMATION = "../templates/contactConfirmation.html",
    SEND_PASSWORD = "../templates/sendPassword.html",
}

type TemplateDataValue = string | number | boolean | null;
type TemplateDataTuple = [string, TemplateDataValue];
type TemplateData = {
    [key: string]: TemplateDataValue;
} | TemplateDataTuple[];

export const sendMail = HandlerCustom(async (
    to: string,
    subject: string,
    template: EmailTemplate,
    templateData: TemplateData = {}
) => {
    // Get the directory path in ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    let html = fs.readFileSync(path.join(__dirname, template), "utf-8");

    // Replace all placeholders with their values
    if (Array.isArray(templateData)) {
        templateData.forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, String(value));
        });
    } else {
        // Nếu templateData là object
        Object.entries(templateData).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, String(value));
        });
    }

    // Simple conditional logic replacement for {{#if value}}content{{/if}}
    const conditionalRegex = /{{#if\s+([^}]+)}}([\s\S]*?){{\/if}}/g;
    html = html.replace(conditionalRegex, (match, condition, content) => {
        let value;
        if (Array.isArray(templateData)) {
            // Tìm giá trị trong mảng tuple
            const tupleItem = templateData.find(([k]) => k === condition);
            value = tupleItem ? tupleItem[1] : null;
        } else {
            // Lấy giá trị từ object
            value = templateData[condition];
        }
        return value ? content : '';
    });

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "VietAu Academy <VietAuAcademy@gmail.com>",
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);

    return {
        success: true,
        status: 200,
        message: "Email sent successfully"
    };
});