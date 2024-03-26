# VueJS-with-Vite

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).


## Project Setup

```sh
npm install
```
# Install jQuery
```sh
npm install jquery
```
# Install Dropify
```sh
npm install dropify
```
### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Proxy Setup in a new terminal 
```sh
cd backend
```
```sh
npm install
```
```sh
npm init -y
```
```sh
npm run serve:proxy
```

### Compile and Minify for Production

```sh
npm run build
```
### if you want to run the project with Docker follow these steps :
change the vite config of the target proxy .see coment in vite.config.json
Run 
```sh
docker-compose up --build
```
to build the Docker images and start the containers.