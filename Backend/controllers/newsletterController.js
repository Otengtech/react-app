import nodemailer from 'nodemailer';

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

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
      subject: 'New Newsletter Subscriber',
      text: `A new user has subscribed: ${email}`
    });

    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('Subscription Error:', err);
    res.status(500).json({ message: 'Subscription failed' });
  }
};
