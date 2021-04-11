import * as cors from 'cors';
import * as express from 'express';

import { join } from 'path';

import * as NFTUtils from './utils/nftutils';

const PORT = Number(process.env.PORT || 3001);
let bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.json());

// Serve static resources from the "public" folder
app.use(express.static(join(__dirname, 'public')));

// ROUTES
app.post('/api/mint', async (req: any, res: any) => {
  // check that we have the required values
  console.log(req.body.tokenid, req.body.address)
  if (req.body.tokenid && req.body.address) {
    let result = await NFTUtils.mintNFT(req.body.tokenid, req.body.address);
    res.json(
      {
        result
      }
        );
  } else {
    res.json(
      {
        error: "expecting tokenid and address in parameters"
      }
    )
  }
})

// Serve the frontend client
app.get('*', (req: any, res: any) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
