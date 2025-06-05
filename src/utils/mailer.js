const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendEmail(to, orderId) {
  const siteUrl = process.env.FRONT_URL; 
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: "【ご注文確認】注文を承りました",
    html: `
      <p>このたびは<strong>yuu-furniture</strong>の商品をご購入いただきありがとうございます。</p>
      <p>注文番号: <strong>${orderId}</strong></p>
      <p>ご注文履歴は以下のサイトにてご確認いただけます。</p>
      <a href="${siteUrl}">${siteUrl}</a>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;