<<<<<<< HEAD
// contractService.js path : c:/Users/h.ayari/Desktop/vueJS integration/sign/VUEJS/src/contractService.js

import axios from 'axios';
import { filteredContract, filteredRecipients  } from './components/Allinone.vue';

console.log('contarct:', filteredContract);;
console.log('recipients:', filteredRecipients);
const apiUrl = '/api';  // Use the proxy path

const contractState = {
  contractId: null,
  status: null,
  responseData: null,
  recipients: [], // Changed variable name for clarity
};

export const createContract = async (token, cdi, contractor_id, actor_id, pdfParts, appendixParts) => {
  console.log('Received FormData (pdfParts):', pdfParts);
  console.log('Received FormData (appendixParts):', appendixParts);
  console.log('Filtered Contract in createContract:', filteredContract);
  console.log('Filtered Recipients in createContract:', filteredRecipients);
  const contract = filteredContract ;

  const recipients = {
    data: 
      filteredRecipients
    
  };  
=======

//contractService.js
import axios from 'axios';

const apiUrl = '/api';  // Use the proxy path
// Shared state object to store contract ID and status
const contractState = {
  contractId: null,
  status: null,
};
export const createContract = async (token, cdi, contractor_id, actor_id, pdfParts, appendixParts) => {
  console.log('Received FormData (pdfParts):', pdfParts);
  console.log('Received FormData (appendixParts):', appendixParts);

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
>>>>>>> Newway

  const formData = new FormData();
  formData.append('contract', JSON.stringify(contract));
  formData.append('recipients', JSON.stringify(recipients));

<<<<<<< HEAD
  if (Array.isArray(pdfParts)) {
=======
  // Ensure that pdfParts is an array before attempting to iterate
  if (Array.isArray(pdfParts)) {
    // Append each pdfPart to the FormData
>>>>>>> Newway
    for (const file of pdfParts) {
      formData.append('pdfparts', file);
    }
  } else {
<<<<<<< HEAD
    formData.append('pdfparts', pdfParts);
  }

  if (Array.isArray(appendixParts)) {
=======
    // If it's not an array, treat it as a single pdfPart
    formData.append('pdfparts', pdfParts);
  }

  // Ensure that appendixParts is an array before attempting to iterate
  if (Array.isArray(appendixParts)) {
    // Append each appendixPart to the FormData
>>>>>>> Newway
    for (const file of appendixParts) {
      formData.append('appendixparts', file);
    }
  } else {
<<<<<<< HEAD
=======
    // If it's not an array, treat it as a single appendixPart
>>>>>>> Newway
    formData.append('appendixparts', appendixParts);
  }

  try {
    const response = await axios.post(apiUrl + "/contracts/allinone?start=true", formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'j_token': token
      },
      responseType: 'json',
    });

    console.log('Contract created: ============222===========');
<<<<<<< HEAD
    console.log(response.data);
    contractState.responseData = response.data;
    
    const contract_id = response.data.contract.contract_id;
=======
    console.log(response.data); // Log the entire response to inspect its structure
    
    const contract_id = response.data.contract.contract_id; // Access the contract_id property correctly
    
>>>>>>> Newway
    const status = response.data.contract.status;
    
    console.log('Contract ID:', contract_id);
    console.log('status:', status);
<<<<<<< HEAD
    
    contractState.contractId = contract_id;
    contractState.status = status;
   
    if (response.data.recipients && Array.isArray(response.data.recipients)) {
      const recipients = response.data.recipients;
      recipients.forEach((recipient, index) => {
        const recipient_id = recipient.id;
        const recipient_firstname = recipient.firstname;
        console.log(`Recipient ${index + 1} ID:`, recipient_id);
        console.log(`Recipient ${index + 1} firstname:`, recipient_firstname);
      });
      contractState.recipients = recipients;
    } else {
      console.log('Invalid recipients data in the response');
    }
  } catch (error) {
    if (error.response) {
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
=======
    // Store the contract ID and status in the shared state object
    contractState.contractId = contract_id;
    contractState.status = status;
   
  if (response.data.recipients && Array.isArray(response.data.recipients)) {
    const recipients = response.data.recipients;
    recipients.forEach((recipient, index) => {
      const recipient_id = recipient.id;
      console.log(`Recipient ${index + 1} ID:`, recipient_id);
    });
    contractState.recipient_id = recipients;
  } else {
    console.log('Invalid recipients data in the response');
  }
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
>>>>>>> Newway
      console.error('Error setting up the request:', error.message);
    }
    throw new Error('Error creating contract');
  }
};
<<<<<<< HEAD

=======
// Function to retrieve the contract ID from the shared state object
>>>>>>> Newway
export const getContractId = () => {
  return contractState.contractId;
};

<<<<<<< HEAD
export const getStatus = () => {
  return contractState.status;
};

export const getRecipients = () => {
  return contractState.recipients;
};

export const getContractResponse = () => {
  return contractState.responseData;
};
=======
// Function to retrieve the status from the shared state object
export const getStatus = () => {
  return contractState.status;
};
>>>>>>> Newway
