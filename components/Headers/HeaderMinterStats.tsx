import React from "react";

// components

import CardMinterStats from "../../components/Cards/CardStatsMinter";

export default function HeaderStats({contract, ownercontract, pinata}) {
  //console.log(contract)
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardMinterStats
                  statSubtitle="Contract Name"
                  statTitle={contract[0]}
                  statAddress={contract[1]}
                  statDescription=""
                  statIconName="fa fa-certificate"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardMinterStats
                  statSubtitle="PINATA GATEWAY"
                  statTitle="CONNECTED"
                  statAddress={pinata}
                  statDescription=""
                  statIconName="fa fa-hdd"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardMinterStats
                  statSubtitle="MINTER API SERVER"
                  statTitle="Minter Server"
                  statAddress="http://localhost:3001"
                  statDescription=""
                  statIconName="fas fa-image"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardMinterStats
                  statSubtitle="INFURA CONNECTION"
                  statTitle="RINKEBY"
                  statDescription=""
                  statIconName="fa fa-th"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
