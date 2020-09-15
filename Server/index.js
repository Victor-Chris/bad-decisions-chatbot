/**
 * Mastodon Bot Node Server
 * 
 * Steps to run server
 * 1. Install node package depencies
 * 2. Add .env file containing Mastodon account keys
 * 3. Start server which will rub on port 8081
 * 
 */

const fs         = require('fs');
const cors       = require('cors');
const env        = require('dotenv');
const express    = require('express');
const request    = require('request');
const bodyParser = require('body-parser')
const mastodon   = require('mastodon-api');
const Mastodon   = require('mastodon-api');

env.config();

const app = express();
app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

/**
 * Use Mastodon Key Details as provided for the created account
 */
const M = new Mastodon({
    client_key    : process.env.CLIENT_KEY,
    client_secret : process.env.CLIENT_SECRET,
    access_token  : process.env.ACCESS_TOKEN,
    timeout_ms    : 60*1000,  // optional HTTP request timeout to apply to all requests.
    api_url       : 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
});

app.post('/', function(req, res){
    if(req.body.tweet){
        tweet = req.body.tweet;
        function make_post(tweet){
            const params = {
                status: tweet
            }

            /**
             * Opted for includes but regex can work just as well
             */
            if(params.status.includes('https://') || params.status.includes('http://')){
                /**
                 * Posting Image
                 * Fetch remote image & create Stream to be posted to status
                 * Set time out of 5 seconds before posting medis since createWriteStream is asynchronous
                 */
                request(params.status).pipe(fs.createWriteStream('mastodon_img.png'));

                setTimeout(() => {
                    M.post('media', { file: fs.createReadStream('./mastodon_img.png') }).then(resp => {
                        const id = resp.data.id;
                        M.post('statuses', { status: '', media_ids: [id] });
                    });
                }, 5000);

            }else{
                /**
                 * Posting Plain Text
                 */
                M.post('statuses', params, (error, data) => {
                    if(error){
                        //Display error if data isn't posted to Mastodon
                        console.log(error);
                    }else{
                        //If data is successfully posted to Mastodon
                        console.log('Data Posted');
                    }
                });
            }
            
        }

        make_post(tweet);
    }else{
        //console.log('No tweet at this time...');
    }
    res.json(null);
});

app.listen(8081);
console.log('Server started...');

