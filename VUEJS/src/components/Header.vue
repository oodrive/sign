// 1. Header.vue

<template>
  <header class="header">
    <img alt="Oodrive logo" class="logo" src="./icons/LOGO-OODRIVE-2022-noir.svg"  />
    
  </header>
</template>

<script>

export default {
  name:'Header'
};
</script>

<style scoped>

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  padding: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center top;
  font-family: Arial, sans-serif;
  z-index: 1; /* Ensure the header is above other elements */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.logo {
  max-width: 100%; /* Ensure the logo doesn't exceed the container */
  width: 350px; /* Set a specific width if needed */
}


</style>