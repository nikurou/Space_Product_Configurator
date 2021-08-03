import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
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

  const handleColorChange = (color) => {
    setCurrentColor(color);
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
            <Typography className={classes.heading}>{props.name}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              props.currentColor
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <Circle_ColorPicker
            currentColor={currentColor}
            handleColorChange={handleColorChange}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordion_Dropdown;
