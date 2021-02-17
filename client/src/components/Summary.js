import React from 'react'

export default function Summary({filteredTransactions}) {

    let size = filteredTransactions.length;

    let income = filteredTransactions
      .filter(({ type }) => type === '+')
      .reduce((acc, cur) => acc += cur.value, 0);
  
    let expense = filteredTransactions
      .filter(({ type }) => type === '-')
      .reduce((acc, cur) => acc += cur.value, 0);

    return (
        <div className="card">
            <label><h6 style={styles.title}>Sumário</h6></label>
            <ul style={styles.flexDiv}>
                <li>Laçamentos: {size}</li>
                <li>Receitas: R$ {income.toFixed(2)}</li>
                <li>Despesas: R$ {expense.toFixed(2)}</li>
                <li>Saldo: R$ {(income - expense).toFixed(2)} </li>
            </ul>
        </div>
    )
}

const styles = {
    flexDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',

    },
    title: {
        textAlign: 'center',
        paddingTop: '10px'
    }
}
