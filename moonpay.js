function helo() {
    const moonpaySdk = window.MoonPayWebSdk.init({
        flow: 'nft',
        environment: 'sandbox',
        variant: 'overlay',
        params: {
          apiKey: 'pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE',
          contractAddress: '0xc1Fb3E464cF39d9f0aCfB40831bee4E90b5637c7',
          tokenId: '1'
        }
      });

      console.log("hiiiiiiiiiii")

      moonpaySdk.show()
}
