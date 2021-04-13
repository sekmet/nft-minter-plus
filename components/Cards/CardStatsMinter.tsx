import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function CardStatsMinter({
  statSubtitle,
  statTitle,
  statAddress,
  statDescription,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-xs text-indigo-500 mt-4">
            <span className="flex">
              <a href={`${statAddress}`}><i className="mr-2 fas fa-check"></i> {` ${statAddress}`.slice(0,33)}</a>...
            </span>
            <span className="whitespace-nowrap">{statDescription}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStatsMinter.defaultProps = {
  statSubtitle: "Contract Name",
  statTitle: "ERC1155Opensea",
  statAddress: "0x7c8eB0e7a63979Cd0cB9F2e0c39f4C642479EC8d",
  statDescription: "NFT contract name",
  statIconName: "far fa-doc",
  statIconColor: "bg-blue-500",
};

CardStatsMinter.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statAddress: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statDescription: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
