const contractAddress = "0xaD68Bd42A6029BA459ab709f4187a7f2f478fB45";
let web3;

const initializeMint = async () => {
    let user = Moralis.User.current();
    if (!user) {
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enable();
    let accounts = await web3.eth.getAccounts();

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("tokenIdInput").value = nftId;
    document.getElementById("addressInput").value = accounts[0];
    document.getElementById("amountInput").value = 1;
}

const mint = async () => {
    let tokenId = parseInt(document.getElementById("tokenIdInput").value);
    let address = document.getElementById("addressInput").value;
    let amount = parseInt(document.getElementById("amountInput").value);
    let accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    contract.methods.mint(address, tokenId, amount).send({
        from: accounts[0],
        value: 0
    }).on("receipt", (receipt) => {
        /* Event Receipt: Transaction was added to a Block */
        alert("Mint done");
    });
}

document.getElementById("submitMint").onclick = mint;

initializeMint();