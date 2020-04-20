const rabbitMQ = require('./rabbitMQ');
const rp = require("request-promise");
const fs = require("fs");
const queueName = "crawl-queue";

function crawlPage(msg) {
    return new Promise((resolve, reject) => {
        msg = JSON.parse(msg);
        rp(msg.url)
            .then(result => {
                setTimeout(() => {
                    fs.writeFile("data/" + msg.file_name, result, () => {
                        console.log("Crawl page Done");
                        resolve()
                    });
                }, 5000)
            })
            .catch(e => {
                reject(e);
            })
    })
}

rabbitMQ.connectAndCreateChannel()
    .then(result => {
        result.channel.assertQueue(queueName, {
            durable: true
        }, () => {
            result.channel.prefetch(1);
            result.channel.consume(queueName, (msg) => {
                if(msg){
                    crawlPage(msg.content.toString())
                        .then(() => {
                            result.channel.ack(msg);
                        })
                        .catch(e => {
                            console.error(e.message);
                        })
                }
            }, {
                noAck: false
            })
        })
    })
    .catch(e => {
        console.error(e.message)
    })
