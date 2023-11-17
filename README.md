# Apartment Booking Backend

## Description

This repository contains the code for a series of APIs built with NestJS and Mongoose for the conection with the database ( MongoDB ) for an Apartment booking web app

## Table of Contents

- [Installation](#installation)
- [Diagrams](#diagrams)
- [APIs](#apis)
- [License](#license)

## Installation

- Clone the repository
- Navigate to the project's folder
- Install dependencies: `npm install`
- Run development `npm run start`
- Run watch mode `npm run start:dev`

# Diagrams

## UML Class

![classDepa](/classDiagram.png)

## UML Components

![componentDepa](/componentsDiagram.png)

# APIs

## Authentication

### POST /auth

Creates a new User.

Request Example:

```
POST /auth
```

Body

```
{
    "name": "exampleName",
    "password": "examplePass",
    "email": "exampleEmail",
    "phoneNumber": "5578849393",
}
```

### POST /auth/login

Logs in an account

Request Example:

```
POST /login
```

Body

```
{
    "email": "exampleEmail",
    "password": "examplePass",
}
```

## Booking

## Apartment

## Image

# License

MIT
