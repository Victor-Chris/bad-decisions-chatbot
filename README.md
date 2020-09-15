# bad-decisions-chatbot

This application consists of two parts i.e a Client [create-react-app] and a server that is to be connected
to a mastodon instance.

In order to run it successfully please follow the following steps AFTER cloning/downloading the repo:
    
### STEPS: (For the react application i.e. Client)
1. Simply install the the node dependencies using `npm install`.
2. Run the app using `npm start to start the react app/client`.
3. This will present you with the client application running on `port 2500`.
4. The application can be accessed from [http://localhost:2500].
5. (Optional) The client is already initalized with a README file for more information such as creating a 
    build version for deployment, testing the application etc.

### STEPS: (For the node application i.e Server)
1. Install the node dependies for this as well using `npm install`.
2. Proceed to the url [https://botsin.space] to create an account set up as a bot (Refer to useful links).
3. Once the bot is set up please capture the relevant keys which you must save in a `.env` file in the server
    directory.
4. Execute the `index.js` file using `node index.js` - This will start the server on `port 8081`. Please note 
    that if the `.env` file is missing or misconfigured the server will not be able to run

If the client and server are running successfully on the same machine they should be communicating now.


You can now interact with the react application through the chatbot and the relevant information will be 
posted/tooted to your mastodon bot.

### Useful Links

### Documentation for the react-simple-chatbot library used in the react application:
https://lucasbassetti.com.br/react-simple-chatbot/#/docs/steps 

### YouTube link explaining what Mastodon is and how to develop/configure the Mastodon bot:
https://www.youtube.com/watch?v=sKSxBd56H70&t=13s

### Mastodon API Documentation on setting up the client application for Node:
https://github.com/vanita5/mastodon-api

### Google drive link with video showing the react application in action while tooting to the mastodon bot instance:
https://drive.google.com/file/d/1nyIRd_nMRoMhXPaOKU-yFDtMq7SNdu0B/view?usp=sharing

In the `Images` folder are some screenshots of crucial parts of both the client and server which you can take a 
look at for example: 
### Client Images
`Client - 1.png` :- Screenshot displaying function that is called to send information to the node server.
`Client - 2.png` :- Section of code where the aforementioned function is called to communicate with the server.

### Server Images
`Node Server - 2.png` :- An indication of when the server is up & running.

### Media
`Screen Recording 2020-09-15 at 01.40.56.mp4` :- Video illustrating how the application works in browsers.
