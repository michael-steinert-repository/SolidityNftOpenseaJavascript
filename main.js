const contractAddress = "0xaD68Bd42A6029BA459ab709f4187a7f2f478fB45";
const blockchainNetwork = "rinkeby";
const appId = "SlzjhbOLp2waV1d46ueS3SVxqJSY71bGmhaRbFgd";
const serverUrl = "https://alyl2bvgboyx.bigmoralis.com:2053/server";
Moralis.initialize(appId);
Moralis.serverURL = serverUrl;
let currentUser;

const fetchNftMetadata = (NFTs) => {
    let promises = [];
    for (let i = 0; i < NFTs.length; i++) {
        let nft = NFTs[i];
        let id = nft.token_id;
        promises.push(
            /* Calling Moralis Cloud Function which calls static Json File from Server */
            fetch(`${serverUrl}/functions/getNFT?_ApplicationId=${appId}&nftId=${id}`).then((response) => {
                return response.json();
            }).then((response) => {
                return JSON.parse(response.result);
            }).then((response) => {
                nft.metadata = response;
            }).then((response) => {
                const options = {
                    address: contractAddress,
                    token_id: id,
                    chain: blockchainNetwork
                };
                return Moralis.Web3API.token.getTokenIdOwners(options);
            }).then((response) => {
                nft.owners = [];
                response.result.forEach((element) => {
                    nft.owners.push(element.owner_of);
                });
                return nft;
            })
        );
    }
    /* Waiting until all Promises are resolved and then return it */
    return Promise.all(promises);
}

const createInventory = (NFTs, ownerData) => {
    const parent = document.getElementById("app");

    for (let i = 0; i < NFTs.length; i++) {
        let nft = NFTs[i];
        let htmlCard = `
        <div class="card">
            <img src="${nft.metadata.image}" class="card-img-top" alt="NFT">
            <div class="card-body">
                <h5 class="card-title">${nft.metadata.name}</h5>
                <p class="card-text">${nft.metadata.description}</p>
                <p class="card-text">Amount: ${nft.amount}</p>
                <p class="card-text">Number of Owners: ${nft.owners.length}</p>
                <p class="card-text">Your Balance: ${ownerData[nft.token_id]}</p>
                <a href="/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
                <a href="/transfer.html?nftId=${nft.token_id}" class="btn btn-primary">Transfer</a>
            </div>
        </div>
        `;

        let column = document.createElement("div");
        column.className = "col col-md-4";
        column.innerHTML = htmlCard;
        parent.appendChild(column);
    }
}

const fetchOwnerData = async () => {
    let accounts = currentUser.get("accounts");
    const options = {
        chain: blockchainNetwork,
        address: accounts[0],
        token_address: contractAddress
    };
    return Moralis.Web3API.account.getNFTsForContract(options).then((data) => {
        let result = data.result.reduce((object, currentElement)=> {
            object[currentElement.token_id] = currentElement.amount;
            return object;
        }, {});
        return result;
    });
}

const initializeApp = async () => {
    currentUser = Moralis.User.current();
    if (!currentUser) {
        currentUser = await Moralis.Web3.authenticate();
    }
    const options = {
        address: contractAddress,
        chain: blockchainNetwork
    };
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    let NFTsWithMetadata = await fetchNftMetadata(NFTs.result);
    let ownerData = await fetchOwnerData();
    createInventory(NFTsWithMetadata, ownerData);
}

initializeApp();