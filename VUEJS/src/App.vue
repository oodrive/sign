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
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
import Status from './components/Status.vue';
import Buttons from './components/Buttons.vue';
import Header from './components/Header.vue';
import FileUpload from './components/FileUpload.vue';
import SignatureLink from './components/SignatureLink.vue';
import Allinone from './components/Allinone.vue';
import Dwonload from './components/Dwonload.vue';
import { getStatus } from './contractService.js';

export default {
  components: {
    Header,
    Status,
    Buttons,
    FileUpload,
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

    const updateFiles = (files) => {
      storedFiles.value = files;
    };

    const updateAppendix = (files) => {
      appendixFiles.value = files;
    };

    const updateMessage = ({ message: msg, type }) => {
      message.value = { text: msg, type };
      if (type === 'success') {
        createContract();
      }
      setTimeout(() => {
        message.value.text = '';
      }, 5000);
    };

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

    return {
      storedFiles,
      appendixFiles,
      updateFiles,
      updateAppendix,
      message,
      updateMessage,
      contractCreated,
      status,
      isArchived,
      updateStatus,
    };
  },
};
</script>

<style scoped>
@import 'dropify/dist/css/dropify.min.css';

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
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
}

.failed-message {
  color: red;
  font-size: 40px;
}
</style>
