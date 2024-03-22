<template>
 
    <button @click="fetchContractInfo" class="create-contract-btn">Get Contract Info</button>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p v-if="contractId">Contract ID: {{ contractId }}</p>
      <p v-if="status">Status: {{ status }}</p>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
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
      contractId: null,
      status: null,
    };
  },
  methods: {
    async fetchContractInfo() {
      this.isLoading = true;
      this.error = null;

      try {
        this.contractId = getContractId();
        this.status = getStatus();

        if (!this.contractId) {
          console.error('Contract ID is null, cannot fetch data');
          this.error = 'Missing contract ID';
          return;
        }

        const apiUrl = '/api';
        const token = import.meta.env.VITE_API_TOKEN;
        const response = await axios.get(`${apiUrl}/contracts/${this.contractId}`, {
          headers: {
            'j_token': token,
            'Accept': 'application/json',
          },
        });

        // Update status with response data
        this.status = response.data.status;
        this.$emit('update-status', this.status); // Emit the status update event
      } catch (error) {
        console.error('Error fetching contract info:', error);
        this.error = 'Failed to fetch contract info';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


<style scoped>
/* Your styles here */
</style>

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