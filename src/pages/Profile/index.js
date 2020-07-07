import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiSearch, FiUser, FiPlus } from 'react-icons/fi';

import './styles.css';
import axios from 'axios'

import logoImg from '../../assets/splash.png';
import localStorageService from '../../service/localStorageService';
import EventList from '../../components/eventList';
import AuthService from '../../service/authService'
import EventService from '../../service/eventService';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { messageError, messageSuccess, messageWarning } from '../../components/toastr';

const logout = () => {
    AuthService.removeUserAuthenticate();
}

class Profile extends React.Component {

    user() {
        const emailUser = localStorageService.getlocalStorage('_user')
        return emailUser.name;
    }

    constructor() {
        super();
        this.service = new EventService();
    }

    state = {
        name: '',
        events: [],
        showConfirmDialog: false,
        tickets: {},
        amout: ''
    }

    openDialog = (ticket) => {
        this.setState({ showConfirmDialog: true, tickets: ticket })
    }

    findAllEvents = () => {

        const eventFilter = {
            name: this.state.name
        }

        this.service.findAll(eventFilter).then(response => {
            this.setState({ events: response.data })
        }).catch(error => {
            console.log(error.response)
        })
    }

    validar() {
        const msgs = [];

        if (!this.state.amout) {
            msgs.push('O campo Quantidade é Obrigatório.')
        }

        return msgs;
    }

    orders = () => {

        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                messageError(msg);
            })

            return false;
        }

        const user = localStorageService.getlocalStorage('_user')
        var userId = user.id;

        axios.post('http://localhost:8080/orders/', {

            user: userId,
            event: this.state.tickets.id,
            amout: this.state.amout

        }).then(response => {

            axios.get(`http://localhost:8080/users/${userId}`).then(response => {
                localStorageService.addItem('_user', response.data);
            })
            
            this.props.history.push('/profile')
            messageSuccess("Ingresso Adquirido..")
            this.setState({ showConfirmDialog: false });

        }).catch(erro => {
            messageWarning(erro.response.data.message)
            this.setState({ showConfirmDialog: false })
        })
    }

    cancelOrders = () => {
        this.setState({ showConfirmDialog: false })
    }

    render() {

        const confirmDialog = (
            <div className="btn-controll">
                <Button type="button" label="Confirmar" className="btn btn-success" icon="pi pi-check" onClick={this.orders} />
                <Button type="button" label="Cancelar" className="btn btn-danger" icon="pi pi-times" onClick={this.cancelOrders}  style={ {background: ''} } />
            </div>
        )

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
                <div className="body">
                    <ul>
                        <li><Link className="back-link" to="/perfil" >
                            <FiUser size={30} color="#7159c1" />Perfil
                        </Link></li>
                        <li><Link className="back-link" to="/event/new" >
                            <FiPlus size={30} color="#7159c1" />Novo evento
                        </Link></li>
                    </ul>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="profile-container">
                                <header className="intro">
                                <span className="bem-vindo">Bem vindo...</span> <span className="nome" >{this.user()}</span>
                                </header>
                            </div>
                        </div>
                    </div>
                    <EventList eventos={this.state.events}
                        order={this.openDialog} />
                    <br>
                    </br>
                </div >
                <div className="get-ticket">
                    <Dialog className="title aling-center" header="Adquirir Ingresso em Evento"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialog}
                        modal={true} onHide={() => this.setState({ showConfirmDialog: false })}>
                        <div className="card">
                            <h4 className="card-title aling-center">{this.state.tickets.name}</h4>
                            <p><strong>Data Inicial : </strong> {this.state.tickets.initialData} <strong> Data Final : </strong> {this.state.tickets.finalData}</p>
                            <div className="price"><strong> R$ : </strong><span> {this.state.tickets.price} </span></div>
                            <input id="amout" value={this.state.amout} onChange={e => this.setState({ amout: e.target.value })} placeholder="Quantidade" />
                            <h5 className="card-title aling-center" >Atenção</h5>
                            <p>Após clicar em confirmar e ocorrer tudo certo com a compra do ingresso. Será enviado um email para você com os dados do evento e quem você deve contatar para confirmar a compra.</p>
                            </div>
                    </Dialog>
                </div>

            </>
        )
    }
}

export default Profile 