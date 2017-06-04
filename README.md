# Trivia Game built with NodeJS and Twilio SMS

The idea is a simple trivia game users can play by using SMS to answer true and false to questions.

The user is required to answer 10 qeustions correctly to win the game.


## Motivation

The motivation of this project was to learn about Twilio's programmable SMS.

I aim to build projects using all of the awesome products Twilio has to offer.

## Installation

Ensure you have npm and node installed ( and also [yarn](https://yarnpkg.com/lang/en/docs/install/) if you want to be hip )

Create a `secret.json` file in the root directory.

The contents should look like

```
{
  "secret" : "ENTER-YOUR-SECRET-HERE"
}
```

Install of required dependencies

`Yarn install`

Start the app ( this script is in `package.json` )

`yarn start`

Now send a POST request to `http://localhost:1337/sms` to  get a dummy response;

### Setting Up Twilio

Ensure you have a [Twilio](https://www.twilio.com) account set up. you have access to a trial account where you can test for free.

Here is a tutorial - [RECEIVE AND REPLY TO SMS AND MMS MESSAGES IN NODE.JS](https://www.twilio.com/docs/guides/how-to-receive-and-reply-in-node-js)





## License

MIT License

Copyright (c) 2017 Karl Doyle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.