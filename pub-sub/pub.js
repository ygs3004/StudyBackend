// https://www.cloudamqp.com/
// cloud rabbitMQ 생성
// AMQP 연결

console.log(process.env.AMQP_URL)

const amqp = require("amqplib");
const msg = {number: process.argv[2]}
connect();

async function connect() {
    try{
        const amqpServer = process.env.AMQP_URL;
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify((msg))));
        console.log(`Job send successfully ${msg.number}`)
        await channel.close();
        await connection.close();
    }catch (err){
        console.error(err)
    }
}