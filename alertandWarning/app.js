    const amqp = require('amqplib')

    async function receiveMessages() {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    await channel.assertExchange('notification', 'direct')

    const q = await channel.assertQueue('alertandWarningQueue')
    await channel.bindQueue(q.queue, 'notification', 'alert')
    await channel.bindQueue(q.queue, 'notification', 'warning')
    channel.consume(q.queue, (msg)=>{
        const data = JSON.parse(msg.content)
        console.log(data)
        channel.ack(msg)
    })

    }

    receiveMessages()