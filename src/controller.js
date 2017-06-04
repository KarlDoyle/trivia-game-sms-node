const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fallback = require('./fallback.json')
const url = 'https://opentdb.com/api.php?amount=10&type=boolean';

// // public
// const init = init;
// // private
// const getListOfQuestionsFromJson = getListOfQuestionsFromJson;
// const getListOfQuestionsFromApi = getListOfQuestionsFromApi;
// const getQuestion = getQuestion;
// const sendMessage = sendMessage;
// const getMessage = getMessage;
// const createMessage = createMessage;

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
  if (req.session.questions) {
      setTimeout(function() {sendMessage(req, res)}, 500)
  } else {
    getListOfQuestionsFromApi().then((data) => {
      console.log('success')
      let parsed = JSON.parse(data);
      req.session.questions = parsed.results;
      setTimeout(function() {sendMessage(req, res)}, 500)
    }).catch((err) => {
      console.error('err')
      console.error(err)
      req.session.questions = getListOfQuestionsFromJson();
      setTimeout(function() {sendMessage(req, res)}, 500)
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
  let message = getMessage(req, res)
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(message);
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

    if ((Math.random() >= 0.5).toString() === (Math.random() >= 0.5).toString()) {
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
    return `You have begun....\nQuestion ${counter + 1}\ncounter is ${counter}\n${getQuestion(counter, req)}\n===============`
  } else if (stage === 2) {
    return `Game complete!\ncounter is ${counter}\nStart again\n===============`;
  } else if (stage === 3) {
    return `Correct\nNext stage\nQuestion ${counter + 1}\ncounter is ${counter}\n${getQuestion(counter + 1, req)}\n===============`
  } else if (stage === 4) {
    return `You Lose!\nyour score is ${counter - 1}. Try again\n===============`;
  }
}