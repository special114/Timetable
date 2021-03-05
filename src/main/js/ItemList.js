import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function ItemList(props) {

    return (
        <div className="select-row">
            <p>Select {props.prompt}:</p>
            <Dropdown>
                <Dropdown.Toggle variant='success'>
                    {props.isSelected ? props.name : props.prompt}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {props.itemDropdown.map(item => (
                            <Dropdown.Item key={item._links.self.href}
                                           onSelect={() => props.onSelect(item)}>
                                {item.name}
                            </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default ItemList;