import React from "react";
import { Typography, Button } from "va-components";
import logo from "../logo.png";
import { useHistory } from "react-router-dom";

const LandingPage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <div style={{ marginTop: "25px" }} />
      <Typography.Title>
        Supporting your favorite artists with every listen.
      </Typography.Title>
      <Button
        type="primary"
        variant="large"
        onClick={() => {
          history.push("/beta");
        }}
      >
        Join Beta
      </Button>
    </>
  );
};
export default LandingPage;
