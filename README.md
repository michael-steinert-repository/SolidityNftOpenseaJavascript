## ERC1155 Metadata
* The URI Value allows for ID Substitution by Clients
* If the String {id} exists in any URI, Clients must replace this with the actual Token ID in hexadecimal Form
* This allows for a large Number of Tokens to use the same on-chain String by defining a URI once, for that large Number of Tokens

* The String Format of the substituted hexadecimal ID must be lowercase alphanumeric: [0-9a-f] with no 0x prefix
* The String Format of the substituted hexadecimal ID must be leading zero padded to 64 hex characters length if necessary
* Example of a URI: https://token-cdn-domain/{id}.json would be replaced with https://token-cdn-domain/000000000000000000000000000000000000000000000000000000000004cce0.json if the Client is referring to Token ID 314592/0x4CCE0

## Opensea Metadata
* OpenSea supports Metadata that is structured according to the official ERC721 Metadata Standard
```json
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
  "external_url": "https://openseacreatures.io/3",
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  "name": "Dave Starbelly",
  "attributes": [ ... ],
}
```
|Property|Description|
|---|---|
|image|This is the URL to the Image of the Item. It can be just about any type of Image, and can be IPFS URLs or paths. Recommend are 350 x 350 Images|
|image_data|Raw SVG Image Data, if you want to generate images on the fly (not recommended). Only use this if you're not including the image parameter|
|external_url|This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site|
|description|A human readable description of the item. Markdown is supported|
|name|Name of the item|
|attributes|These are the attributes for the item, which will show up on the OpenSea page for the item. (see below)|
|background_color|Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #|
|animation_url|A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.|
|youtube_url|A URL to a YouTube video|

