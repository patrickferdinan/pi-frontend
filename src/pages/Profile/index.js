import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';
import axios from 'axios'

import logoImg from '../../assets/logo.png';
import localStorageService from '../../service/localStorageService';
import EventList from '../../components/eventList';
import AuthService from '../../service/authService'
import EventService from '../../service/eventService';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { messageError, messageSuccess } from '../../components/toastr';

const logout = () => {
    AuthService.removeUserAuthenticate();
}

class Profile extends React.Component {

    user() {
        const emailUser = localStorageService.getlocalStorage('_user')
        return emailUser.email;
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
        }).catch(erro => {
            console.log(erro.response)
        })
    }

    cancelOrders = () => {
        this.setState({ showConfirmDialog: false })
    }

    render() {

        const confirmDialog = (
            <div>
                <Button label="Confirmar" className="btn-pesquisa" icon="pi pi-check" onClick={this.orders} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelOrders} className="p-button-secondary" />
            </div>
        )

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="profile-container">
                                <header>
                                    <img src={logoImg} alt="Event" />
                                    <span>Bem vindo... {this.user()} </span>
                                </header>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <header>
                                <Link className="button space" to="/perfil">Perfil</Link>
                            </header>
                        </div>
                        <div className="col-md-3">
                            <header>
                                <Link className="button space" to="/event/new">Registrar novo evento</Link>
                            </header>
                        </div>
                        <div className="col-md-1">
                            <div className="profile-container">
                                <header>
                                    <button type="button">
                                        <Link className="" to="/" onClick={logout}>
                                            <FiPower size={18} color="#7159c1" />
                                        </Link>
                                    </button>
                                </header>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form className="margin">
                                <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="form-control" id="nameFilter" placeholder="Digite o nome do Evento" />
                                <button type="button" className="button" onClick={this.findAllEvents}>Pesquisar</button>
                            </form>
                        </div>
                    </div>
                    <EventList eventos={this.state.events}
                        order={this.openDialog} />
                    <br>
                    </br>
                </div >
                <div>
                    <Dialog header="Adquirir Ingresso em Evento"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialog}
                        modal={true} onHide={() => this.setState({ showConfirmDialog: false })}>
                        <h4 className="card-title aling-center">{this.state.tickets.name}</h4>
                        <p><strong>Data Inicial : </strong> {this.state.tickets.initialData} <strong> Data Final : </strong> {this.state.tickets.finalData}</p>
                        <h5><strong> Preço : </strong> R$: {this.state.tickets.price},00 </h5>
                        <input id="amout" value={this.state.amout} onChange={e => this.setState({ amout: e.target.value })} placeholder="Quantidade" />
                        <h5 className="card-title aling-center" >Atenção</h5>
                        <p>Após clicar em confirmar e ocorrer tudo certo com a compra do ingresso. Será enviado um email para você com os dados do evento e quem você deve contatar para confirmar a compra.</p>
                    </Dialog>
                </div>

            </>
        )
    }
}

export default Profile