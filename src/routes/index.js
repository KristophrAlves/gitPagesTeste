import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Box from "@mui/material/Box";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Signin from "../pages/Signin/index";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "../components/Menu";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return signed ? <Menu><Item /></Menu> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/perfil/:id" element={<Private Item={Perfil} />} />
          <Route path="/" element={<Signin />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
