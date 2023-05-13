import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "30px",
    minWidth: "50px",
    marginRight: "8px",
  },
  bar: {
    width: "5px",
    borderRadius: "5px",
    backgroundColor: "steelblue",
    transition: "height 0.3s ease",
  },
}));

function RandomBars() {
  const classes = useStyles();
  const [barHeights, setBarHeights] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBarHeights = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 10) + 10
      );
      setBarHeights(newBarHeights);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.container}>
      {barHeights.map((height, index) => (
        <div
          key={index}
          className={classes.bar}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

export default RandomBars;
