// More information about the code - https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?pivots=programming-language-javascript

const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString =
  process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];

async function main() {
  try {
    var client = new EmailClient(connectionString);
    //send mail
    const emailMessage = {
      sender: "DoNotReply@358f57db-19be-4c16-880a-7234358fd5c2.azurecomm.net",
      content: {
        subject: "Welcome to Azure Communication Service Email.",
        plainText:
          "You are receiving this email, because Damyan is testing the new email service and the code implementation. \n<This email message is sent from Azure Communication Service Email using JS SDK.>",
      },
      recipients: {
        to: [
          {
            email: "d.dimitrov.1988@abv.bg",
          },
          {
            email: "deathineyes@gmail.com",
          },
          {
            email: "Tihomirtx88@gmail.com"
          },
        ],
      },
    };
    var response = await client.send(emailMessage);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  main,
};
