import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    // 🚨 REMOVED: service: 'gmail' (This was forcing it to Google)
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // Prevents cPanel from blocking the email due to self-signed certificates
      rejectUnauthorized: false 
    }
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Pradhan Services <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html 
  };

  // 3. Actually send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent successfully! Response:", info.response);
  } catch (error) {
    console.error("❌ NODEMAILER ERROR:", error);
    throw error;
  }
};

export default sendEmail;