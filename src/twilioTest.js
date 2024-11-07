require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Function to send WhatsApp message using template
async function sendWhatsAppTemplate(templateName) {
    try {
        const response = await client.messages.create({
            from: `whatsapp:${process.env.WHATSAPP_FROM}`,
            to: `whatsapp:${process.env.WHATSAPP_TO}`,
            body: templateName
        });

        console.log('Template message sent successfully!');
        console.log('Message SID:', response.sid);
        console.log('Status:', response.status);
        return response;
    } catch (error) {
        console.error('Error sending template message:', error.message);
        throw error;
    }
}

// Function to send media template
async function sendWhatsAppMediaTemplate(templateName, mediaUrl) {
    try {
        const response = await client.messages.create({
            from: `whatsapp:${process.env.WHATSAPP_FROM}`,
            to: `whatsapp:${process.env.WHATSAPP_TO}`,
            body: templateName,
            mediaUrl: [mediaUrl]
        });

        console.log('Media template message sent successfully!');
        console.log('Message SID:', response.sid);
        console.log('Status:', response.status);
        return response;
    } catch (error) {
        console.error('Error sending media template message:', error.message);
        throw error;
    }
}

// Test functions
async function runTests() {
    try {
        // Test 1: Send simple template message
        console.log('\nTest 1: Sending template message...');
        await sendWhatsAppTemplate(
            'Your file has been uploaded to S3'  // Your approved template name
        );

        // Test 2: Send template with media
        console.log('\nTest 2: Sending media template message...');
        await sendWhatsAppMediaTemplate(
            'Your image has been uploaded to S3',  // Your approved template name
            'https://your-s3-bucket.s3.amazonaws.com/example.jpg'
        );

    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Environment variables check
function checkEnvironmentVariables() {
    const requiredVars = [
        'TWILIO_ACCOUNT_SID',
        'TWILIO_AUTH_TOKEN',
        'WHATSAPP_FROM',
        'WHATSAPP_TO'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error('Missing required environment variables:', missingVars.join(', '));
        process.exit(1);
    }
}

// Run the program
checkEnvironmentVariables();
runTests();