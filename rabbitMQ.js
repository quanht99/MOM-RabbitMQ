const amqp = require('amqplib/callback_api');

function connectAndCreateChannel() {
    return new Promise((resolve, reject) => {
        amqp.connect("amqp://guest:guest@localhost", {}, (err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.createChannel((err, channel) => {
                    if (err) {
                        reject(err);
                    }
                    resolve({channel, connection});
                })
            }
        })
    })
}

function closeConnection(connection) {
    return new Promise(resolve => {
        setTimeout(() => {
            connection.close();
            resolve();
        }, 300)
    })
}

module.exports = {
    connectAndCreateChannel,
    closeConnection
}