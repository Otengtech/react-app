import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'otengebenezer326@gmail.com',
      subject: `Message from ${name}`,
      text: `Email: ${email}\n\n${message}`
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
