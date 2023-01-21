const amqp = require('amqplib')
const config = require('./config')


class Publisher {

    channel ;

    async createChannel () {
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel(); 
    }

    async sendMessage(routingKey, message){
        if ( !this.channel) {
           await this.createChannel()
        }
            const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, 'direct') 

        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime:  new Date(),
    }

        await this.channel.publish(exchangeName, routingKey,
            Buffer.from(JSON.stringify(logDetails))
            )
            console.log(` The message ${message} is sent to the ${exchangeName}`)
        }


    }


    module.exports = Publisher