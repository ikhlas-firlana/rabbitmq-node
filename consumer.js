const amqp = require('amqplib') // Import library amqp

async function main() {
    try {

        const conn = await amqp.connect('amqp://localhost');
        const channel = await conn.createChannel();
        const queue1 = await channel.assertQueue('queue1', { durable: false })
        if(queue1) {
            channel.consume('queue1', msg => console.log('- Received', msg.content.toString()), { noAck: true });
            console.log('* Waiting for messages. Ctrl+C to exit');          
        }
        const queue2 = await channel.assertQueue('queue2', { durable: false })
        if (queue2) {
           channel.consume('queue2', msg => {
                let json_data = JSON.parse(msg.content.toString());
                console.log(json_data)
                console.log(`His name is ${json_data.name}` );
                console.log(`His Job is ${json_data.job}`);
            }, { noAck: true })

           console.log('* Waiting for messages. Ctrl+C to exit');
        }
    } catch (error) {
        console.warn('[error]', error);
    }
}

main();