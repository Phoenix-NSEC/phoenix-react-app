// import SibApiV3Sdk from "sib-api-v3-typescript";
// import defaultClient from "../sendinblue-config";

// export const createContact = (email, name, whatsapp_number, contact_number) => {
//   let createContact = new SibApiV3Sdk.CreateContact();

//   createContact.email = email;
//   createContact.attributes = {
//     NAME: name,
//     WHATSAPP: whatsapp_number,
//     CONTACT_NO: contact_number,
//   };
//   defaultClient.createContact(createContact).then(
//     function (data) {
//       console.log(
//         "API called successfully. Returned data: " + JSON.stringify(data)
//       );
//     },
//     function (error) {
//       console.error(error);
//     }
//   );
// };
