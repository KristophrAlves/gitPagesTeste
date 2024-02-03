import React, { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Grid from "@mui/material/Grid";
import Building from "../../assets/images/bro.svg";
import Logo from "../../assets/images/logo_pontua_white.svg";
import { Button, Input } from "@mui/material";

const Signin = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [publicKey, setPublicKey] = useState();
  const [privateKey, setPrivateKey] = useState();

  const setKeys = () => {
    localStorage.setItem("publicKey", publicKey);
    localStorage.setItem("privateKey", privateKey);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 setCurrentStep={setCurrentStep} />;
      case 2:
        return <Step2 setCurrentStep={setCurrentStep} />;
      case 3:
        return <Step3 setCurrentStep={setCurrentStep} />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  const styles = {
    root: {
      maxWidth: '1366px',
      margin: '0 auto',
      width: '100%'
    },
    logoContainer: {
      paddingTop: "3.063rem"
    },
    buildingContainer: {
      paddingTop: "2.625rem",
      paddingLeft: "3.625rem"
    },
    buildingImage: {
      paddingLeft: -10
    },
  };

  return (
    <Grid spacing={3} style={styles.root}>
      <Grid item xs={12} style={styles.logoContainer}>
        <img src={Logo} alt="Logo Pontua" style={{ maxWidth: "100%" }} />
      </Grid>

      <Grid item container xs={12} style={styles.buildingContainer}>
        <Grid item xs={6} style={styles.buildingImage}>
          <img src={Building} alt="Predio" />
        </Grid>

        <Grid item xs={6} style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>

          {renderStep()}

        </Grid>
      </Grid>

      <Grid style={{
        width: '20%',
        margin: 12,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'white',
      }}>
        <Grid>
          <Input placeholder="publicKey" onChange={(e) => setPublicKey(e.target.value)}></Input>
          <Input placeholder="privateKey" onChange={(e) => setPrivateKey(e.target.value)}></Input>
        </Grid>
        <Button onClick={() => setKeys()}>
          Enviar
        </Button>
      </Grid>

    </Grid >
  );
};

export default Signin;
