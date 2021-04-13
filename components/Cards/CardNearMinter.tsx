import React, { Fragment, useEffect, useReducer, useState } from 'react';
import 'regenerator-runtime/runtime'
import HeaderMinterStats from "../../components/Headers/HeaderMinterStats";
import getConfig from '../../lib/config/near';
//import { initContract } from '../lib/near_utils';
import { initContract, login, logout } from '../../lib/near_utils';

declare global {
    interface Window {
        walletConnection:any;
        nearInitPromise:any;
    }
}

declare var window: any;


const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const initNearPromise = () => {
    window.nearInitPromise = initContract()
    .then(() => {
      console.log(window.nearInitPromise)
    })
  }

export default function CardNearMinter() {
    const [walletConnected, setWalletConnection] = React.useState(false)
  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      
        walletConnected ? false : initNearPromise()

      // in this case, we only care to query the contract when signed in
      if (window.walletConnection?.isSignedIn()) {
          console.log('<--- Wallet Connected --->',window.accountId)
          
          //window.walletConnection.isSignedIn()
          setWalletConnection(true)

          window.contract.check_access({ account_id: window.accountId })
          .then(accessFromContract => {
            //    set_greeting(greetingFromContract)
                console.log('accessFromContract',accessFromContract)
             })
        // window.contract is set by initContract in index.js
        //window.contract.get_greeting({ account_id: window.accountId })
        //  .then(greetingFromContract => {
        //    set_greeting(greetingFromContract)
        //  })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )
  // if not signed in, return early with sign-in prompt
    return (
        !walletConnected ? <Fragment>
        <HeaderMinterStats contract={"Loading..."} ownercontract={"Loading..."} pinata={"Loading..."} />    
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
    
        <div className="w-full lg:w-12/12 px-4 py-6">
          
        <div className="relative flex flex-col min-w-0 break-words text-center w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 px-6 py-3">

        <h1 className="font-semibold text-lg">Welcome to NEAR NFT Minter!</h1>
        <p>
          To make use of the NEAR blockchain, you need to sign in. The button
          below will sign you in using NEAR Wallet.
        </p>
        <p>
          By default, when your app runs in "development" mode, it connects
          to a test network ("testnet") wallet. This works just like the main
          network ("mainnet") wallet, but the NEAR Tokens on testnet aren't
          convertible to other currencies – they're just for testing!
        </p>
        <p>
          Go ahead and click the button below to try it out:
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      
      </div>
      </div>
      </div>
      </div>
      </Fragment> :

    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <div className="px-4 md:px-10 mx-auto w-full -m-24">
    <div className="flex flex-wrap">
    <div className="w-full xl:w-4/12 lg:w-6/12 px-4">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">   
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
            {'greeting'}
          </label>
          {' '/* React trims whitespace around tags; insert literal space character when needed */}
          {typeof window !== 'undefined' && window.accountId}!
        </h1>
        </main>
        </div>
      </div>
      </div>
      </div>
    )

}