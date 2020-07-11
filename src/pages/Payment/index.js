import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { messageError, messageSuccess } from '../../components/toastr';
import logoImg from '../../assets/splash.png';

import axios from 'axios'
import './styles.css';
import LocalStorageService from '../../service/localStorageService';
import Participants from '../../components/participants';

class Payment extends React.Component {

    constructor() {
        super();
        this.user = LocalStorageService.getlocalStorage('_user');
    }

    state = {
        id: null,
        payment: '',
        status: 'PAID',
        participantsEvent: []
    }

    validar() {
        const msgs = [];

        if (!this.state.payment) {
            msgs.push('O campo Ingresso é Obrigatório.')
        }

        return msgs;
    }

    ticket = (id) => {

        axios.put(`https://pi-event-imepac-api.herokuapp.com/payments/${id}`, {
            status: this.state.status
        }).then(response => {
            this.props.history.push('/perfil')
            messageSuccess("Pamento Confirmado!..")
        }).catch(erro => {
            messageError('Pagamento não encontrado')
        })
    }

    componentDidMount() {
        const params = this.props.match.params;
        this.setState({ id: params.id })
        if (params.id) {

            axios.get(`https://pi-event-imepac-api.herokuapp.com/events/${params.id}/orders`)
                .then(response => {
                    this.setState({ participantsEvent: response.data })
                    console.log(this.state.participantsEvent);
                }).catch(erro => {
                    messageError(erro.data)
                })
        }
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="menu">
                        <div className="row">
                            <div className="col-md-10">
                                <img src={logoImg} alt="Event" />
                                <span className="user"> Usuário , {this.user.name} </span>
                            </div>
                            <div className="col-md-2">
                                <Link className="back" to="/profile">
                                    <FiArrowLeft size={20} color="#fff" />Home
                                    </Link>
                            </div>
                        </div>
                        <div className="col-md-12 aling-center">
                            <div className="card-header"><p>Será enviado um email, confirmando o pagamento do ingresso. Total de Ingressos com Intenção de Compra : {this.state.participantsEvent.length} </p></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <Participants participants={this.state.participantsEvent}
                                    ticket={this.ticket} />
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Payment;