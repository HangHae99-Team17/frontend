import React from "react"
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { useDispatch } from "react-redux";
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
import { actionCreators as userActions } from "../redux/modules/user";


function App() {
  const dispatch = useDispatch();

  const is_session = sessionStorage.getItem("token") ? true : false;

  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
      <ConnectedRouter history={history}>
      <Header></Header>
        <Route path="/lgmain" exact component={LgMain} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/folders" exact component={Folders} />
        <Route path="/category" exact component={Category} />
        <Route path="/api/detail/:id" exact component={Detail} />
        <Route path="/salelist" exact component={SaleList} />
        <Route path="/salewrite" exact component={SaleWrite} />
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
