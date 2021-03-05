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


  handleNavSelect(pid) {
    if (pid !== 4) {
      let dictBasic, dict1, dict2;
      switch (pid) {
        case 1:
          dictBasic = "group";
          dict1 = "teacher";
          dict2 = "room";
          break;
        case 2:
          dictBasic = "teacher";
          dict1 = "room";
          dict2 = "group";
          break;
        case 3:
          dictBasic = "room";
          dict1 = "group";
          dict2 = "teacher";
          break;
      }
      axios.get(`/api/${dictBasic}s`).then(res => {
        this.setState({
          isNavSelected: true,
          isItemSelected: false,
          isEditActive: false,
          version: pid,
          dictionaries: {dictBasic, dict1, dict2},
          itemDropdown: res.data._embedded[dictBasic + 's']
        });
      }).catch((error) => {
        console.log("axios error: " + error);
      });
    } else {
      this.logOut();
    }
  }

  handleSelect(selectedItem) {
    axios.get(`api/activities?ver=${this.state.version}&id=${selectedItem.id}`).then(res => {
      let timetable = Array(40).fill(undefined);
      res.data.forEach((item) => {
        timetable[item.slotId - 1] = item;
      })
      this.setState({
        isItemSelected: true,
        selectedItem: selectedItem,
        timetable: timetable,
      })
    });
  }

  handlePlanClick(slot) {

    axios.get(`api/activities/avaliable?ver=${this.state.version}&id=${this.state.selectedItem.id}&slot=${slot}`)
        .then(res => {
          const isOcc = !!res.data;
          this.setState({
            isSlotOccupied: isOcc,
            slotID: slot,
            editModel: res.data,
          })
        }).catch(err => console.log(err));
  }

  handleEditSubmit(id2, id3, idSub) {
    axios.post(`Edit/${this.state.version}`, {
      isOcc: this.state.isSlotOccupied,
      id1: this.state.itemID,
      id2: id2,
      id3: id3,
      subID: idSub,
      slotID: this.state.slotID,
    }).then(() => {
      this.setState({
        isNavSelected: true,
        isEditActive: false,
        isItemSelected: true,
      });
      this.handleSelect(this.state.itemID, this.state.itemName);
    }).catch((e) => console.log(e));
  }

  handleEditCancel() {
    this.setState({
      isNavSelected: true,
      isItemSelected: true,
      isEditActive: false,
    });
  }

  handleActDelete() {
    axios.post(`Delete/${this.state.version}`, {
      id: this.state.itemID,
      slotID: this.state.slotID,
    }).then(() => {
      this.setState({
        isNavSelected: true,
        isEditActive: false,
        isItemSelected: true,
      });
      this.handleSelect(this.state.itemID, this.state.itemName);
    }).catch((e) => console.log(e));
  }


  renderItemList() {
    return (
      this.state.isNavSelected && <ItemList
        isSelected={this.state.isItemSelected}
        name={this.state.selectedItem.name}
        prompt={this.state.dictionaries.dictBasic}
        itemDropdown={this.state.itemDropdown}
        onSelect={(selectedItem) => this.handleSelect(selectedItem)}
      />
    );
  }

  renderTimetable() {
    return(
      this.state.isItemSelected &&
        <Planner
            version={this.state.version}
            itemId={this.state.selectedItem.id}
            timetable={this.state.timetable}
            dictionaries={this.state.dictionaries}
            onClick={(slot) => this.handlePlanClick(slot)}
        />
    );
  }
  renderEditForm() {
    return (
      this.state.isEditActive ?
      <EditForm
              isOccupied={this.state.isSlotOccupied}
              dict={this.state.dictName}
              name={this.state.itemName}
              slot={this.state.slotID}
              pid={this.state.version}
              data={this.state.editModel}
              onSubmit={(id1, id2, ids) => this.handleEditSubmit(id1, id2, ids)}
              onCancel={() => this.handleEditCancel()}
              onDelete={() => this.handleActDelete()}
          /> : null
    )
  }

  render() {
    return (
      <>
        <NavMenu onSelect={(i) => this.handleNavSelect(i)}/>

        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={"/show-timetable"}>
              {this.renderItemList()}
              {this.renderTimetable()}
            </Route>
            <Route exact path={"/login"} component={Login} />
            <Route path={"/edit"} component={(props) =>
                <EditForm
                    {...props}
                    dicts={this.state.dictionaries}
                    item={this.state.selectedItem}
                    slot={this.state.slotID}
                    ver={this.state.version}
                    data={this.state.editModel}
                    onSubmit={(id1, id2, ids) => this.handleEditSubmit(id1, id2, ids)}
                    onCancel={() => this.handleEditCancel()}
                    onDelete={() => this.handleActDelete()}
                />}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default Timetable;