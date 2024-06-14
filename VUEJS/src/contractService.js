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

  const formData = new FormData();
  formData.append('contract', JSON.stringify(contract));
  formData.append('recipients', JSON.stringify(recipients));

  if (Array.isArray(pdfParts)) {
    for (const file of pdfParts) {
      formData.append('pdfparts', file);
    }
  } else {
    formData.append('pdfparts', pdfParts);
  }

  if (Array.isArray(appendixParts)) {
    for (const file of appendixParts) {
      formData.append('appendixparts', file);
    }
  } else {
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
    console.log(response.data);
    contractState.responseData = response.data;
    
    const contract_id = response.data.contract.contract_id;
    const status = response.data.contract.status;
    
    console.log('Contract ID:', contract_id);
    console.log('status:', status);
    
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
      console.error('Error setting up the request:', error.message);
    }
    throw new Error('Error creating contract');
  }
};

export const getContractId = () => {
  return contractState.contractId;
};

export const getStatus = () => {
  return contractState.status;
};

export const getRecipients = () => {
  return contractState.recipients;
};

export const getContractResponse = () => {
  return contractState.responseData;
};
