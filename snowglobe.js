import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

// 0. Import wagmi dependencies
const { mainnet } = WagmiCoreChains;
const {
  Address,
  configureChains,
  createConfig,
  getContract,
  getAccount,
  fetchBalance,
  readContract,
  erc721ABI,
} = WagmiCore;

// 1. Define chains
const chains = [mainnet];
const projectId = "2aca272d18deb10ff748260da5f78bfd";

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
console.log("publicClient:", publicClient);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: {
        appName: "AR Viewer Example",
      },
    }),
  ],
  publicClient,
});
console.log("wagmiConfig:", wagmiConfig);

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);

console.log("ethereumClient:", ethereumClient);
export const web3Modal = new Web3Modal(
  {
    projectId,
  },
  ethereumClient
);

//Connect to the wallet u
async function Reveal() {
  try {
    const account = getAccount();
    const connectedAccount = account.address;
    console.log("Account:", connectedAccount);
    const balance = await fetchBalance({
      address: connectedAccount,
    });
    console.log("balance:", balance);
    const contractAddress = "0x8E832f0890AfEB87f06F78B8d4B2D3a01c43bEFF"; // Replace this with the actual contract address
    const contractABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_royaltyReceiver",
            type: "address",
          },
          { internalType: "uint96", name: "_royaltyFraction", type: "uint96" },
          { internalType: "address", name: "initialOwner", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      { inputs: [], name: "AlreadyReservedTokens", type: "error" },
      { inputs: [], name: "ApprovalCallerNotOwnerNorApproved", type: "error" },
      { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
      { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
      {
        inputs: [
          { internalType: "uint256", name: "numerator", type: "uint256" },
          { internalType: "uint256", name: "denominator", type: "uint256" },
        ],
        name: "ERC2981InvalidDefaultRoyalty",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "receiver", type: "address" },
        ],
        name: "ERC2981InvalidDefaultRoyaltyReceiver",
        type: "error",
      },
      {
        inputs: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "numerator", type: "uint256" },
          { internalType: "uint256", name: "denominator", type: "uint256" },
        ],
        name: "ERC2981InvalidTokenRoyalty",
        type: "error",
      },
      {
        inputs: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "receiver", type: "address" },
        ],
        name: "ERC2981InvalidTokenRoyaltyReceiver",
        type: "error",
      },
      { inputs: [], name: "FunctionLocked", type: "error" },
      { inputs: [], name: "MintERC2309QuantityExceedsLimit", type: "error" },
      { inputs: [], name: "MintToZeroAddress", type: "error" },
      { inputs: [], name: "MintZeroQuantity", type: "error" },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
      {
        inputs: [],
        name: "OwnershipNotInitializedForExtraData",
        type: "error",
      },
      { inputs: [], name: "ProvenanceHashAlreadySet", type: "error" },
      { inputs: [], name: "TransferCallerNotOwnerNorApproved", type: "error" },
      { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
      {
        inputs: [],
        name: "TransferToNonERC721ReceiverImplementer",
        type: "error",
      },
      { inputs: [], name: "TransferToZeroAddress", type: "error" },
      { inputs: [], name: "URIQueryForNonexistentToken", type: "error" },
      { inputs: [], name: "WithdrawFailed", type: "error" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "fromTokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "toTokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "ConsecutiveTransfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          { indexed: false, internalType: "bool", name: "isUk", type: "bool" },
        ],
        name: "PUBLICMINT",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "RESERVED",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "SEC_RESERVED",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseExtension",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
        name: "functionLocked",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "isUk",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes4", name: "id", type: "bytes4" }],
        name: "lockFunction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "mintPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_time", type: "uint256" }],
        name: "mintTimeSetter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "mintingTime",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "numberMinted",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "operatorFilteringEnabled",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "provenanceHash",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "quantity", type: "uint256" },
          { internalType: "bool", name: "_isUk", type: "bool" },
        ],
        name: "publicMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "publicSaleStatus",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "reserve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "salePrice", type: "uint256" },
        ],
        name: "royaltyInfo",
        outputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "quantity", type: "uint256" },
        ],
        name: "secondaryReserve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "string", name: "_newBaseExtension", type: "string" },
        ],
        name: "setBaseExtension",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "string", name: "_newBaseURI", type: "string" },
        ],
        name: "setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "value", type: "bool" }],
        name: "setOperatorFilteringEnabled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
        name: "setPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "string", name: "_provenanceHash", type: "string" },
        ],
        name: "setProvenanceHash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "receiver", type: "address" },
          { internalType: "uint96", name: "royaltyFraction", type: "uint96" },
        ],
        name: "setRoyalties",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "_saleStatus", type: "bool" }],
        name: "setSaleStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const data = await readContract({
      address: contractAddress,
      functionName: "balanceOf",
      args: [connectedAccount],
      chainId: 1,
      abi: contractABI,
    });

    const DATA = Number(data); // or +data
    console.log("Balance:", DATA);

    if (DATA >= 1) {
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      //<!-- If the website is being viewed on a mobile device, include the model-viewer component and show the AR button -->
      if (isMobile) {
        // Get the height and width of the mobile screen
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        document.write(
          '<model-viewer ar="true"  ar-modes="scene-viewer webxr quick-look fallback"  style="width: 100%; height: 80vh;"  alt="3D model" src="./snowglobe.glb" camera-controls poster="snowglobe.png" shadow-intensity="1" exposure="1"></model-viewer>'
        );
      }
      // <!-- If the website is being viewed on a desktop, create a QR code generator and generate the QR code for the current URL -->
      if (!isMobile) {
        document.write(
          '<model-viewer style="width:100% !important;height:100%; !important" alt="3D model" src="./snowglobe.glb" ar="true"  ar-modes="scene-viewer webxr quick-look fallback" camera-controls poster="snowglobe.png" shadow-intensity="1" exposure="1"></model-viewer>'
        );

        var currentUrl = window.location.href;
        var qrCodeUrl =
          "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
          currentUrl;
        document.write(
          "<p>Your browser doesn't support AR functionality. Scan the QR code to view the 3D file in your space using the augmented reality of your mobile phone.</p>"
        );
        document.write(
          '<img src="' + qrCodeUrl + '" alt="QR code for ' + currentUrl + '" />'
        );
      }
    } else {
      alert("Only the holders of this NFT can see it in AR.");
    }
  } catch (error) {
    console.error("Error while connecting wallet or fetching balance:", error);
  }
}

// Call the connectWallet function when the user clicks a button or triggers the wallet connection
document.getElementById("web3").addEventListener("click", Reveal);
