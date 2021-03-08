import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "./services/auth.header";

import * as Utils from './utils';
import "../resources/Timetable.scss";



export default function EditForm(props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [act, setAct] = useState(undefined);
    const [params, setParams] = useState({})
    const [dicts, setDicts] = useState({});

    const fetchAvailable = (ver, id, slot) => {
        axios.get(`../api/activities/available?ver=${ver}&id=${id}&slot=${slot}`)
            .then(res => {
                 setData(res.data);
                 setLoading(false);
            });
    }

    const checkIfOccupied = (ver, id, slot) => {
        axios.get(`../api/activities/${ver}?id=${id}&slot=${slot}`)
            .then(res => {
                setAct(res.data);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let group = {}, teacher = {}, room = {}, subject = {};
        switch (params.ver) {
            case 1:
                group.id = params.id;
                teacher.id = event.target['0'].value;
                room.id = event.target['1'].value;
                break;
            case 2:
                teacher.id = params.id;
                room.id = event.target['0'].value;
                group.id = event.target['1'].value;
                break;
            case 3:
                room.id = params.id;
                group.id = event.target['0'].value;
                teacher.id = event.target['1'].value;
                break;
        }
        subject.id = event.target['2'].value;
        const reqBody = {
            group: group,
            teacher: teacher,
            room: room,
            subject: subject,
            slotId: params.slot,
        };
        if (!act)
            axios.post("../api/activities", reqBody, { headers: authHeader() })
                .then(() => props.return(1))
        else {
            reqBody.id = act.id;
            axios.put("../api/activities", reqBody, { headers: authHeader() })
                .then(() => props.return(1))
        }
    }

    const handleDelete = (id) => {
        axios.delete(`../api/activities/${id}`, { headers: authHeader() })
            .then(() => props.return(1));
    }

    useEffect(() => {
        const { ver, id, slot } = props;
        setParams({ ver, id, slot });
        setDicts(Utils.getDicts(parseInt(ver)));
        fetchAvailable(ver, id, slot)
        checkIfOccupied(ver, id, slot);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='edit-prompt'>
                <h1>
                    Edit {dicts.dictBasic}: {props.name}
                </h1>
                <h2>
                    {Utils.Days[(params.slot - 1) % Utils.COLS]} {Utils.Hours[Math.floor((params.slot - 1) / Utils.COLS)]}
                </h2>
            </div>
            {act && <Button
                style={{marginLeft: 50}}
                variant='danger'
                onClick={() => handleDelete(act.id)}>Delete activity</Button>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group className='select-row'>
                    <Form.Label className='form-label'>Select {dicts.dict1}: </Form.Label>
                    <Form.Control
                        defaultValue={act && act[`${dicts.dict1}`].id} style={{width: 250}} placeholder="choose" as='select'>
                        {data[`${dicts.dict1}s`].map((item) =>
                            <option value={item.id}>{item.name}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group className='select-row'>
                    <Form.Label className='form-label'>Select {dicts.dict2}: </Form.Label>
                    <Form.Control
                        defaultValue={act && act[`${dicts.dict2}`].id} style={{width: 250}} placeholder="choose" as='select'>
                        {data[`${dicts.dict2}s`].map((item) =>
                            <option value={item.id}>{item.name}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group className='select-row'>
                    <Form.Label className='form-label'>Select subject: </Form.Label>
                    <Form.Control
                        defaultValue={act && act.subject.id} style={{width: 250}} placeholder="choose" as='select'>
                        {data.subjects.map((item) =>
                            <option value={item.id}>{item.name}</option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Button style={{marginLeft: 50}}type="submit">Submit</Button>
                    <Button
                        style={{marginLeft: 5}}
                        variant="outline-primary"
                        onClick={() => props.return(0)}
                    >Cancel
                    </Button>
            </Form>
        </>
    );
}

/*
let dict1, dict2;
    switch (props.pid) {
        case 1:
            dict1 = "Teacher";
            dict2 = "Room";
            break;
        case 2:
            dict1 = "Room";
            dict2 = "Group";
            break;
        case 3:
            dict1 = "Group";
            dict2 = "Teacher";
            break;
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(event.currentTarget['0'].value, event.currentTarget['1'].value, event.currentTarget['2'].value);
    }

    return (

    );

    import React, { useState, useEffect } from "react";
import axios from "axios";

import {COLS, Days, Hours} from './Constants';
import "../resources/Timetable.scss";

function getData(ver, id, slot) {
    return axios.get(`api/activities/${ver}?id=${id}&slot=${slot}`)
        .then(res => {
            return res.data;
        })
        .catch(e => {
            console.error(e);
        });
}

export default function EditForm(props) {
    const [act, setAct] = useState(undefined)

    const queryString = require('query-string');
    const { ver, id, slot } = queryString.parse(props.location.search);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(ver, id, slot);
            setAct(data);
        }

        fetchData();
        console.log(act);

    }, []);

    return (
        <>
            <div className='edit-prompt'>
                <h1>
                    {props.dicts.dictBasic}
                    Edit {props.dicts.dictBasic}: {act[props.dicts.dictBasic].name}
                </h1>
                <h2>
                    {Days[(act.slot - 1) % COLS]} {Hours[Math.floor((act.slot - 1) / COLS)]}
                </h2>
            </div>
        </>
    );
}
 */