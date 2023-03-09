import axios from "axios";

export const createContact = async (
  email,
  name,
  whatsapp_number,
  contact_number
) => {
  const contactValue = {
    email: email,
    attributes: {
      NAME: name,
      WHATSAPP: whatsapp_number,
      CONTACT_NO: contact_number,
    },
    updateEnabled: false,
  };
  return await callSendinBlue("contacts", contactValue);
};

const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": "fd",
  },
  body: JSON.stringify({
    attributes: { ads: "New Value", "newKey-ads": "New Value" },
    updateEnabled: false,
    email: "dasads",
  }),
};

fetch("https://api.sendinblue.com/v3/contacts", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

const callSendinBlue = async (endpoint, data) => {
  return await axios({
    method: "POST",
    url: `https://api.sendinblue.com/v3/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key":
        "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",
    },
    data: data,
  });
};
