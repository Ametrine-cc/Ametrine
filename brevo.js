// Example using JavaScript
const addContact = async (email, name) => {
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key":
        "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",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      attributes: {
        FIRSTNAME: name,
      },
      listIds: [2], // Your list ID
    }),
  });
  return response.json();
};
