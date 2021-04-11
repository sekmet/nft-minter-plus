import axios from "axios";
import FormData from "form-data";
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig } = getConfig()

export const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey, fileToPin) => {
    if (
        typeof window === 'undefined' &&
        serverRuntimeConfig.saveErrorLogToDisk
      ) {
        const fs = require('fs')

        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        //we gather a local file from the API for this example, but you can gather the file from anywhere
        let data: any = new FormData();
        data.append('file', fs.createReadStream(fileToPin.path));
            return axios.post(url,
                    data,
                    {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary= ${data.boundary}`,
                            'pinata_api_key': pinataApiKey,
                            'pinata_secret_api_key': pinataSecretApiKey
                        }
                    }
                ).then(function (response) {
                    //handle response here
                    console.log(response)
                }).catch(function (error) {
                    //handle error here
                    console.error(error)
                });

        }
};