const rabbitMQ = require('./rabbitMQ');
const queueName = "crawl-queue"

async function crawlPage(req, res) {
    try{
        const {url, file_name} = req.body;
        if(!url || !file_name){
            throw new Error("Something missing.")
        }
        let {channel, connection} = await rabbitMQ.connectAndCreateChannel();
        channel = await channel.assertQueue(queueName, {
            durable: true
        });
        await channel.sendToQueue(queueName, new Buffer.from(JSON.stringify({url, file_name})), {
            persistent: true
        });
        await rabbitMQ.closeConnection(connection)
        return res.json({
            success: true,
            data: {

            }
        })
    }
    catch(err){
        console.error(err.message);
        return res.json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    crawlPage
}