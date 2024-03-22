<template>
  <button @click="createAndSendContract" class="create-contract-btn">Créer contrat</button>
</template>

<script>
import { createContract } from '../contractService.js';

export default {
  props: {
    storedFiles: Array,
    appendixFiles: Array,
  },
  emits: ['update-message'],
  setup(props, { emit }) { 
    const createAndSendContract = async () => {
      const token = import.meta.env.VITE_API_TOKEN;
      const cdi = import.meta.env.VITE_CDI;
      const contractorId = import.meta.env.VITE_CONTRACTOR_ID;
      const actorId = import.meta.env.VITE_ACTOR_ID;

      try {
        if (!props.storedFiles.length) { 
          emit('update-message', { message: 'No files for the contract are selected.', type: 'error' });
          return;
        }

        let response;
        if (props.appendixFiles && props.appendixFiles.length) { // Check the length of props.appendixFiles
          response = await createContract(token, cdi, contractorId, actorId, props.storedFiles, props.appendixFiles);
        } else {
          response = await createContract(token, cdi, contractorId, actorId, props.storedFiles);
        }

        console.log('Contract created:=======================', response);
    
        

        /// Store the contract_id in session storage
       
        emit('update-message', { message: 'Contract created successfully!', type: 'success' });
      } catch (error) {
        console.error('Error creating contract:', error);
        emit('update-message', { message: 'There was an error creating the contract. Please try again.', type: 'error' });
      }
    };
    

    return {
      createAndSendContract
    };
  }
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
  