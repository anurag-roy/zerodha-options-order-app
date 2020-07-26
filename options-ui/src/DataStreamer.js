import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const ENDPOINT = "http://127.0.0.1:5000";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 14,
  },
});

const DataStreamer = () => {
  const [niftyPrice, setNiftyPrice] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromKiteTicker", (data) => {
      const response = JSON.parse(data);
      setNiftyPrice(response.last_price);
    });
  }, []);

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center" spacing={5}>
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                NIFTY 50 Live Price
              </Typography>
              <Typography variant="h5" component="h2">
                {niftyPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DataStreamer;
