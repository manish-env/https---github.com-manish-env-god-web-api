const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

class ContactController {
  // Send contact message - Public API for client landing page
  static async sendMessage(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { name, email, message, phone } = req.body;

      // Save message to database
      const contactMessage = await ContactMessage.create({
        name,
        email,
        message,
        phone,
        createdAt: new Date()
      });

      // Send email notification (optional)
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
          const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });

          const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || 'admin@genreofdesign.com',
            subject: `New Contact Message from ${name}`,
            html: `
              <h3>New Contact Message</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `
          };

          await transporter.sendMail(mailOptions);
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Don't fail the request if email fails
        }
      }

      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: contactMessage
      });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = ContactController;
