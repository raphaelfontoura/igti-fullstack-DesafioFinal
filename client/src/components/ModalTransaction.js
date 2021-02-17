import React, { useState, useEffect } from 'react';
import api from '../services/TransactionService';

/**
 * Utilização de 'react-modal'
 */
import Modal from 'react-modal';


/**
 * Exigido pelo componente Modal
 */
Modal.setAppElement('#root');


export default function ModalTransaction({ onSave, onClose, transaction, isUpdate }) {

    let { _id, description, value, category, type, yearMonthDay } = transaction;

    // Mensagem de erro
    const [errorMessage, setErrorMessage] = useState('');
    const [typeSelect, setTypeSelect] = useState("+");
    const [editTransaction, setEditTransaction] = useState(transaction);

    useEffect(() => {
        if (type !== undefined) {
            setTypeSelect(type);
        }
    }, [])
    /**
     * Evento para monitorar a tecla Esc, através de keydown
     */
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Eliminando evento
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    /**
     * Cercando a tecla "Esc"
     * e fechando a modal caso
     * seja digitada
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose(null);
        }
    };

    /**
     * Função para lidar com o envio
     * de dados do formulário. Devemos
     * prevenir o envio e tratar manualmente
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();

        try {
            const date = editTransaction.yearMonthDay.split('-');

            const formData = {
                ...editTransaction,
                _id,
                year: date[0],
                month: date[1],
                day: date[2],
                yearMonth: `${date[0]}-${date[1]}`,
                type: typeSelect,
            };

            if (isUpdate) {
                api.updateTransaction(formData).then(r => onSave(r.data));
            } else {
                api.createTransaction(formData).then(r => onSave(r.data));
            }
            onClose(false);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(""), 2000);
        }
    };

    /**
     * Lidando com o fechamento da modal
     */
    const handleModalClose = () => {
        onClose(null);
    };

    const handleInputDate = ({ target }) => {
        yearMonthDay = target.value;
        setEditTransaction({ ...editTransaction, yearMonthDay });
    }
    const handleDescription = ({ target }) => {
        description = target.value;
        setEditTransaction({ ...editTransaction, description });
    }
    const handleCategory = ({ target }) => {
        category = target.value;
        setEditTransaction({ ...editTransaction, category });
    }
    const handleInputValue = ({ target }) => {
        value = Number(target.value);
        setEditTransaction({ ...editTransaction, value });
    }
    const handleOptionType = ({ target }) => {
        type = target.value;
        setTypeSelect(target.value);
    }

    /**
     * JSX
     */
    return (
        <div>
            <Modal isOpen={true}>
                <div style={styles.flexRow}>
                    <span style={styles.title}>Manutenção de transação</span>
                    <button
                        className="waves-effect waves-lights btn red dark-4"
                        onClick={handleModalClose}
                    >
                        X
          </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div style={styles.flexOption}>
                        <p>
                            <label>
                                <input
                                    name="type"
                                    type="radio"
                                    checked={typeSelect === "+"}
                                    value="+"
                                    disabled={isUpdate}
                                    onChange={handleOptionType}
                                />
                                <span>Receita</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    name="type"
                                    type="radio"
                                    checked={typeSelect === "-"}
                                    value="-"
                                    disabled={isUpdate}
                                    onChange={handleOptionType}
                                />
                                <span>Despesa</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <input id="inputDescription" type="text" value={editTransaction.description} onChange={handleDescription} />
                        <label className="active" htmlFor="inputDescription">
                            Descrição:
            </label>
                    </div>

                    <div className="input-field">
                        <input id="inputCategory" type="text" value={editTransaction.category} onChange={handleCategory} />
                        <label className="active" htmlFor="inputCategory">
                            Categoria:
            </label>
                    </div>

                    <div className="input-field">
                        <input id="inputDate" type="date" value={editTransaction.yearMonthDay} onChange={handleInputDate}  />
                        <label className="active" htmlFor="inputDate">
                            Data:
            </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputValue"
                            type="number"
                            min="0"
                            step="0.01"
                            autoFocus
                            value={editTransaction.value}
                            onChange={handleInputValue}
                        />
                        <label className="active" htmlFor="inputValue">
                            Valor:
            </label>
                    </div>

                    <div style={styles.flexRow}>
                        <button
                            className="waves-effect waves-light btn"
                            disabled={errorMessage.trim() !== ''}
                            onClick={handleFormSubmit}
                        >
                            Salvar
            </button>
                        <span style={styles.errorMessage}>{errorMessage}</span>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },

    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },

    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
    },

    flexOption: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
};
