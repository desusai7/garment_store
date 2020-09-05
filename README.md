# Garment_store

### Garment Store is built using :

React.js - FrontEnd
Express - BackEnd Framework
Node.js - JS Runtime Environment
Postgresql - Database

### Features of Garment Store include : 

1. View list of products.
2. Adding and remove products of your choice to Cart.
3. Saving Cart State using Postgresql database.
3. Authentication using Passport js and even social login using Google Oauth Platform.
4. Linking the app to Google Analytics to track Page refreshes and Cart Submit Events.


## Prerequisites

In order to run the application you need to install (or) have the following requirements on your system.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v14.9.0

    $ npm --version
    6.14.8

### Postgresql

[Postgresql](https://www.postgresql.org/download/) You can simply choose your choice of your operating system and then
follow the installation guide . After installation refer to Database Schema part in the Setup Section.

### Google Analytics

In order to link your applicaation to Google Analytics you need a Unique Tracking Id and here's a clear description of how to obtain
that [GoogleAnalytics](https://support.google.com/analytics/answer/1008080?hl=en)


### Google Oauth Platform

In order to use Social Login in your application using Google you need to have Oauth 2.0 Client Credentials which you can get at [Google Developers Console](https://console.developers.google.com/apis/credentials).



## Installation 

    $ git clone https://github.com/desusai7/garment_store.git
    $ cd garment_store
    $ cd client
    $ npm install
    $ cd .. ( To get back to root folder)
    $ cd backend
    $ npm install

and after following all the above steps you need to do just few more things in order to get the app into running

1. Go to [client/.env](/client/.env) and replace the REACT_APP_TRACKING_ID with the tracking id you got from Google Analytics Platform
    
2. Go to [backend/.env](/backend/.env) and update the variables with your own Database credentials and Google Credentials you got from Google Oauth2.0 platform

3. ### Database Setup

### create tables in your database with the following structure : 

![alt Database Schema](https://rb.gy/q0dzxm)



## Start & watch

    $ cd client
    $ npm start
    $ cd ..
    $ cd backend
    $ npm run dev

and then you can hop over to [here](http:localhost:3000/home) to view the application



License under the [MIT License](LICENSE).