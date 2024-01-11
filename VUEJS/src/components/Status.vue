<template>

    <button @click="fetchContractInfo"  class="create-contract-btn" > Get Contract Info</button>
    <div>
    <p>Contract ID: {{ contractId }}</p>
    <p>status: {{ contractId }}</p>
  </div>
    
</template>

<script>
import axios from 'axios';
import { getContractId, getStatus } from '../contractService.js';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      contractId: null, // Add contractId to local component data
      status: null,    // Add status to local component data
    };
  },

  computed: {
    // You can remove the computed properties unless you plan to use them in the template
    // contractId() {
    //   return getContractId();
    // },
    // status() {
    //   return getStatus();
    // },
  },
  
  methods: {
    async fetchContractInfo() {
      this.contractId = getContractId(); // Assign contractId from the service
      this.status = getStatus();         // Assign status from the service
      if (!this.contractId) {
        console.error('Contract ID is null, cannot fetch data');
        this.error = 'Missing contract ID';
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const apiUrl = '/api'; // Use the proxy path
        const token = import.meta.env.VITE_API_TOKEN;
        const response = await axios.get(`${apiUrl}/contracts/${this.contractId}`, {
          headers: {
            'j_token': token,
            'Accept': 'application/json',
          },
        });

        // Do something with the response data
        console.log(response.data);
        // Potentially update local state with response data here

      } catch (e) {
        // Handle the error: log to console, show error message, etc.
        console.error('Error fetching contract info:', e);
        this.error = 'Failed to fetch contract info';
        
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style scoped>
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