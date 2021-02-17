import React, { useState, useEffect } from 'react';
import M from 'materialize-css'
import api from './services/TransactionService';
import Select from './components/Select';
import Table from './components/Table';
import Summary from './components/Summary';
import InputFilter from './components/InputFilter';
import ModalTransaction from './components/ModalTransaction';
import { periodNow } from './helpers/DateHelper';


export default function App() {

  const [transactions, setTransactions] = useState([]);
  const [period, setPeriod] = useState("2021-02");
  const [periods, setPeriods] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState();
  const [editFilter, setEditFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchPeriods = async () => {
      const result = await api.getAllPeriods();
      setPeriods(result.data.periods);
      setPeriod(periodNow());
    };
    fetchPeriods();
    M.AutoInit();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setEditFilter("");
      try {
        const result = await api.getPeriod(period);
        setTransactions(result);
        setFilteredTransactions(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTransactions();
  }, [period]);

  useEffect(() => {
    const result = transactions.filter(({ description }) => {
      return description.toLowerCase().includes(editFilter)
    });
    setFilteredTransactions(result);

  }, [transactions, editFilter]);

  const handleSelectChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleInputChange = (descriptionFilter) => {
    setEditFilter(descriptionFilter.toLowerCase());

  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setSelectedTransaction({});
  };

  const handlePersistData = async (data) => {
    let newTransactions = [];
    if (!isUpdate) {
      newTransactions = [...transactions, data];
      setTransactions(newTransactions);
    }
    if (isUpdate) {
      handleModalClose();
      newTransactions = transactions.filter(t => t._id !== data._id);
      newTransactions = [...newTransactions, data];
      console.log(newTransactions);
      console.log(editFilter);
      setTransactions(newTransactions);
    }
  }

  const handleEditData = async (id) => {
    setSelectedTransaction(filteredTransactions.find(t => t._id === id));
    setIsUpdate(true);
    setIsModalOpen(true);
    // setEditFilter("");
  }

  const handleDeleteData = async (id) => {
    const result = await api.deleteTransaction(id);
    if (result.status === 204) {
      // setEditFilter("");
      let newTransactions = transactions.filter(t => t._id !== id);
      setTransactions(newTransactions);
    }
  }

  const handleButtonClick = async () => {
    // setEditFilter("");
    setIsModalOpen(true);
  }


  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp Full Stack </h1>
      <Select period={period} handleChange={handleSelectChange} allPeriods={periods} />
      {filteredTransactions && <Summary filteredTransactions={filteredTransactions} />}

      <div style={styles.flexRow}>
        <InputFilter style={styles.input} onChange={handleInputChange} value={editFilter} />
        <button style={styles.button} onClick={handleButtonClick} className="btn">Novo lançamento</button>
      </div>

      {/* table */}
      {filteredTransactions && <Table onDelete={handleDeleteData} onPersist={handleEditData}>{filteredTransactions.sort( (a,b) => a.day - b.day)}</Table>}

      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleModalClose}
          transaction={selectedTransaction}
          isUpdate={isUpdate}
        />
      )}

    </div>

  )
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    size: 'auto'
  },
  button: {
    flexGrow: 1,
  },
}
