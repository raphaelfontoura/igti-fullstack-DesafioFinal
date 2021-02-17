import React from 'react'

export default function Option({value, children, disabled}) {

    return (
        <option value={value}>{children}</option>
    );
}
