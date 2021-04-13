import React from "react";

// components

import CardMinter from "../../components/Cards/CardMinter";

// layout for page

import Admin from "../../layouts/Minter";

export default function Minter() {
  return (<CardMinter />);
}

Minter.layout = Admin;
