import React from "react"
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import LgMain from "../pages/LgMain";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Detail from "../pages/Detail";
import Folders from "../pages/Folders";
import Category from "../pages/Category";
import SaleList from "../pages/SaleList";
import SaleWrite from "../pages/SaleWrite";
import Header from "../components/Header";
import  Categorys from "../components/Categorys"
import { actionCreators as userActions } from "../redux/modules/user";
import InterestType from '../components/InterestType';


function App() {
  

  return (
    <React.Fragment>
      <Grid>
      <ConnectedRouter history={history}>
      <Header></Header>
        <Route path="/api/main" exact component={InterestType} />
        <Route path="/api/main/:type" exact component={LgMain} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/folders" exact component={Folders} />
        <Route path="/api/category" exact component={Categorys} />
        <Route path="/api/detail/:id" exact component={Detail} />
        <Route path="/api/category/:type" exact component={Category}/>
        <Route path="/salelist" exact component={SaleList} />
        <Route path="/salewrite" exact component={SaleWrite} />
        <Route path="/salewrite/:id" exact component={SaleWrite} />
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
