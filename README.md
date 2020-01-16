# ws-chat
Web socket chat using MySQL

## Installing / Getting started
Introduction on how to run the application.

> Clone the repo and cd into the file directory

>  MySQL Database configuration

```shell
- CREATE DATABASE chats-db
CREATE TABLE `chats` ( `id` INT NOT NULL AUTO_INCREMENT , `chat` LONGTEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

```

```shell
npm install --To install all dependencies 
npm start   --To run the server
click index.html - To run the application
```

### Initial Configuration

Install Node JS which should come with a node package manager. It is the required environment for the application
Open the node command prompt or any of your favourite command tool and type ``` node --version``` to check if it installed
cd .. or change directory to the clone repo and type ``` npm install ```

## Developing

Procedure for further development of this application:

```shell
git clone https://github.com/hameedhub/ws-chat
cd into the ws-chat folder
cmd npm install
```

This install all the required dependencies for the project

### Built with

* Node Js - The web frame work
* npm - The package manager
* socket.io
* Jquery
* MySQL







