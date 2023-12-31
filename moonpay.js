async function helo() {

        console.log("hiiiiiiiiiii");
        // const metadata = encodeURIComponent(JSON.stringify({
        //   moonpayCollectionId: "48c1d2e0-cb31-4c6d-94e6-c74784ba3b7b",
        //   mintData: {
        //     _maxQuantity: 5,  // Key name has to match argument name in the mint function!!
        //   }
        // }))
    const moonpaySdk = window.MoonPayWebSdk.init({
        debug: true,
        flow: 'nft',
        environment: 'sandbox',
        variant: 'overlay',
        params: {
          apiKey: 'pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE',
          contractAddress: '0xc1Fb3E464cF39d9f0aCfB40831bee4E90b5637c7',          
          tokenId: '_0'
        }
    });

    const urlForSignature = moonpaySdk.generateUrlForSigning();
    console.log("url",urlForSignature)
    // The URL for the signature should be sent to your backend, which should then
    // sign it with your API secret and return the signature.
    const response = await fetch("https://buy-sandbox.moonpay.com/nft?apiKey=pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE/sign-url", {
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
