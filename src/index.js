const AWS = require('aws-sdk');
const twilio = require('twilio');
const s3 = new AWS.S3();

// Initialize Twilio client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async (event, context) => {
    try {
        // Get the S3 bucket and key from the event
        const bucket = event.Records[0].s3.bucket.name;
        const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

        // Get object metadata
        const metadata = await s3.headObject({ Bucket: bucket, Key: key }).promise();

        // Format the variables for the template
        const templateVariables = {
            1: key,  // filename
            2: (metadata.ContentLength / 1024).toFixed(2),  // size
            3: metadata.ContentType,  // type
            4: metadata.LastModified.toISOString()  // created_at
        };

        // Send WhatsApp message using template
        const response = await twilioClient.messages.create({
            from: `whatsapp:${process.env.WHATSAPP_FROM}`,
            to: `whatsapp:${process.env.WHATSAPP_TO}`,
            body: 'New file uploaded to S3!\n\n' +
                `📁 Filename: ${key}\n` +
                `📦 Size: ${(metadata.ContentLength / 1024).toFixed(2)} KB\n` +
                `📎 Type: ${metadata.ContentType}\n` +
                `⏰ Uploaded at: ${metadata.LastModified}`
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully sent notification',
                messageId: response.sid
            })
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};