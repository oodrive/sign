// 3. FileUpload.vue

<template>
  <div
    class="dropify-wrapper"
    @dragover.prevent="handleDragOver"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <p v-if="dropMessage" class="text-green-500"> <br/> {{ dropMessage }}</p>
    <p v-else class="text-gray-500"> <br/> 
    Glisser/déposer votre document ici pour débuter
    <h6> <br/> Taille max : 50 Mo - Format : PDF, DOCX ou PPTX</h6>
     </p>
      
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
    Ajout Annexe
    <!-- Input for appendixparts -->
    <input
      type="file"
      @change="handleAppendixFileInput"
      accept=".pdf, .jpg, .png, image/jpeg, image/png, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
      class="mt-2"
      multiple
    />
  
  </div>
</template>

<script>
import { ref, onMounted, defineEmits } from 'vue';

export default {
  emits: ['update-files', 'update-appendix'], // Declare the custom events using the 'emits' option
  setup(_, { emit }) {
    const storedFiles = ref([]); // Change to an array to store multiple files for pdfparts
    const appendixFiles = ref([]); // Change to an array to store multiple files for appendixparts
    const dropMessage = ref('');

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
      emit('update-files', storedFiles.value); // Emit the selected files to the parent component
    };

    const handleAppendixFileInput = (event) => {
      appendixFiles.value = Array.from(event.target.files); // Convert FileList to an array for appendixparts
      console.log('Appendix files selected:', appendixFiles.value);
      // Optionally, you can add a message for appendixparts here
      emit('update-appendix', appendixFiles.value); // Emit the selected appendix files to the parent component
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
.dropify-wrapper input {
          display: block;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    height: 100px;
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



.text-green-500 {
  color: rgb(12, 202, 12);
  font-size: 30px;
  font-weight: bold ;
  font-style: i;
 
}

.text-gray-500 {
  color: rgb(131, 140, 153);
  font-size: 30px;
}

.drop-area {
  border: 5px dashed #ccc;
  padding: 20px;
  text-align: center;
}
</style>



