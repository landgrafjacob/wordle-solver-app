# wordle-solver-app

This repo contains the frontend code for the wordle solver (hosted at solvethewordle.com). It is a simple React app, which calls the backend (which is contained in the [wordle-solver](https://github.com/landgrafjacob/wordle-solver) repo). 

## Components

|  File               | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| `Entry.js`          | Handles user entry, as well as logic to filter wordlist after entry |
| `Guesses.js`        | Displays previous guesses                                           |
| `Header.js`         | Displays page header                                                |
| `Notification.js`   | Displays notification on win or error                               |
| `Recommendation.js` | Displays next recommendation given user guesses                     |

## Pipeline

The GitHub Action for this project is contained in `.github/workflows/pipeline.yml`. It builds the React project, and then syncs the production build to the website S3 bucket.

## Testing locally

To test locally, the following requirements are needed:
* npm

First, set the necessary environment variables in `.env.development`. Then, you can run the React app using `npm start` and navigating to `localhost:3000`

## Challenges
To implement in the future:
* The current logic to filter the list of possible words (goodWord function) given user input is broken (it does not handle multiple letters properly).
* Create separate environments for development and production.
* 
