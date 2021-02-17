import React from 'react'
import Tbody from './Tbody'

export default function Table({children, onDelete, onPersist}) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                {children.map( ({day, description, value, _id}) => {
                    return (
                        <Tbody day={day} description={description} value={value} key={_id} _id={_id} onDelete={onDelete} onPersist={onPersist} />
                    )
                })}
            </tbody>
        </table>
    )
}
