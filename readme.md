## DEMO API Swagger OVERVIEW #

This repository is intended to help ISVs to integrate our API in their products. 

It contains examples of sequences of API calls to implement a standard document signature workflow.

As of today, examples are provided in the following programming languages:

* PHP


### Getting started ###

Clone the repository

### Docker ###

If you want to run the demo in a container, Docker Desktop must be installed on your machine

The project contains a minimal dockerfile with a php7+apache base image so that you can launch the demo behind an Apache web server in a container.

There is also a docker compose file with a volume that maps ./php/src on the local host to /var/www/html in the container, so that he changes made locally to the code are propagated to the container.

To see your changes, just refresh the app web page.

To launch the container type

Build the Docker image:
```sh
docker compose build
```
Start the service using Docker Compose:
```sh
docker compose up
```
### Setting up with Docker ###
If you have Docker installed, you can easily set up and run the project without manually installing dependencies.

1.First, ensure you have both Docker and Docker Compose installed.

Install Docker
```sh
Install Docker Compose
```
2.Clone the GitHub repo:
```sh
git clone 
```
3.Navigate to the project directory:
```sh
cd API_integration_Sign
```
4.Build the Docker image:
```sh
docker compose build
```
5.tart the service using Docker Compose:
```sh
docker compose up
```
Your server will now be running at http://localhost:8020. You can interact with the API or run your tests as you would normally.

To stop the Docker containers, simply run:
```sh
docker compose down
```
PS : Note
When using Docker, any changes you make to your local files will be reflected in the Docker container thanks to the volume mapping in the docker-compose.yml file. If you add or remove dependencies, however, you'll need to rebuild the Docker image using docker compose build.

### Demo application usage ###

Assign your licence token and contract definition id to the corresponding variables defined at the top of the index file.

Launch the container

When you point your browser to the demo web page, you can see 5 buttons

* Create contract : creates one contract with 1 document and 2 recipients
* Get status : retreives the contrat status (OPEN, SINED, ARCHIVED, ABANDONNED)
* Sign contracts : redirects to the contract signature page
* Sign contract if : loads the signature page into an iframe
* Download signed contract: downloads the signed contract into an iframe

Get Status should be cliked after the contract creation.

Sign contract should be clicked after having selected a signatory in the combo box (next to Get status)

Get signed contract should be clicked after all the signatories have signed.

Otherwise, you wil get error messages.
