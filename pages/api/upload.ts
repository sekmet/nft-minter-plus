import axios from "axios";
import FormData from "form-data";
import path from "path";
//import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig
//const { serverRuntimeConfig } = getConfig()
// you might want to use regular 'fs' and not a promise one
import { createReadStream, writeFile } from 'fs'
//import dataUriToBuffer from 'data-uri-to-buffer'
//import { Readable } from 'stream'

// first we need to disable the default body parser
export const config = {
  api: {
    //bodyParser: false,
    sizeLimit: '30mb',
  }
};

export default async (req: any, res: any) => {

   // console.log(req.body.filepath)
    const pinataApiKey = "3242c7cac9e5f54604ad";
    const pinataSecretApiKey = "b0d766c1212258c6e363d8a1dfc39de9eff81fbb7261f45cfbebbe584be18775";
    //const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    var data_url = req.body.file;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');

    console.log(path.join(process.cwd(), '/public/media/') + 'file.jpg')
    
    writeFile( path.join(process.cwd(), '/public/media/') + 'file.jpg', buffer, function (err) {
        console.log('success');
    });

    //we gather a local file from the API for this example, but you can gather the file from anywhere
        let data: any = new FormData();
        data.append('file', createReadStream( path.join(process.cwd(), '/public/media/') + 'file.jpg' ) );
        return axios.post(url,
                data,
                {
                    maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large files
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${data.boundary}`,
                        'pinata_api_key': pinataApiKey,
                        'pinata_secret_api_key': pinataSecretApiKey
                    }
                }
            ).then(function (response) {
                //handle response here
                console.log(response.data)
            }).catch(function (error) {
                //handle error here
                console.error(error)
            });
    
  // contents is a string with the content of uploaded file, so you can read it or store
}