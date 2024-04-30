<<<<<<< HEAD
<template>
  <div id="app">
    <Header />
    
    <div class="button-container">
      <div>
        <Buttons :stored-files="storedFiles" :appendix-files="appendixFiles" @update-message="updateMessage" />
        <Status v-if="contractCreated" @update-status="updateStatus" />
        <Dwonload v-if="contractCreated && isArchived" />
        <SignatureLink v-if="contractCreated && !isArchived" />
        <Allinone v-if="!contractCreated" />
      </div> 
      <FileUpload v-if="!contractCreated" @update-files="updateFiles" @update-appendix="updateAppendix" />
    </div>
    <AddAppendix /> 
    <div class="content">
      <p v-if="message.text" :class="message.type === 'success' ? 'success-message' : 'failed-message'">
        {{ message.text }}
      </p>
    </div>
=======
//App.vue
<template>
  <div id="app">
    <Header/>
     
    <div class="button-container">
      <Buttons :stored-files="storedFiles" :appendix-files="appendixFiles" @update-message="updateMessage" />  <Status />
      <FileUpload @update-files="updateFiles" @update-appendix="updateAppendix" /> 
    </div>
    <AddAppendix />
    <div class="content">
      <p v-if="message.text" :class="message.type === 'success' ? 'success-message' : 'failed-message'">
        {{ message.text }}     </p>
    
  
    </div>
  
>>>>>>> Newway
  </div>
</template>

<script>
<<<<<<< HEAD
import { ref, computed, onMounted } from 'vue';
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
=======
import { ref, onMounted } from 'vue';
//import { createContract } from './contractService.js';
import 'dropify/dist/css/dropify.min.css'; // Import Dropify CSS
import 'dropify/dist/js/dropify.min.js'; // Import Dropify JS
>>>>>>> Newway
import Status from './components/Status.vue';
import Buttons from './components/Buttons.vue';
import Header from './components/Header.vue';
import FileUpload from './components/FileUpload.vue';
<<<<<<< HEAD
import SignatureLink from './components/SignatureLink.vue';
import Allinone from './components/Allinone.vue';
import Dwonload from './components/Dwonload.vue';
import { getStatus } from './contractService.js';
=======
//import ModalRecipents from './components/ModalRecipents.vue';
>>>>>>> Newway

export default {
  components: {
    Header,
    Status,
    Buttons,
    FileUpload,
<<<<<<< HEAD
    SignatureLink,
    Allinone,
    Dwonload,
  },
  setup() {
    const storedFiles = ref([]);
    const appendixFiles = ref([]);
    const message = ref({ text: '', type: '' });
    const contractCreated = ref(false);
    const status = ref(null);

    const createContract = () => {
      contractCreated.value = true;
      console.log('Contract created:', contractCreated.value);
    };

=======
    //ModalRecipents
    
  },
  data() {
    return {
      isLoading: false,
      error: '',
      status: '',
      contractId: '',
    };
  },
 
  setup() {
    // Define refs to hold file data
    const storedFiles = ref([]);
    const appendixFiles = ref([]);
    const message = ref({ text: '', type: '' });
    // Define methods to update refs when files are selected
>>>>>>> Newway
    const updateFiles = (files) => {
      storedFiles.value = files;
    };

    const updateAppendix = (files) => {
      appendixFiles.value = files;
    };

<<<<<<< HEAD
    const updateMessage = ({ message: msg, type }) => {
      message.value = { text: msg, type };
      if (type === 'success') {
        createContract();
      }
=======

    const updateMessage = ({ message: msg, type }) => {
      message.value = { text: msg, type };
>>>>>>> Newway
      setTimeout(() => {
        message.value.text = '';
      }, 5000);
    };

<<<<<<< HEAD
    const updateStatus = (newStatus) => {
      status.value = newStatus;
    };

    const fetchContractStatus = () => {
      // Simulate fetching contract status
      status.value = getStatus();
      console.log('Fetched contract status:', status.value);
    };

    const isArchived = computed(() => {
      // Check if the status is "ARCHIVED"
      const archived = status.value === 'ARCHIVED';
      console.log('Is archived:', archived);
      return archived;
    });

    onMounted(() => {
      console.log('Component is mounted');
      createContract();
      fetchContractStatus();
    });

=======
    
>>>>>>> Newway
    return {
      storedFiles,
      appendixFiles,
      updateFiles,
      updateAppendix,
      message,
      updateMessage,
<<<<<<< HEAD
      contractCreated,
      status,
      isArchived,
      updateStatus,
    };
  },
=======
     
    };
    
  },
  
>>>>>>> Newway
};
</script>

<style scoped>
<<<<<<< HEAD
@import 'dropify/dist/css/dropify.min.css';

#app {
=======
@import 'dropify/dist/css/dropify.css';





        #app {
>>>>>>> Newway
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
<<<<<<< HEAD
  width: 10000000000vw;
}

.button-container {
  margin-top: 10%;
  width: 100%;
  max-width: 900px;
}

.success-message {
  color: green;
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
=======
  width: 1000vw; /* Adjust the width as needed */
}
.button-container {
  margin-top: 10%;
    width: 200%;
    max-width: 900px;
    
}



.success-message {
  color: green;
  font-size: 40px;
  font-weight: bold ;
  font-style: i;
>>>>>>> Newway
}

.failed-message {
  color: red;
  font-size: 40px;
}
<<<<<<< HEAD
=======


>>>>>>> Newway
</style>
