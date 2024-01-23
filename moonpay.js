async function helo() {

        console.log("hiiiiiiiiiii");
        const metadata = encodeURIComponent(JSON.stringify({
            moonpayCollectionId: "49d10973-9a10-4c3c-ae48-555aa345c8e6",
            mintData: {
              _maxQuantity: 5,  // Key name has to match argument name in the mint function!!
            }
          }))
    const moonpaySdk = window.MoonPayWebSdk.init({
        flow: 'nft',
        environment: 'sandbox',
        variant: 'overlay',
        metadata: metadata,
        params: {
          apiKey: 'pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE',
          contractAddress: '0x2B072BF5647f72f786Fd1aE213bcF7Af078fd513',          
          tokenId: '_0'
        }
    });

    const urlForSignature = moonpaySdk.generateUrlForSigning();
    console.log("url:---",urlForSignature)
    debugger
    // The URL for the signature should be sent to your backend, which should then
    // sign it with your API secret and return the signature.
    const response = await fetch("https://api-dev.vtail.com/api/moonpay/getSignature", {
        method: "POST",
        body: JSON.stringify({ urlForSignature }),
    });
    const data = await response.json();

    // // Once you have the signature, you can update the SDK with it and show the
    // // widget.
    moonpaySdk.updateSignature(data.signature);

    console.log(moonpaySdk);

    moonpaySdk.show();
    
}
