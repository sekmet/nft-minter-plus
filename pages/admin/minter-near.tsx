import React from "react";

// components

import CardNearMinter from "../../components/Cards/CardNearMinter";

// layout for page

import Admin from "../../layouts/Minter";

export default function Minter() {
  return (<CardNearMinter />);
}

Minter.layout = Admin;
