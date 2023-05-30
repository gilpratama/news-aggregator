# News Aggregator

News Aggregator is a simple project that utilizes PHP Laravel 8.0 as the backend and ReactJS as the frontend to provide an efficient news aggregation platform. The project aims to gather news articles from three different APIs and manipulate them using the PHP Laravel backend, making the data ready to be consumed by the ReactJS frontend.

## Features

- **News Aggregation**: The project collects news articles from three separate APIs (OpenAPI, The Guardian and New York Times), allowing users to access a diverse range of news from various sources.
- **Backend API**: PHP Laravel 8.0 is used as the backend framework to provide a reliable and efficient API for handling news data. The backend processes and manipulates the data to ensure optimal usability on the frontend.
- **Frontend Interface**: ReactJS is employed as the frontend technology to create a user-friendly interface for browsing and consuming news articles. The interface is designed to be intuitive and responsive, providing a seamless user experience.
- **Dockerized Environment**: This project is fully dockerized, allowing for easy setup and deployment. With Docker, you can ensure consistency and portability across different environments, making it convenient to run the application on any system.

## Installation

This project best runs on Windows Subsystem for Linux (WSL) or other similar environments.

To run the News Aggregator project locally, please follow these steps:

### Clone the repository:
`git clone git@github.com:gilpratama/news-aggregator.git`

### Navigate to the project directory:
`cd news-aggregator`

### Install Node Component on Frontend
`cd frontend` and execute `npm install`

### Navigate to Laradock folder:
back to parent directory by `cd ..` and execute `cd laradock`

### Build and start the Docker containers:
`docker compose up -d nginx mysql react-frontend`

### Setting up Database
#### Execute mysql bash
`docker compose exec mysql bash`

#### Enter MySQL Bash
`mysql -u root -p` then enter password as `root` if needed.

#### Create Database
Create database by executing `CREATE DATABASE news_aggregator`;

#### Exit workspace bash
Execute `exit` to close workspace bash

### Setup Backend for first time use.
#### execute workspace bash
`docker compose exec workspace bash`

#### Run Composer Installation
`composer install`

#### Setup Laravel .ENV file 
`cp .env.example .env`

#### Generate APP_KEY
`php artisan key:generate`

#### Connect to your Database
Copy these lines to your Laravel .ENV file.
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE={your database name}
DB_USERNAME=root
DB_PASSWORD=root
```

Run `chmod -R 777 .` if you encounter permission problem

#### Migrate database table
`php artisan migrate`

#### Connect to 3 News APIs
Copy NewsAPI, The Guardian and NYTimes API to Laravel .ENV
```
NEWSAPI_KEY=2e8a013e80d84b32ac7cefe98e1b03c2
GUARDIAN_API_KEY=b6e8fb1f-7adb-4261-9118-80bcc4b779c1
NYT_API_KEY=gK35i7aY5TsK22U3T2srPwFrESeTDXCV
```

## Access application
Open your web browser and visit http://localhost:4000 to view the News Aggregator frontend interface.


## FAQ

#### Do you need to be logged in to access the app?

Assuming the app is not going to be open to public, then yes, you have to be logged in first.

#### How do you register?

You can create account on the login page by clicking **Create an Account**

#### What to do after register?

You will be redirected to the homepage, and can use the same credential to login again incase you are logged out.

#### Is there any bugs in this application?

Yes, unfortunately filtering by category isn't fully functional, for now. 





## Bugs
#### Filter by category
Due to a very limited time for doing the project, I was unable to match the APIs used for filter the news by category. I will improve my skill as soon as I got my job offer 😉 Promise 🤞
## Acknowledgements

 - [Laradock](https://github.com/laradock/laradock)
 - [Laravel React Starter](https://github.com/thecodeholic/laravel-react-starter)

## Closure

Please don't hesitate to reach out if you encounter any issues while setting up the project. I will be happy to provide assistance and support with great enthusiasm.
