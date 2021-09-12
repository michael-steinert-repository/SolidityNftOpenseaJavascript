Moralis.Cloud.define("getNFT", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    let nftId = request.params.nftId;
    let hexadecimalId = parseInt(nftId).toString(16);
    let paddedId = ("0000000000000000000000000000000000000000000000000000000000000000" + hexadecimalId).slice(-64);
    logger.info(paddedId);

    return Moralis.Cloud.httpRequest({
        url: "https://alyl2bvgboyx.bigmoralis.com/" + paddedId + ".json"
    }).then((response) => {
        return response.text;
    }, (error) => {
        console.error(error.status);
    });
});