<template>
    <input
      type="file"
      @change="handleAppendixFileInput"
      accept=".pdf, .jpg, .png, image/jpeg, image/png, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
      class="mt-2"
      multiple
    />
  </template>
  
  <script>
  export default {
    methods: {
      handleAppendixFileInput() {
        // Add your logic for handling appendix file input
      }
      // Add other methods as needed
    }
  };
  </script>
  
  <style scoped>
  input {
    padding: 1rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  /* Add more styles as needed */
  </style>
  