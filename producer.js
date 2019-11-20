const amqp = require('amqplib') // Import library amqp

async function main() {
    try {
        const msg = 'Hello world!'    // Isi pesan yang dikirim ke RabbitMQ
        const array = {
            name: "Kiddy", 
            job: "Programmer", 
        }

        const conn = await amqp.connect('amqp://localhost');
        const channel = await conn.createChannel();
        await channel.assertQueue('queue1', { durable: false });
        channel.sendToQueue('queue1', Buffer.from(msg));
        console.log('- Sent', msg)
        await channel.assertQueue('queue2', { durable: false })
        channel.sendToQueue('queue2', Buffer.from(JSON.stringify(array)));
    } catch (error) {
        console.warn('[ERROR]', error);
    }
}

main();