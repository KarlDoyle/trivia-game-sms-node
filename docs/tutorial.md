## Tutorial

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Install [node](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and [ngrok](https://ngrok.com/).

- You should also have a [Twilio account](https://www.twilio.com).


### Installing

Download the repository

`git clone git@github.com:KarlDoyle/trivia-game-sms-node.git`

Change directory

`cd trivia-game-sms-node/`

Install dependencies

`npm install` _or_ `yarn install`

Create a `secret.json` in the root of the directory.

The contents should be `{ "secret" : "YOUR-SECRET-HERE" }`

Run the application

`npm start` _or_ `yarn start`

#### Connect to Twilio

Open up another tab and run the ngrok command.

`ngrok http 1337`

Learn more about [Twilio and ngrok](https://www.twilio.com/blog/2016/12/localhost-tunneling-ngrok-mac-os-x.html)

- Log into Twilio.com and go to the [Console's Numbers page](https://www.twilio.com/console/phone-numbers/incoming)

- Click on the phone number you'd like to modify

- Find the Messaging section and the "A MESSAGE COMES IN" option

- Select "Webhook" and paste in the URL you want to use from the `ngrok http 1337` response:

![Screenshot of Twilio Console](https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/SMS_Webhook.width-800.png)

- And click save.

[More information on connecting with Twilio](https://www.twilio.com/docs/guides/how-to-receive-and-reply-in-node-js)

#### Demo

Now you can send a text message to the phone number you connected above and you should recieve a reply.
