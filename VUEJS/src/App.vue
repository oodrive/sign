<template>
  <div>
    <header>
      <img alt="Vue logo" class="logo" src="https://www.oodrive.com/wp-content/uploads/2021/12/LOGO-OODRIVE-2022-noir.svg" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>
    <main>
      <TheWelcome />
    </main>
     <!-- Button to create and send contract -->
     <button @click="createAndSendContract" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create and Send Contract</button>
    <!-- Your custom drop box with Dropify style -->
    <div
      class="dropify-wrapper"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <p v-if="dropMessage" class="text-green-500">{{ dropMessage }}</p>
      <p v-else class="text-gray-500">Drag and drop your Contract here or click</p>
      <input
        type="file"
        @change="handleFileInput"
        ref="dropifyInput"
        class="dropify"
        accept=".pdf, .jpg, .png, image/jpeg, image/png, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
        data-height="70"
        multiple
      />
    </div>
    <div>
    <!-- Input for appendixparts -->
    <input
      type="file"
      @change="handleAppendixFileInput"
      accept=".pdf, .jpg, .png, image/jpeg, image/png, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
      class="mt-2"
      multiple
    />
    <Notification :serverResponse="serverResponse" />
  </div>
  
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createContract } from './contractService.js';
import 'dropify/dist/css/dropify.min.css'; // Import Dropify CSS
import 'dropify/dist/js/dropify.min.js'; // Import Dropify JS
import Notification from './Notification.vue';


export default {
  setup() {
    const storedFiles = ref([]); // Change to an array to store multiple files for pdfparts
    const appendixFiles = ref([]); // Change to an array to store multiple files for appendixparts
    const dropMessage = ref('');
    const isAddRecipientModalOpen = ref(false);

    const handleDragOver = (event) => {
      event.preventDefault();
      // Add any styling changes for the drag over state if needed
    };

    const handleDragEnter = (event) => {
      event.preventDefault();
      // Add any styling changes for the drag enter state if needed
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      // Add any styling changes for the drag leave state if needed
      dropMessage.value = '';
    };

    const handleDrop = (event) => {
      event.preventDefault();
      storedFiles.value = Array.from(event.dataTransfer.files); // Convert FileList to an array for pdfparts
      console.log('Files dropped:', storedFiles.value);
      dropMessage.value = 'Files dropped successfully!';
    };

    const handleFileInput = (event) => {
      storedFiles.value = Array.from(event.target.files); // Convert FileList to an array for pdfparts
      console.log('Files selected:', storedFiles.value);
      dropMessage.value = 'Files selected successfully!';
    };

    const handleAppendixFileInput = (event) => {
      appendixFiles.value = Array.from(event.target.files); // Convert FileList to an array for appendixparts
      console.log('Appendix files selected:', appendixFiles.value);
      // Optionally, you can add a message for appendixparts here
    };

    const createAndSendContract = async () => {
      const token = import.meta.env.VITE_API_TOKEN;
      const cdi = import.meta.env.VITE_CDI;
      const contractorId = import.meta.env.VITE_CONTRACTOR_ID;
      const actorId = import.meta.env.VITE_ACTOR_ID;

      try {
        if (!storedFiles.value.length) {
          console.error('No files for the contract are selected.');
          return;
        }

        let response;

        if (appendixFiles.value && appendixFiles.value.length) {
          // If appendixFiles is provided, include it in the createContract call
          response = await createContract(token, cdi, contractorId, actorId, storedFiles.value, appendixFiles.value);
        } else {
          // If appendixFiles is not provided, call createContract without it
          response = await createContract(token, cdi, contractorId, actorId, storedFiles.value);
        }

        console.log('Contract created:', response);

        // Clear message and selected files after creating and sending the contract
        dropMessage.value = '';
        storedFiles.value = [];
        appendixFiles.value = [];
      } catch (error) {
        console.error('Error creating contract:', error.message);
      }
    };

     
    onMounted(() => {
      // Initialize Dropify after the component is mounted
      $('.dropify').dropify();

      // Optionally, you can listen to the 'dropify.afterClear' event to handle file removal
      $('.dropify').on('dropify.afterClear', function (event, element) {
        // Handle file removal
        console.log('File removed:', element);
      });
    });

    return {
      storedFiles,
      appendixFiles,
      dropMessage,
      createAndSendContract,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDrop,
      handleFileInput,
      handleAppendixFileInput,
      
    };
  },
  
};


</script>

<style scoped>
@import 'dropify/dist/css/dropify.css';


.dropify-wrapper {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  position: relative;
}

.text-green-500 {
  color: green;
}

.text-gray-500 {
  color: gray;
}
.header {
  line-height: 1.5;
}
.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}

body {
    background-image: url('https://www.oodrive.com/wp-content/uploads/2022/01/fond-business-card-1-2-2048x210.png');
    background-repeat: no-repeat;
    background-size: contain; /* Adjusted property */
    background-position: center bottom;
    font-family: Arial, sans-serif;
    text-align: center;
    padding-top: 30px;
    background-attachment: fixed;
}


        img {
            width: 1000px;
            height: 100px;
            margin-bottom: 20px;
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

        .select {
            background-color: #efefef;
            padding: 4px;
            border-radius: 2px;
            margin: 4px;
        }

        #iframediv {
            height: 800px;
        }
        #messagediv p.success-message {
            color: green;
            font-size: 40px;
            font-weight: bold ;
            font-style: i;
        }
        #messagediv p.failed-message {
            color: red;
            font-size: 40px;
        }
        .dropify-wrapper input {
          display: block;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    height: 200px;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 22px;
    color: #777;
    background-color: #FFF;
    background-image: none;
    text-align: center;
    border: 2px solid #E5E5E5;
    -webkit-transition: border-color .15s linear;
    transition: border-color
}
.dropify-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}




</style>
