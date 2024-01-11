<template>
    <div>
      <button @click="showModal = true">New Recipient</button>
  
      <teleport to="#modals">
        <modal v-if="showModal" @close="closeModal">
          <template #header>
            <h2>Add New Recipient</h2>
          </template>
  
          <form @submit.prevent="addRecipient">
            <div>
              <label for="civility">Civility</label>
              <select id="civility" v-model="newRecipient.civility">
                <option value="MONSIEUR">Mr.</option>
                <option value="MADAME">Mrs.</option>
              </select>
            </div>
            <div>
              <label for="firstname">First Name</label>
              <input id="firstname" v-model="newRecipient.firstname" required />
            </div>
            <div>
              <label for="lastname">Last Name</label>
              <input id="lastname" v-model="newRecipient.lastname" required />
            </div>
            <div>
              <label for="address_1">Address</label>
              <input id="address_1" v-model="newRecipient.address_1" required />
            </div>
            <div>
              <label for="cell_phone">Phone</label>
              <input id="cell_phone" v-model="newRecipient.cell_phone" required />
            </div>
            <div>
              <label for="email">Email</label>
              <input id="email" v-model="newRecipient.email" required />
            </div>
            <div>
              <label for="signature_mode">Signature Mode</label>
              <select id="signature_mode" v-model="newRecipient.signature_mode" required>
                <option value="10">Option 1</option>
                <option value="20">Option 2</option>
              </select>
            </div>
            <button type="submit">Add Recipient</button>
          </form>
        </modal>
      </teleport>
    </div>
  </template>
  
  <script>
  //import axios from 'axios';
  import Modal from 'vueuc-modal'; // Check correct import based on the library
  import Teleport from 'vueuc-teleport'; // Check correct import based on the library
  
  export default {
    components: { Modal, Teleport },
    data() {
      return {
        showModal: false,
        newRecipient: {
          civility: 'MONSIEUR',
          firstname: '',
          lastname: '', 
          address_1: '',
          cell_phone: '',
          email: '',
          signature_mode: 10
        },
        recipients: []
      }
    },
    methods: {
      addRecipient() {
        if (this.validateNewRecipient(this.newRecipient)) {
          this.recipients.push({ ...this.newRecipient });
          this.resetNewRecipientForm();
          this.showModal = false; 
        }
      },
      validateNewRecipient(newRecipient) {
        // You can add form validation logic here
        return newRecipient.firstname && newRecipient.lastname &&
               newRecipient.address_1 && newRecipient.cell_phone &&
               newRecipient.email && newRecipient.signature_mode;
      },
      resetNewRecipientForm() {
        this.newRecipient = {
          civility: 'MONSIEUR',
          firstname: '',
          lastname: '', 
          address_1: '',
          cell_phone: '',
          email: '',
          signature_mode: 10  
        };
      },
      closeModal() {
        this.resetNewRecipientForm();
        this.showModal = false;
      },
      createContract() {
        const formData = new FormData();
        formData.append('recipients', JSON.stringify(this.recipients));
        // Append additional contract data to formData as needed
        axios.post('/api/contracts/allinone?start=true', formData, { 
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          // Handle success
          console.log('Contract created:', response.data);
        }).catch(error => {
          // Handle error
          console.error('Error creating contract:', error);
        });
      }
    }
  }
  </script>