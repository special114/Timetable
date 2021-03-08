import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import '../resources/Timetable.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from './services/auth.service';

import Home from './Home';
import EditForm from "./EditForm";
import Planner from "./Planner";
import NavMenu from "./NavMenu";
import ItemList from "./ItemList";
import Login from "./Login";


class Timetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      isNavSelected: false,
      isItemSelected: false,
      isEditActive: false,
      ifSlotOccupied: false,
      version: 0,
      dictionaries: {},
      itemDropdown: [],
      selectedItem: {},
      slotID: 0,
      timetable: Array(40).fill(undefined),
      editModel: {}
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      })
    }
  }

  logOut() {
    AuthService.logout();
    window.location.reload();
  }

  render() {
    return (
      <>
        <NavMenu onSelect={this.logOut}/>

        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={"/show-timetable/:ver"} render={(props) =>
              <Planner
                  {...props}
              />}
            />
            <Route exact path={"/login"} component={Login} />
          </Switch>
        </div>
      </>
    );
  }
}

export default Timetable;