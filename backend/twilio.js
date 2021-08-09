const twilio = require("twilio");

class Twilio {
  phoneNumber =  process.env.phoneNumber;
  phoneNumberSid = process.env.phoneNumberSid;
  tokenSid = process.env.tokenSid;
  tokenSecret = process.env.tokenSecret;
  accountSid = process.env.accountSid;
  authToken = process.env.authToken;
  client;
  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }

  async sendVerify(to, channel) {
    const data = await this.client.verify
      .services(this.authToken)
      .verifications.create({ to, channel });
    return data;
  }

  async verifyCode(to, code) {
    const data = await this.client.verify
      .services(this.authToken)
      .verificationChecks.create({ to, code });
    return data;
  }
}

const instance = new Twilio();
Object.freeze(instance);

module.exports = instance;
