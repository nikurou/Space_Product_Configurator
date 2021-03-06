import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import Circle_ColorPicker from "./Circle_ColorPicker";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 20,
    marginRight: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  icon_description: {
    display: "flex",
    flexDirection: "row",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    display: "flex",
    justifyContent: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
}));

const Accordion_Dropdown = (props) => {
  const classes = useStyles();
  const [currentColor, setCurrentColor] = useState("#fff");

  // A helper function to set color hook
  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  // Change the color of the 3D object anytime a color is changed.
  useEffect(() => {
    applyCurrColorToObject();
  }, [currentColor]);

  //  Function to actually apply current color to the 3D Object
  //  at specified Mesh (props.mesh_name)
  const applyCurrColorToObject = () => {
    //Allows you to wait for the data of props.meshArray to be loaded in
    // and not crash if it's not in yet.
    if (props.meshArray != null) {
      const found = props.meshArray.find((obj) => obj.name === props.mesh_name);
      found.color.set(`${currentColor.hex}`);
    }
  };

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{
            backgroundColor: currentColor.hex,
            overflow: "hidden",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          <div className={`${classes.column} ${classes.icon_description}`}>
            <SportsEsportsIcon />
            <Typography className={classes.heading}>
              {props.mesh_name}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {currentColor.hex}
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <Circle_ColorPicker
            currentColor={currentColor}
            handleColorChange={handleColorChange}
            //handleApplyColor={applyCurrColorToObject}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordion_Dropdown;
