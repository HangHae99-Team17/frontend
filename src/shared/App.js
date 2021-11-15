import React from "react"
import './App.css';
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import LgMain from "../pages/LgMain";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import EditUser from "../pages/EditUser";
import Detail from "../pages/Detail";
import SaleBox from "../pages/SaleBox";
import SaleList from "../pages/SaleList";
import SaleWrite from "../pages/SaleWrite";
import AdminSignup from "../pages/AdminSignup";
import Errpage from "./Errpage";
import Header from "../components/Header";
import InterestType from '../components/InterestType';
import CategoryDetail from '../pages/CategoryDetail';
import Main from '../pages/Main';
import Category from '../pages/Category';

function App() {
  return (
    <React.Fragment>
      <Grid>
      <ConnectedRouter history={history}>
      <Header></Header>
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/adminsignup" exact component={AdminSignup} />
        <Route path="/login" exact component={Login} />
        <Route path="/edituser" exact component={EditUser} />
        <Route path="/salelist" exact component={SaleList} />
        <Route path="/salewrite" exact component={SaleWrite} />
        <Route path="/salewrite/:id" exact component={SaleWrite} />
        <Route path="/salebox" exact component={SaleBox} />
        <Route path="/errpage" exact component={Errpage} />
        
        <Route path="/api/main" exact component={InterestType} />
        <Route path="/api/main/:type" exact component={LgMain} />
        <Route path="/api/categorydetail/:type" exact component={CategoryDetail} />
        
        
        <Route path="/api/detail/:id" exact component={Detail} />
        
        
        
        <Route path="/category" exact component={Category} />

        
        
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
