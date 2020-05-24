import React, { useEffect } from 'react';
//import MainUser from './module/business/core/main-user.user';
import Routing from './models/routes/app.routing';
import { BrowserRouter, Redirect } from 'react-router-dom';
import MenuUser from './module/business/components/menu/menu-user.business';
import { signInCheck } from './store/auth/auth.actions';
import { getIsSignIn } from './store/auth/auth.selectors';
import { connect } from 'react-redux';
import MainUser from './module/business/core/main-user.user';


interface DispatchProps {
  signInCheck: typeof signInCheck
}

interface StateProps {
  isSignIn: boolean
}

type Props = DispatchProps & StateProps;
const App: React.FC<Props> = (props) => {

  useEffect(() => {
    props.signInCheck();
  });


  return (
    <BrowserRouter>
      {
        props.isSignIn ?
          <React.Fragment>
            <Redirect to="/business" />
            <MainUser />
          </React.Fragment>
          :
          <Redirect to="/business/login" />}
      }

      <Routing />
    </BrowserRouter>
  );
}

const mapStateToProps = (state: any) => ({
  isSignIn: getIsSignIn(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  signInCheck: () => dispatch(signInCheck())
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);
