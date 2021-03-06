const MessagingResponse = require('twilio').twiml.MessagingResponse;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fallback = require('./fallback.json')
const url = 'https://opentdb.com/api.php?amount=10&type=boolean';

module.exports = {
  init: init
}

/**
 * A function to start the application
 * @param  {Object} req - The request object
 * @param  {Object} res - The response object
 * @return {String}     Returns the user the correct string based on their progress in the game
 */
function init(req, res) {
  // check if the questions have been stored in the session
  if (req.session.questions) {
      sendMessage(req, res)
  } else {
    getListOfQuestionsFromApi().then((data) => {
      let parsed = JSON.parse(data);
      req.session.questions = parsed.results;
      sendMessage(req, res)
    }).catch((err) => {
      console.error(err)
      req.session.questions = getListOfQuestionsFromJson();
      sendMessage(req, res)
    });
  }
}

/**
 * A function to get a static list of questions
 * @return {Object} containing an array of questions and their answers.
 */
function getListOfQuestionsFromJson() {
  return fallback.results;
}

/**
 * A function to get a dynamic list of questions from an api
 * @return {Object} containing an array of questions and their answers.
 */
function getListOfQuestionsFromApi() {
  const https = require('https');
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    })
    request.on('error', (err) => reject(err))
  })
}

/**
 * Manages the logic for returning a message to the user
 * @param  {Obj} req - The http request
 * @param  {Obj} res - The http response
 * @return {Obj}     The response
 */
function sendMessage(req, res) {
  const twiml = new MessagingResponse();
  const message = getMessage(req, res)
  twiml.message(message);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

/**
 * Private function for creating the logic for validating the message to be sent
 * @param  {Obj} req - The http request
 * @param  {Obj} res - The http response
 * @return {String}     The string to the sent to the end user
 */
function getMessage(req, res) {

  req.session.counter = req.session.counter || 0;
  let message;

  if ( req.session.counter === 0 ) {
    message = createMessage(1, req.session.counter, req)
    req.session.counter = req.session.counter + 1;
  } else if ( req.session.counter === 10 ) {
    message = createMessage(2, req.session.counter, req)
    req.session.counter = 0;
  } else {
    let correct_answer = req.session.questions[req.session.counter].correct_answer.toUpperCase();
    let given_answer = req.body.Body.toUpperCase();
    if (given_answer === correct_answer) {
      message = createMessage(3, req.session.counter, req)
      req.session.counter = req.session.counter + 1;
    } else {
      message = createMessage(4, req.session.counter, req)
      req.session.counter = 0;
    }

  }
  return message;
}

/**
 * Returns a decoded string based on the requestion object
 */
function getQuestion(counter, req) {
  return entities.decode(req.session.questions[counter].question);
}

function createMessage(stage, counter, req) {
  if (stage === 1) {
    return `\nYou have begun....\nQuestion ${counter + 1}\ncounter is ${counter}\nTrue or False. ${getQuestion(counter, req)}\n===============`
  } else if (stage === 2) {
    return `\nGame complete!\ncounter is ${counter}\nStart again\n===============`;
  } else if (stage === 3) {
    return `\nCorrect\nNext stage\nQuestion ${counter + 1}\ncounter is ${counter}\nTrue or False. ${getQuestion(counter + 1, req)}\n===============`
  } else if (stage === 4) {
    return `\nYou Lose!\nyour score is ${counter - 1}. \n Do you want to try again?\n===============`;
  }
}