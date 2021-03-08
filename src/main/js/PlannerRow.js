import * as Utils from "./utils";
import AuthService from "./services/auth.service";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React from "react";

const calculateSlot = (i, idx) => {
    return i * Utils.COLS + idx + 1;
}


export default function PlannerRow(props) {
    const { user } = props;

    return (
        <Row className='row'>
            <Button className='info-col' disabled variant='info'>
                {props.hour}
            </Button>{
            props.tRow.map((item, idx) =>
                <Button
                    key={idx}
                    className='time-item'
                    disabled={!user}
                    onClick={() => props.onClick(calculateSlot(props.id, idx))}
                >
                    {item ? item.subject.name + ' ' + item[props.dictionaries.dict1].name
                        + ' ' + item[props.dictionaries.dict2].name : '--'}
                </Button>
            )}
        </Row>
    );
}