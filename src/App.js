// Core Functions
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SwapHoriz } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Map from "./components/Map";
import Permalink from "./components/Permalink";

import "./App.scss";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    "& > .MuiGrid-item": {
      borderLeft: "1px solid lightgray",
      borderRight: "1px solid lightgray",
    },
  },
  button: {
    position: "absolute !important",
    inset: "25px 0 0 ",
    bottom: "unset",
    width: 50,
    margin: "auto !important",
    zIndex: 1000,
  },
  mapLeft: { position: "relative" },
  mapRight: { position: "relative" },
}));

function App() {
  const classes = useStyles();
  const mapLeft = useSelector((state) => state.mapLeft);
  const mapRight = useSelector((state) => state.mapRight);
  const [swap, setSwap] = useState(false);

  return (
    <>
      <IconButton
        className={classes.button}
        onClick={() => {
          setSwap(!swap);
        }}
      >
        <SwapHoriz />
      </IconButton>
      <Grid
        container
        direction={swap ? "row-reverse" : "row"}
        className={classes.container}
      >
        <Grid item xs={6} className={classes.mapLeft}>
          <Map permalinkParam="left" map={mapLeft} />
        </Grid>
        <Grid item xs={6} className={classes.mapRight}>
          <Map permalinkParam="right" map={mapRight} />
        </Grid>
      </Grid>
      <Permalink map={mapLeft} />
    </>
  );
}

export default App;
