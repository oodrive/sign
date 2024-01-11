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
  
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
//import { createContract } from './contractService.js';
import 'dropify/dist/css/dropify.min.css'; // Import Dropify CSS
import 'dropify/dist/js/dropify.min.js'; // Import Dropify JS
import Status from './components/Status.vue';
import Buttons from './components/Buttons.vue';
import Header from './components/Header.vue';
import FileUpload from './components/FileUpload.vue';
//import ModalRecipents from './components/ModalRecipents.vue';

export default {
  components: {
    Header,
    Status,
    Buttons,
    FileUpload,
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
    const updateFiles = (files) => {
      storedFiles.value = files;
    };

    const updateAppendix = (files) => {
      appendixFiles.value = files;
    };


    const updateMessage = ({ message: msg, type }) => {
      message.value = { text: msg, type };
      setTimeout(() => {
        message.value.text = '';
      }, 5000);
    };

    
    return {
      storedFiles,
      appendixFiles,
      updateFiles,
      updateAppendix,
      message,
      updateMessage,
     
    };
    
  },
  
};
</script>

<style scoped>
@import 'dropify/dist/css/dropify.css';





        #app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
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
}

.failed-message {
  color: red;
  font-size: 40px;
}


</style>
