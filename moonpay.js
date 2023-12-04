function helo() {
    const moonpaySdk = window.MoonPayWebSdk.init({
        flow: 'nft',
        environment: 'sandbox',
        variant: 'overlay',
        params: {
          apiKey: 'pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE',
          contractAddress: '0xD28f604CE3152177B4265c902c29f6c69F11A7AB',
          tokenId: '1'
        }
      });

      console.log("hiiiiiiiiiii")

      moonpaySdk.show()
}
