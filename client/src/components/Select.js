import React from 'react';
import Option from './Option'

export default function Select({ period, handleChange, allPeriods }) {

    return (
        <div className={"input-field"}>
            <label>Período
            <select className="browser-default" value={period} onChange={handleChange}>
                    <Option value="" disabled={true}>Escolha um período</Option>
                    {allPeriods.map(
                        (p) => {
                            return (<Option key={p} value={p}>{p}</Option>)
                        }
                    )};
            </select>
            </label>

        </div>
    )
}
