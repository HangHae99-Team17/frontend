import React from "react"
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { useDispatch } from "react-redux";
// import MyPage from "../pages/MyPage";
import LgMain from "../pages/LgMain";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Main from "../pages/Main";
import { actionCreators as userActions } from "../redux/modules/user";
import Detail from "../pages/Detail";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.loginCheckFB());
  }, []);

  return (
    <React.Fragment>
      <Grid>
      <ConnectedRouter history={history}>
          {/* <Route path="/mypage" exact component={MyPage} /> */}
          <Route path="/lgmain" exact component={LgMain} />
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/api/detail/:id" exact component={Detail} />
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
