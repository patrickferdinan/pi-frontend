import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiSearch } from 'react-icons/fi';
import AuthService from '../../service/authService'

import { messageError, messageSuccess } from '../../components/toastr';

import axios from 'axios'
import './styles.css';
import logoImg from '../../assets/splash.png';

const logout = () => {
    AuthService.removeUserAuthenticate();
}
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
                <div className="menu">
                    <img src={logoImg} alt="logon" />
                    <div className="col-md-12">
                        <form className="margin">
                            <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="form-control" id="nameFilter" placeholder="Digite o nome do Evento" />
                            <Link className="back-link" onClick={this.findAllEvents}>
                                <div className="link">
                                    <FiSearch size={16} color="#7159c1" />
                                </div>
                            </Link>
                            <Link className="teste" to="/" onClick={logout}>
                                <FiPower size={20} color="#fff" />
                            </Link>
                        </form>
                    </div>
                </div>
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-container">
                                <div className="card border-light aling-center">
                                    <div className="card-header"><p>Será enviado um email de confirmação para o pedido informado, confirmando o pagamento do ingresso.</p></div>
                                    <div className="card-body">
                                        <h4 className="card-title">Pagamento de Ingresso</h4>
                                         Digite o Número do Ingresso: 
                                        <input id="payment" className="ticket" value={this.state.payment} onChange={e => this.setState({ payment: e.target.value })} /><br/><br/>
                                        <button onClick={this.ticket} type="button" className="btn btn-success">Confirmar Pagamento</button>
                                        <button onClick={e => this.props.history.push('/profile')} type="button" className="btn btn-danger">Voltar Home</button>
                                    </div>
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