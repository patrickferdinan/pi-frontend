import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { messageError, messageSuccess } from '../../components/toastr';

import axios from 'axios'
import './styles.css';

class Payment extends React.Component {

    state = {
        payment: '',
        status: 'PAID'
    }

    validar() {
        const msgs = [];

        if (!this.state.payment) {
            msgs.push('O campo Ingresso é Obrigatório.')
        }

        return msgs;
    }
    
    ticket = () => {

        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                messageError(msg);
            })

            return false;
        }

        axios.put(`http://localhost:8080/payments/${this.state.payment}`, {
            status: this.state.status
        }).then(response => {
            this.props.history.push('/profile')
            messageSuccess("Pamento Confirmado!..")
        }).catch(erro => {
           messageError('Pagamento não encontrado')
        })
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-container">
                                <div className="card border-light aling-center">
                                    <div className="card-header">Será enviado um email de confirmação para o pedido informado, confirmando o pagamento do ingresso.</div>
                                    <div className="card-body">
                                        <h4 className="card-title form-control button">Pagamento De Ingresso</h4>
                                        <input id="payment" className="form-control button" value={this.state.payment} onChange={e => this.setState({ payment: e.target.value })} placeholder="Digite o Número do Ingresso..." />
                                        <button onClick={this.ticket} type="button" className="btn btn-success">Confirmar Pagamento</button>
                                        <button onClick={e => this.props.history.push('/profile')} type="button" className="btn btn-danger">Voltar Home</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Payment;