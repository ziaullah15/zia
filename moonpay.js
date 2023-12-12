function helo() {
    const moonpaySdk = window.MoonPayWebSdk.init({
        flow: 'nft',
        environment: 'sandbox',
        variant: 'overlay',
        params: {
          apiKey: 'pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE',
          contractAddress: '0xc1Fb3E464cF39d9f0aCfB40831bee4E90b5637c7',
          tokenId: '1',
          dynamicAssetInfo: 'true'
        }
        const urlForSignature = moonpaySdk.generateUrlForSigning();

// The URL for signature should be sent to your backend, which should then
// sign it with your API secret and return the signature.
const response = await fetch("/sign-url", {
  method: "POST",
  body: JSON.stringify({ urlForSignature }),
});
const data = await response.json();

// Once you have the signature, you can update the SDK with it and show the
// widget.
moonpaySdk.updateSignature(data.signature);
        
      });

      console.log("hiiiiiiiiiii")

      moonpaySdk.show()
}
