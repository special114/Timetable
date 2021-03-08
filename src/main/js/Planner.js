import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import * as Utils from './utils';
import "../resources/Timetable.scss";

import AuthService from "./services/auth.service";


import PlannerRow from './PlannerRow';
import ItemList from "./ItemList";
import EditForm from "./EditForm";
import axios from "axios";


class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            version: 0,
            user: undefined,
            dictionaries: {},
            itemDropdown: [],
            selectedItem: {},
            planner: [],
            showItemList: false,
            showTimetable: false,
            showEditForm: false,
        };
    }

    componentDidMount() {
        this.setInitialValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.version != this.props.match.params.ver) {
            this.setInitialValues();
        }
    }

    setInitialValues() {
        const ver = parseInt(this.props.match.params.ver);
        const dicts = Utils.getDicts(ver);
        const user = AuthService.getCurrentUser();

        axios.get(`/api/${dicts.dictBasic}s`).then(res => {
            this.setState({
                version: ver,
                user: user ? user : undefined,
                showItemList: true,
                showTimetable: false,
                dictionaries: dicts,
                itemDropdown: res.data._embedded[dicts.dictBasic + 's']
            });
        }).catch((error) => {
            console.log("axios error: " + error);
        });
    }

    createTimetable(selectedItem) {
        const { version, user, dictionaries } = this.state;
        axios.get(`../api/activities?ver=${version}&id=${selectedItem.id}`).then(res => {
            let timetable = Array(40).fill(undefined);
            res.data.forEach((item) => {
                timetable[item.slotId - 1] = item;
            })
            let planner = [];
            for (let i = 0; i < Utils.ROWS; ++i) {
                planner.push(
                    <PlannerRow
                        id={i}
                        key={i}
                        version={version}
                        user={user}
                        itemId={selectedItem.id}
                        tRow={timetable.slice(i * Utils.COLS, (i + 1) * Utils.COLS)}
                        hour={Utils.Hours[i]}
                        dictionaries={dictionaries}
                        onClick={(slot) => this.handlePlanClick(slot)}
                    />);
            }
            this.setState({
                showItemList: true,
                showTimetable: true,
                showEditForm: false,
                selectedItem: selectedItem,
                data: planner,
            });
        });
    }

    handlePlanClick(slot) {
        this.setState({
            slot: slot,
            showEditForm: true,
            showItemList: false,
            showTimetable: false,
        });
    }

    handleEditReturn(i) {
        if (i === 1) {
            this.createTimetable(this.state.selectedItem)
        } else {
            this.setState({
                showEditForm: false,
                showItemList: true,
                showTimetable: true,
            });
        }
    }

    render() {
        let { version, showItemList, showTimetable, showEditForm, data } = this.state;
        return (
            <div>
                {showItemList && <ItemList
                    isSelected={this.state.showTimetable}
                    name={this.state.selectedItem.name}
                    prompt={this.state.dictionaries.dictBasic}
                    itemDropdown={this.state.itemDropdown}
                    onSelect={(selectedItem) => this.createTimetable(selectedItem)}
                />}
                {showTimetable && <div className='planner'>
                    <Row className='row'>
                        <Button className='info-col' variant="info" disabled>time</Button>
                        {Utils.Days.map((item, idx) =>
                            <Button key={idx} className='info-row' variant="info" disabled>
                                {item}
                            </Button>
                        )}
                    </Row>
                    {data}
                </div>}
                {showEditForm && <EditForm
                    ver={version}
                    id={this.state.selectedItem.id}
                    name={this.state.selectedItem.name}
                    slot={this.state.slot}
                    return={(i) => this.handleEditReturn(i)}
                />}
            </div>
        )
    }


}

export default Planner;