const contractAddress = "0xaD68Bd42A6029BA459ab709f4187a7f2f478fB45";

const initializeTransfer = async () => {
    let user = Moralis.User.current();
    if (!user) {
        window.location.pathname = "/index.html";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("tokenIdInput").value = nftId;
}

const transfer = async () => {
    let tokenId = parseInt(document.getElementById("tokenIdInput").value);
    let address = document.getElementById("addressInput").value;
    let amount = parseInt(document.getElementById("amountInput").value);

    const options = {
        type: "erc1155",
        receiver: address,
        contract_address: contractAddress,
        token_id: tokenId,
        amount: amount
    }
    let result = await Moralis.transfer(options);
}

document.getElementById("submitTransfer").onclick = transfer;

initializeTransfer();