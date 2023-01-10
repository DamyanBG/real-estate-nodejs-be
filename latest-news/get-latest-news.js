import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

const newsApiKey = process.env.NEWS_API_KEY;

function main(res) {
    request(
        `https://newsdata.io/api/1/news?apikey=${newsApiKey}&category=business,world,top,politics&language=en&q=real%20estate`,
        function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
            }
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            const bodyAsObject = JSON.parse(body);
            console.log(typeof bodyAsObject.results);
            res.status(200).json(bodyAsObject.results);
        }
    );
}

export { main };
