module.exports = {
  "custom-api": {
    enabled: false,
  },
  email: {
    config: {
      provider: "strapi-provider-email-brevo",
      providerOptions: {
        apiKey: process.env.BREVO_API_KEY,
      },
      settings: {
        defaultSenderEmail: "ravimehra9911@gmail.com",
        defaultSenderName: "ABA",
        defaultReplyTo: "ravimehra@gmail.com",
      },
    },
  },
};
