<template>
    <div v-if="message" class="notification">
      {{ message }}
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      serverResponse: Object,
    },
    setup(props) {
      const message = ref('');
  
      // Watch for changes in serverResponse prop and show a message when contract_id is set
      watch(() => props.serverResponse, (newValue) => {
        if (newValue && newValue.contract && newValue.contract.contract_id) {
          const contractId = newValue.contract.contract_id;
          message.value = `Contract created successfully. Contract ID: ${contractId}`;
          // Optionally, clear the message after a timeout
          setTimeout(() => {
            message.value = '';
          }, 5000);
        }
      });
  
      return {
        message,
      };
    },
  };
  </script>
  
  <style scoped>
  .notification {
    background-color: #4caf50;
    color: white;
    padding: 15px;
    margin-bottom: 20px;
  }
  </style>
  