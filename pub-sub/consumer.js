// https://www.cloudamqp.com/
// cloud rabbitMQ 생성
// AMQP 연결

console.log(process.env.AMQP_URL)

const amqp = require("amqplib");
connect();

async function connect() {
    try{
        const amqpServer = process.env.AMQP_URL;
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);

            if (input.number == 7) {
                channel.ack(message)
            }
        })

        console.log("Waiting for messages.....");

    }catch (err){
        console.error(err)
    }
}