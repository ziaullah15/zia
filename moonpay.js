function helo() {
    const moonpaySdk = window.MoonPayWebSdk.init({
        flow: 'buy',
        environment: 'sandbox',
        variant: 'overlay',
        params: {
          apiKey: 'pk_test_9l5tjCkdWZ66fgEOtLJ2wih6Zg3t4DeE',
          contractAddress: '0x28Aa3f5FF8C171dCF7E1F5aF03A8E1C1c3411c73',
          tokenId: '1'
        }
      });

      console.log("hiiiiiiiiiii")

      moonpaySdk.show()
}
