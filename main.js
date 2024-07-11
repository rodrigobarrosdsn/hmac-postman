// Function to generate HMAC
function generateHMAC(jsonData, secretKey) {
    const crypto = require('crypto-js');
    const hmacSHA512 = crypto.HmacSHA512(jsonData, secretKey);
    return hmacSHA512.toString(crypto.enc.Hex);
}

// Get the request body
let payload = pm.request.body.raw;

// Parse the JSON string
let jsonObj = JSON.parse(payload);

// Convert back to a JSON string without pretty-printing
payload = JSON.stringify(jsonObj);

// Replace ": " with ":" and ", " with ","
payload = payload.replace(/:\s/g, ':').replace(/,\s/g, ',');

// Get the secret key (you need to set this in your environment variables)
const secretKey = pm.environment.get('hmac_key');

// Generate the HMAC
const hmac = generateHMAC(payload, secretKey);

// Set the HMAC in an environment variable for later use
pm.environment.set('generated_hmac', hmac);

console.log('Generated HMAC:', hmac);
