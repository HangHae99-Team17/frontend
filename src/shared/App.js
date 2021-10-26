import React from "react"
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { useDispatch } from "react-redux";
import MyPage from "../pages/MyPage";

function App() {


  React.useEffect(() => {
    
  }, []);

  return (
    <React.Fragment>
      <Grid>
      <ConnectedRouter history={history}>
          <Route path="/mypage" exact component={MyPage} />
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
