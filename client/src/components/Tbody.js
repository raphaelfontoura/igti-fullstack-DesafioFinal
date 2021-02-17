import React from 'react'
import Action from './Action'

export default function Tbody({_id, day, description, value, onDelete, onPersist }) {

    const handleActionClick = (_id, type) => {
        if (type === 'delete') {
            onDelete(_id);
            return;
        }
        onPersist(_id);
    };

    return (
        <tr>
            <td>{day}</td>
            <td>{description}</td>
            <td>R$ {value.toFixed(2)}</td>
            <td>
                <Action
                    onActionClick={handleActionClick}
                    id={_id}
                    type='edit'
                />
                <Action 
                    onActionClick={handleActionClick}
                    id={_id}
                    type='delete'
                />
            </td>
        </tr>

    )
}
