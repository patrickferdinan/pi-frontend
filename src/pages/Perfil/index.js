import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import axios from 'axios'
import logoImg from '../../assets/splash.png';
import localStorageService from '../../service/localStorageService';
import EventProfile from '../../components/eventProfile';
import OrderList from '../../components/orderList';
import AuthService from '../../service/authService'
import { messageError, messageSuccess } from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const logout = () => {
    AuthService.removeUserAuthenticate();
}

class Perfil extends React.Component {

    constructor() {
        super();
        this.user = localStorageService.getlocalStorage('_user')
        this.events = localStorageService.getlocalStorage('_user')
        this.orders = localStorageService.getlocalStorage('_user')
    }

    state = {
        showConfirmDialog: false,
        eventDelete: ''
    }

    openDialog = (id) => {
        this.setState({ showConfirmDialog: true, eventDelete: id })
    }

    edit = (id) => {
        this.props.history.push(`/event/new/${id}`)
    }

    payment = (id) => {
        this.props.history.push(`/payment/${id}`)
    }

    cancelDelete = () => {
        this.setState({ showConfirmDialog: false })
    }

    delete = (id) => {
        axios.delete(`http://localhost:8080/events/${this.state.eventDelete}`).
            then(response => {

                const user = localStorageService.getlocalStorage('_user')
                var userId = user.id;
                console.log(userId);

                axios.get(`http://localhost:8080/users/${userId}`).then(response => {
                    localStorageService.addItem('_user', response.data);
                })
                this.props.history.push('/profile')
                messageSuccess("Evento Deletado com sucesso!.");
            }).catch(error => {
                messageError("Evento não pode ser Deletado. Persiste dados em outras tabelas.")
            })
    }

    render() {

        const confirmDialog = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.delete} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelDelete} className="p-button-secondary" />
            </div>
        )

        return (
            <>
                <div className="container-fluid">
                    <div className="menu">
                        <div className="row">
                            <div className="col-md-8">
                                <img src={logoImg} alt="Event" />
                                <span className="user"> Usuário , {this.user.name} </span>
                            </div>
                            <div className="col-md-2">
                                <Link className="back" to="/profile">
                                    <FiArrowLeft size={20} color="#fff" />Home
                            </Link>
                            </div>
                            <div className="col-md-2">
                                <Link className="back-link" to="/" onClick={logout}>
                                    <FiPower size={20} color="#fff" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Telefone</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-active">
                                            <th scope="row">{this.user.name}</th>
                                            <td>{this.user.email}</td>
                                            <td>{this.user.phone}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning">Editar</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <OrderList orders={this.orders.orders} />
                        </div>
                        <div>
                            <EventProfile eventos={this.events.events}
                                updateTiket={this.payment}
                                updateEvent={this.edit}
                                deleteEvent={this.openDialog} />
                            <br>
                            </br>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmar Deleção de Evento?"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialog}
                        modal={true} onHide={() => this.setState({ showConfirmDialog: false })}>
                        Realmente deseja deletar este evento...
                    </Dialog>
                </div>

            </>
        )
    }
}

export default Perfil