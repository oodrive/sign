// contractService.js

import axios from 'axios';

const apiUrl = '/api';  // Use the proxy path

export const createContract = async (token, cdi, contractor_id, actor_id, files) => {
  console.log('Received FormData:', files);

  const contract = {
    name: "contrat test VUE JS.pdf",
    message_title: "Votre contrat Test signature",
    message_body: "Vous êtes signataire du contrat Z ci-joint pour la companyName. Merci de bien vouloir le signer électroniquement en cliquant sur le lien ci-dessous.<br>Cordialement",
    keep_on_move: false,
    auto_close: 1
  };

  const recipients = {
    data: [
      {
        civility: "MONSIEUR",
        firstname: "Hamza",
        lastname: "Ayari",
        address_1: "rue Bombée",
        cell_phone: "0757947761",
        email: "h.ayari+1@oodrive.com",
        signature_mode: 10
      },
      {
        civility: "MONSIEUR",
        firstname: "John",
        lastname: "Doe",
        address_1: "rue plate",
        cell_phone: "0757947761",
        email: "oodrivesign@gmail.com",
        signature_mode: 10
      }
    ]
  };

  const formData = new FormData();
  formData.append('contract', JSON.stringify(contract));
  formData.append('recipients', JSON.stringify(recipients));

  // Ensure that files is an array before attempting to iterate
  if (Array.isArray(files)) {
    // Append each file to the FormData
    for (const file of files) {
      formData.append('pdfparts', file);
    }
  } else {
    // If it's not an array, treat it as a single file
    formData.append('pdfparts', files);
  }

  try {
    const response = await axios.post(apiUrl + "/contracts/allinone?start=true", formData, {
      headers: {
        'Accept': 'application/json',
        'j_token': token
      },
      responseType: 'json',
    });

    console.log('Response:', response.data);
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
    throw new Error('Error creating contract');
  }
};
