import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Days, Hours, COLS, ROWS} from './utils';
import "../resources/Timetable.scss";

import AuthService from './services/auth.service'

const calculateSlot = (i, idx) => {
    return i * COLS + idx + 1;
}


function PlannerRow(props) {
    const user = AuthService.getCurrentUser();

    return (
        <Row className='row'>
            <Button className='info-col' disabled variant='info'>
                {props.hour}
            </Button>{
            props.tRow.map((item, idx) =>
                    <LinkContainer
                        key={idx}
                        to={`/edit?ver=${props.version}&id=${props.itemId}&slot=${calculateSlot(props.id, idx)}`}
                    >
                        <Button
                            className='time-item'
                            disabled={!user}
                            onClick={() => props.onClick(idx)}>
                            {item ? item.subject.name + ' ' + item[props.dictionaries.dict1].name
                                + ' ' + item[props.dictionaries.dict2].name : '--'}
                        </Button>
                    </LinkContainer>
            )}
        </Row>
    );
}

function Planner(props) {
    let planner = [];
    for (let i = 0; i < ROWS; ++i) {
        planner.push(
            <PlannerRow
                id={i}
                key={i}
                version={props.version}
                itemId={props.itemId}
                tRow={props.timetable.slice(i * COLS, (i + 1) * COLS)}
                hour={Hours[i]}
                dictionaries={props.dictionaries}
                onClick={(idx) => props.onClick(i * COLS + idx + 1)}
            />);
    }

    return (
        <div className='planner'>
            <Row className='row'>
                <Button className='info-col' variant="info" disabled>time</Button>
                {Days.map((item, idx) =>
                    <Button key={idx} className='info-row' variant="info" disabled>
                        {item}
                    </Button>
                )}
            </Row>
            {planner}
        </div>
    )
}

export default Planner;