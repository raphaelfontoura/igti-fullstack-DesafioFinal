import React from 'react'

export default function InputFilter({onChange, value}) {

    const handleChange =  ({target}) => {
        onChange(target.value);
    };

    return (
        <div>
            <label htmlFor="filteredInput">Filtro da descrição</label>
            <input 
                key="filteredInput" 
                placeholder="Filtre pela descrição" 
                value={value}
                onChange={handleChange} 
            />
        </div>
    )
}
