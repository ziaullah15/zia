    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    //<!-- If the website is being viewed on a mobile device, include the model-viewer component and show the AR button -->    
      if (isMobile) {
        // Get the height and width of the mobile screen
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        document.write('<model-viewer ar="true"  ar-modes="scene-viewer webxr quick-look fallback"  style="width: 100%; height: 80vh;"  alt="3D model" src="./elmonx.glb" ios-src="./elmonx.usdz" camera-controls poster="elmonx.png" shadow-intensity="1" exposure="1"></model-viewer>');
     
      }
     // <!-- If the website is being viewed on a desktop, create a QR code generator and generate the QR code for the current URL -->
      if (!isMobile) {
        document.write('<model-viewer style="width:100% !important;height:100%; !important" alt="3D model" src="./elmonx.glb" ios-src="./elmonx.usdz" ar="true"  ar-modes="scene-viewer webxr quick-look fallback" camera-controls poster="elmonx.png" shadow-intensity="1" exposure="1"></model-viewer>');
      
       var currentUrl = window.location.href;
        var qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + currentUrl;
        document.write('<p>Your browser doesn\'t support AR functionality. Scan the QR code to view the 3D file in your space using the augmented reality of your mobile phone.</p>');
        document.write('<img src="' + qrCodeUrl + '" alt="QR code for ' + currentUrl + '" />');
      }
}

// Call the connectWallet function when the user clicks a button or triggers the wallet connection
document.getElementById("web3").addEventListener("click", Reveal);
