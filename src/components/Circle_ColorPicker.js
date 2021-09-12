import React from "react";
import { CirclePicker } from "react-color";

const Circle_ColorPicker = (props) => {
  const color_selection = [
    "#D9E3F0",
    "#F47373",
    "#697689",
    "#37D67A",
    "#2CCCE4",
    "#555555",
    "#dce775",
    "#ff8a65",
    "#ba68c8",
  ];

  return (
    <CirclePicker
      width="100%"
      color={color_selection}
      onChange={(color) => {
        props.handleColorChange(color);
      }}
      //onChangeComplete={props.handleApplyColor}
    ></CirclePicker>
  );
};

export default Circle_ColorPicker;
