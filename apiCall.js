import crypto from 'crypto';

const originalUrl = 'https://buy-sandbox.moonpay.com/nft?apiKey=pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE';

const signature = crypto
  .createHmac('sha256', 'sk_test_9c8T5Mm9C32wvhpWMNA6PgZm7F5gxyqo')
  .update(new URL(originalUrl).search)
  .digest('base64');

const urlWithSignature = `${originalUrl}&signature=${encodeURIComponent(signature)}`;
console.log(encodeURIComponent(signature));

console.log("signature url:", urlWithSignature);