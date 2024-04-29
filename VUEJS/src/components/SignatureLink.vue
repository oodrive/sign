<template>
    <div>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <select v-model="selectedRecipientId" @change="generateSignatureLink"  @click="fetchContractInfo" class="select">
          <option value="" >Select Signatory</option>
          <option v-for="recipient in recipients" :key="recipient.id" :value="recipient.id">
            {{ recipient.firstname }}
          </option>
        </select>
        <div id="messagediv">
         <!-- <p v-if="signatureLink">Generated Signature Link:</p>
{{ signatureLink }} -->
          <button v-if="signatureLink" @click="SignContract('iframe')"  class="create-contract-btn">Signez votre contrat ici  </button>
          <button v-if="signatureLink" @click="SignContract('window')" class="create-contract-btn">Signez votre contrat dans une autre fenêtre </button>
        </div>
        <!--<div v-if="error" class="error-message">
        {{error }}
        </div>-->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import { getContractResponse, getRecipients } from '../contractService.js';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      contractId: null,
      recipients: [],
      selectedRecipientId: null,
      signatureLink: null
    };
  },
 // mounted() {
    //this.fetchContractInfo(); // Fetch contract info when the component is mounted
   // if (this.recipients.length === 1) {
     // this.generateSignatureLink(); // Call the method if there's only one recipient
    //}
  //},
  methods: {
    async fetchContractInfo() {
      this.isLoading = true;
      this.error = null;

      try {
        const contractResponse = getContractResponse();
        if (!contractResponse) {
          throw new Error('Contract response data not available');
        }

        this.contractId = contractResponse.contract.contract_id;
        this.recipients = getRecipients() || [];
      } catch (error) {
        console.error('Error fetching contract info:', error);
        this.error = 'Failed to fetch contract info';
      } finally {
        this.isLoading = false;
      }
      if (this.recipients.length === 1) {
    await this.generateSignatureLink(); // Call the method if there's only one recipient
  }
    },
     async generateSignatureLink() {
  try {
    const apiUrl = '/api'; // Define apiUrl here
    const token = import.meta.env.VITE_API_TOKEN;
    const contractResponse = getContractResponse();
    const contractId = contractResponse?.contract?.contract_id;
    console.log('generateSignatureLink method called');

    if (!this.selectedRecipientId) {
      console.error('Selected recipient ID is null');
      return;
    }

    console.log('Selected recipient ID:', this.selectedRecipientId);
    console.log('Recipients:', this.recipients);

    const selectedRecipient = this.recipients.find(recipient => recipient.id === this.selectedRecipientId);
    if (!selectedRecipient) {
      throw new Error('Selected recipient not found');
    }
    
    const payload = {
      recipient_id: this.selectedRecipientId,
      options: {
        duration_in_minutes: 5,
        enable_iframe: false,
        hide_header: false,
        sign_async: false,
        lang: 'fr'
      }
    };

    const response = await axios.post(
      `${apiUrl}/contracts/${contractId}/transaction/signaturelink`,
      payload,
      {
        headers: {
          'j_token': token,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    console.log('API Response:', response); // Log the entire response object
    this.signatureLink = response.data.signature_link;

    console.log('Generated Signature Link:', this.signatureLink);
  } catch (error) {
    console.error('Error generating signature link:', error.message);
  }
},

SignContract(target) {
    if (target === 'iframe') {
        // Remove any existing iframe
        const existingIframe = document.getElementById('signatureIframe');
        if (existingIframe) {
            existingIframe.parentNode.removeChild(existingIframe);
        }

        // Create and append the iframe to the messagediv
        const messagediv = document.getElementById('messagediv');
        if (!messagediv) {
            console.error('messagediv element not found');
            return;
        }
        const iframe = document.createElement('iframe');
        iframe.id = 'signatureIframe'; // Set an ID for the iframe
        iframe.src = this.signatureLink;
        iframe.width = '1100px';
        iframe.height = '1000px'; // Adjust height as needed
        messagediv.appendChild(iframe);
    } else if (target === 'window') {
        // Open signature link in a new window
        window.open(this.signatureLink);
    }
},
},
  };
  </script>
  
  <style scoped>
  .select {
    padding: 4px;
    border-radius: 2px;
    margin: 4px;
    padding: 1rem;
    background-color: #efefef;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-image: linear-gradient(to bottom right, #e8e8e8, #c4c4c4);
  }
  .error-message {
    color: red;
  }
  .create-contract-btn {
    padding: 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .create-contract-btn:hover {
    background-color: #2980b9;
  }

  
  button {
            padding: 8px 16px;
            background-color: #efefef;
            color: black;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 2px;
            transition: background-color 0.3s ease;
            background-image: linear-gradient(to bottom right, #e8e8e8, #c4c4c4);
        }

        button:hover {
            background-image: linear-gradient(to bottom right, #c4c4c4, #e8e8e8);
            font-size: 13px;
            line-height: 15px;
            font-weight: 50;
            text-align: left;
        }
  </style>
  