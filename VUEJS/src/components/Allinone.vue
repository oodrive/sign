//allinone.vue  path : c:/Users/h.ayari/Desktop/vueJS integration/sign/VUEJS/src/components/allinone.vue

<template>
    <div>
      <div v-if="!showForm">
        <button @click="toggleFormVisibility" class="btn btn-primary">Show Form</button>
      </div>
      <div v-else class="container">
        <!-- Contract Form -->
        <form v-if="!showRecipientForm" @submit.prevent="submitContractForm" class="form">
          <h2>Create Contract</h2>
          <div class="form-group">
            <label for="name">Contract Name:</label>
            <input type="text" id="name" v-model="contract.name" required>
          </div>
          <div class="form-group">
            <label for="messageTitle">Message Title:</label>
            <input type="text" id="messageTitle" v-model="contract.message_title">
          </div>
          <div class="form-group">
            <label for="messageBody">Message Body:</label>
            <textarea id="messageBody" v-model="contract.message_body"></textarea>
          </div>
          <div class="form-group">
            <label for="autoClose">Contre-signature automatique :</label>
            <label class="switch">
              <input type="checkbox" id="autoClose" v-model="autoCloseCheckbox">
              <span class="slider"></span>
            </label>
          </div>
          <button type="button" @click="toggleRecipientFormVisibility" class="btn btn-primary">Add Recipient</button>
        </form>
  
        <!-- Recipient Form -->
        <form v-if="showRecipientForm" @submit.prevent="submitRecipientForm" class="form">
          <h2>Add Recipient</h2>
          <div class="form-group">
            <label for="recipientId">Recipient ID:</label>
            <input type="text" id="recipientId" v-model="recipient.id" @input="toggleRequired">
          </div>
          <!-- Civility dropdown -->
        <div class="form-group">
          <label for="civility" >Civility:</label>
          <select id="civility" v-model="recipient.civility" :required="!recipient.id"  >
            <option value="">Select Civility</option>
            <option value="MONSIEUR">MONSIEUR</option>
            <option value="MADAME">MADAME</option>
          </select>
        </div>
          <div class="form-group">
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" v-model="recipient.firstname" :required="!recipient.id">
          </div>
          <div class="form-group">
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" v-model="recipient.lastname" :required="!recipient.id">
          </div>
         <!-- <div class="form-group">
      <label for="address1">Address:</label>
      <input type="text" id="address1" v-model="recipient.address_1" :required="!recipient.id">
</div> -->
          <div class="form-group">
            <label for="cellPhone">Cell Phone:</label>
            <input type="text" id="cellPhone" v-model="recipient.cell_phone" :required="!recipient.id">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="recipient.email" :required="!recipient.id">
          </div>
          <div class="form-group">
            <label for="signatureMode" >Signature Mode:</label>
            <select id="signatureMode" v-model="recipient.signature_mode" required>
            <option value="">Select Signature Mode</option>
            <option value="10">Face to Face PAD</option>
            <option value="9">Face to Face OTP</option>
            <option value="11">Email+OTP</option>
          </select>
          </div>
          <button type="button" @click="addRecipient" class="btn btn-secondary">Add Another Recipient</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>

export default {
  data() {
    return {
      contract: {
        name: '',
        message_title: '',
        message_body: '',
        auto_close: 0,
      },
      recipient: {
        id: '',
        civility: '',
        firstname: '',
        lastname: '',
        cell_phone: '',
        email: '',
        signature_mode: '',
      },
      recipients: [],
      contract: {},
      showRecipientForm: false,
      recipientFieldsRequired: true,
      showForm: false,
      filteredContract: {}, // Add a new property for the filtered contract
      filteredRecipients: [], // Add a new property for the filtered recipients
    };
  },
  
  
  computed: {
    autoCloseCheckbox: {
      get() {
        return this.contract.auto_close === 1;
      },
      set(value) {
        this.contract.auto_close = value ? 1 : 0;
      }
    }
  },
  methods: {
    async submitContractForm() {
      console.log('Submitting contract form...');
      if (!this.contract.name) {
        alert('Please fill in the contract name.');
        return;
      }

      console.log('Contract before filtering:', this.contract);

      // Filter out the empty fields from the contract object
      const filteredContract = Object.fromEntries(
        Object.entries(this.contract).filter(([_, value]) => value !== '')
      );

      // Log the filtered contract object
      console.log('Filtered Contract:', filteredContract);

      // Assign the filtered contract to the new property
      this.filteredContract = filteredContract;

      // Log the filtered contract property
      console.log('Filtered Contract Property:', this.filteredContract);

      // Set showForm to false to hide the form after submission
      this.showForm = false;
      this.showRecipientForm = false;
      // Handle contract form submission
      // You may want to perform validation here before proceeding to add a recipient
      this.toggleRecipientFormVisibility();
      this.filteredContract = filteredContract; // Assign the filtered contract data
    },
    async submitRecipientForm() {
      if (!this.isValidRecipient()) {
        alert('Please fill in all required recipient fields.');
        return;
      }

      // Prepare the recipient object
      const recipientObject = {};
      if (this.recipient.id && this.recipient.signature_mode) {
        recipientObject.id = this.recipient.id;
        recipientObject.signature_mode = this.recipient.signature_mode;
      } else {
        recipientObject.firstname = this.recipient.firstname;
        recipientObject.lastname = this.recipient.lastname;
        recipientObject.address_1 = this.recipient.address_1;
        recipientObject.cell_phone = this.recipient.cell_phone;
        recipientObject.email = this.recipient.email;
        recipientObject.signature_mode = this.recipient.signature_mode;
      }

      // Proceed to add the recipient
      this.recipients.push(recipientObject);

      // Reset recipient form
      this.recipient = {
        id: '',
        civility: '',
        firstname: '',
        lastname: '',
        cell_phone: '',
        email: '',
        signature_mode: '',
      };

      // Log recipient object
      console.log('Recipient2', recipientObject);

      // Filter out the empty fields from the recipients array
      this.filteredRecipients = this.recipients.filter(recipient => Object.values(recipient).some(value => value));
      Object.assign(filteredContract, this.contract);
      Object.assign(filteredRecipients, this.recipients);
      // Log all recipient objects
      console.log('All Recipients:', this.recipients);
      //contractState.Recipients = this.recipients;
      console.log('CONTRACT:', this.contract);
      //contractState.Contract = this.contract;
      console.log('Filtered Recipients:', filteredRecipients);
      console.log('Filtered Contract:', filteredContract);
      // Hide recipient form after submission
      this.toggleRecipientFormVisibility();
      // Hide the entire form after submission
      this.showForm = false;
    },
    addRecipient() {
      // Filter out the empty fields from the recipient object
      const filteredRecipient = Object.fromEntries(
        Object.entries(this.recipient).filter(([_, value]) => value !== '')
      );

      // Add the filtered recipient object to the recipients array
      this.recipients.push(filteredRecipient);

      // Reset recipient form
      this.recipient = {
        id: '',
        civility: '',
        firstname: '',
        lastname: '',
        cell_phone: '',
        email: '',
        signature_mode: '',
      };

      // Log all recipient objects
      console.log('All Recipients:3', this.recipients);
    },
    toggleRequired() {
      // Toggle recipient fields required based on the presence of ID
      this.recipientFieldsRequired = !this.recipient.id;
    },
    toggleFormVisibility() {
      // Toggle the visibility of the form
      this.showForm = !this.showForm;
    },
    toggleRecipientFormVisibility() {
      // Check if the contract name is filled before toggling recipient form visibility
      if (!this.contract.name) {
        alert('Please fill in the contract name before adding a recipient.');
        return;
      }

      // Toggle the visibility of the recipient form
      this.showRecipientForm = !this.showRecipientForm;
    },
    isValidRecipient() {
      // Check if all required recipient fields are filled
      return (
        (this.recipient.id && this.recipient.signature_mode) ||
        (!this.recipient.id &&
        this.recipient.civility &&
          this.recipient.firstname &&
          this.recipient.lastname &&
          //this.recipient.address_1 &&
          this.recipient.cell_phone &&
          this.recipient.email &&
          this.recipient.signature_mode)
      );
    },
  },
};
// Export filteredContract and filteredRecipients separately
export const filteredContract = {};
export const filteredRecipients = [];


      



</script>
<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input[type="checkbox"] {
    display: none;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #4caf50;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  
  /* Button styles */
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  
  /* Dropdown styles */
  select {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-image: linear-gradient(to bottom, #b5b5b5, #ccc);
    color: #555;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(8, 8, 8, 0.694);
  }

  /* Styling for selected option */
  select option:checked {
    background-color: #f0f0f0; /* Background color of selected option */
  }
</style>

