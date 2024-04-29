<template>
    <div>
      <button @click="downloadPDF" class="metallic-button">Download PDF</button>
      <iframe v-if="pdfSrc" :src="pdfSrc" style="width: 1100px; height: 1000px;"></iframe>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { getContractId } from '../contractService.js';
  
  export default {
    data() {
      return {
        contractId: null,
        pdfSrc: null,
        isLoading: false,
        error: null
      };
    },
    methods: {
        async downloadPDF() {
  this.isLoading = true;
  this.error = null;

  try {
    this.contractId = getContractId();

    if (!this.contractId) {
      console.error('Contract ID is null, cannot fetch data');
      this.error = 'Missing contract ID';
      return;
    }

    const apiUrl = '/api';
    const token = import.meta.env.VITE_API_TOKEN;
    const response = await axios.get(`${apiUrl}/contracts/${this.contractId}/transaction/signedcontract`, {
      headers: {
        'j_token': token,
        'Accept': 'application/pdf',
      },
      params: {
        filename: 'contract.pdf' // Default value for the filename query parameter
      },
      responseType: 'arraybuffer' // Specify the response type as arraybuffer
    });

    if (response.status !== 200) {
      throw new Error('Failed to download PDF: ' + response.statusText);
    }

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Convert the Blob data into a data URL
    const pdfDataUrl = URL.createObjectURL(blob);

    // Set the PDF data URL as the source of the iframe
    this.pdfSrc = pdfDataUrl;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    this.error = 'Failed to download PDF: ' + error.message;
  } finally {
    this.isLoading = false;
  }
}


    }
  };
  </script>
  
  <style scoped>
.metallic-button {
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
  