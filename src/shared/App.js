import React from "react"
import './App.css';
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import EditUser from "../pages/EditUser";
import Detail from "../pages/Detail";
import CouponFolder from "../pages/CouponFolder";
import SaleList from "../pages/SaleList";
import SaleWrite from "../pages/SaleWrite";
import AdminSignup from "../pages/AdminSignup";
import Errpage from "./Errpage";
import Header from "../components/Header";
import CategoryDetail from '../pages/CategoryDetail';
import Main from '../pages/Main';
import Category from '../pages/Category';
import LoginMain from '../pages/LoginMain';
import Useractive from "../pages/Useractive";
import SearchList from "../pages/SearchList";
import Filter from '../components/Filter';

import ReactGA from 'react-ga';

ReactGA.event({
  category: 'User',
  action: 'Created an Account'
});
ReactGA.exception({
  description: 'An error ocurred',
  fatal: true
});

function App() {
// 사용자가 어떤 페이지에 들어갔는지 추적
  React.useEffect(()=>{
    ReactGA.initialize("user id");
    history.listen((location) => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
  },[])

  return (
    <React.Fragment>
      <Grid>
      <ConnectedRouter history={history}>
      <Header></Header>
        <Route path="/loginmain" exact component={LoginMain}/>
        <Route path='/categorydetail/:type' exact component={CategoryDetail} />
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/adminsignup" exact component={AdminSignup} />
        <Route path="/login" exact component={Login} />
        <Route path="/edituser" exact component={EditUser} />
        <Route path="/salelist" exact component={SaleList} />
        <Route path="/salewrite" exact component={SaleWrite} />
        <Route path="/salewrite/:id" exact component={SaleWrite} />
        <Route path="/couponfolder" exact component={CouponFolder} />
        <Route path="/errpage" exact component={Errpage} />
        <Route path="/api/detail/:id" exact component={Detail} mode="rank"/>
        <Route path="/category" exact component={Category} />
        <Route path="/useractive" exact component={Useractive} />
        <Route path="/search" exact component={SearchList} /> 
        <Route path="/ranking/:type/:sortby/:isasc" exact component={Filter} /> 
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
