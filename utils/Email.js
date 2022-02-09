const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const pug = require("pug");
class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.name = user.name),
      (this.url = url),
      (this.from = `Segsalerty Admin <SegsAlerty@gmail.com>`);
  }
  createNewTransport() {
    if (process.env.NODE_ENv === "production") {
      //Setup the OAuth2 Client
      const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );
      //Set the refresh token
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });
      //Get the access token
      const accessToken = oauth2Client.getAccessToken((err, token) => {
        if (err) return err;
        return token;
      });
      //Describe how to send the mail
      return nodemailer.createTransport({
        service: "Gmail",
        auth: {
          type: OAuth2,
          user: process.env.GOOGLE_EMAI,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.SENDMAIL_HOST,
      port: process.env.SENDMAIL_PORT,
      auth: {
        user: process.env.SENDMAIL_USER,
        pass: process.env.SENDMAIL_PASSWORD,
      },
    });
  }
  //Send the actual mail
  async send(template, subject, options) {
    //Render html based on a pug template
    const html = pug.renderFile(`__dirname/../views/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject,
      options,
    });
    //define the mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };
    //Create a tranporter and send email
    await this.createNewTransport().sendMail(mailOptions);
  }
  async sendWelcome(password) {
    await this.send("welcome", "Someone made you an admin.", password);
  }
}

module.exports = Email;
