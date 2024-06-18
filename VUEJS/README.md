# VueJS-with-Vite

This template provides a starting point for developing with Vue 3 in Vite, tailored for ISVs (Independent Software Vendors) to easily integrate our API ( OODRIVE SIGN ) using Vue.js. The project structure includes a backend Node.js proxy server to handle server-to-server communication, and a collection of Vue components and DTOs (Data Transfer Objects) to simplify the integration process.


## Customize Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Install Dependencies

```sh
npm install
```

### Install jQuery

```sh
npm install jquery
```

### Install Dropify

```sh
npm install dropify
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Proxy Setup in a New Terminal

Navigate to the backend directory and set up the proxy server:

```sh
cd backend
npm init -y
npm run serve:proxy
```

### Compile and Minify for Production

```sh
npm run build
```

## Project Goal

The aim of this project is to provide ISVs (Independent Software Vendors) with an easy-to-use integration for our API using Vue.js. The project is organized with a Node.js proxy server for backend communication with the API and Vue components that are commonly used in Vue.js projects.

### Project Structure

- **Backend**: A Node.js proxy server to handle server-to-server communication with the API.
- **src/components**: Vue components that will be displayed in the project.
- **dtos**: Repositories containing Data Transfer Objects (DTOs) to standardize data structures used in the application.

This setup ensures a streamlined integration process, making it easier for developers to implement and use our API in their Vue.js applications.