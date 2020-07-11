import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiSearch, FiLinkedin, FiGithub , FiSmartphone } from 'react-icons/fi';

import 'bootswatch/dist/flatly/bootstrap.css'

//https://codeseven.github.io/toastr/
//https://codeseven.github.io/toastr/demo.html
import { messageError, messageWarning } from '../../components/toastr'

import localStorageService from '../../service/localStorageService';
import './styles.css';

//https://github.com/axios/axios
import axios from 'axios'

import logoImg from '../../assets/splash.png';
import eventImg from '../../assets/event1.png';
import LocalStorageService from '../../service/localStorageService';
import EventList from '../../components/eventList';
import EventService from '../../service/eventService';

class Logon extends React.Component {

    state = {
        'email': '',
        'password': '',
        name: '',
        events: []
    }

    constructor() {
        super();
        this.service = new LocalStorageService()
        this.serviceEvent = new EventService();
    }

    login = () => {
        axios.post('https://pi-event-imepac-api.herokuapp.com/users/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            localStorageService.addItem('_user', response.data)
            this.props.history.push('/profile')
        }).catch(erro => {
            messageError(erro.response.data)
        })
    }

    findAllEvents = () => {

        const eventFilter = {
            name: this.state.name
        }

        this.serviceEvent.findAll(eventFilter).then(response => {
            this.setState({ events: response.data })
        })
    }

    orders = (id) => {
        messageWarning("Você não esta logado!.")
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
                        </form>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <a className="back-link" href="https://expo.io/artifacts/2a44bbb2-147e-407d-9be9-0df34dcd0068">
                                <FiSmartphone size={60} color="#7159c1" /> Download Mobile
                            </a>
                            <section className="form-aling">
                                <form>
                                    <input type="email" id="email1" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Digite seu email..." />
                                    <input type="password" id="password1" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Digite sua senha..." />

                                    <Link className="button" onClick={this.login}>Entrar</Link>

                                    <Link className="back-link" to="/register">
                                        <FiLogIn size={16} color="#7159c1" />
                                        Registrar
                                    </Link>
                                </form>
                            </section>
                        </div>
                        <div className="col-md-6">
                            <img src={eventImg} alt="event" />
                        </div>
                    </div>
                    <div>
                        <EventList eventos={this.state.events}
                            order={this.orders} />
                    </div>
                    <div>
                        <footer>
                            <span className="dev">Patrick Ferdinan</span>
                            <a className="back-link" href="https://www.linkedin.com/in/patrick-ferdinan-73136815a/">
                                <FiLinkedin size={20} color="#7159c1" />
                            </a>
                            <a className="back-link" href="https://github.com/patrickferdinan">
                                <FiGithub size={20} color="#7159c1" />
                            </a>
                            <span className="dev">|&nbsp;&nbsp; João Pedro</span>
                            <a className="back-link" href="https://www.linkedin.com/in/jo%C3%A3o-pedro-della-posta-b20ba0182/">
                                <FiLinkedin size={20} color="#7159c1" />
                            </a>

                            <span className="dev">|&nbsp;&nbsp; Talisson Rodrigues </span>
                            <a className="back-link" href="https://www.linkedin.com/in/talisson-rodrigues/" >
                                <FiLinkedin size={20} color="#7159c1" />
                            </a>
                            <a className="back-link" href="https://github.com/TalissonMelo">
                                <FiGithub size={20} color="#7159c1" />
                            </a>

                            <span className="dev">|&nbsp;&nbsp; Palmiro Rezende</span>
                            <a className="back-link" href="https://www.linkedin.com/in/palmirorezende/" >
                                <FiLinkedin size={20} color="#7159c1" />
                            </a>
                            <a className="back-link" href="https://github.com/palmirorezende">
                                <FiGithub size={20} color="#7159c1" />
                            </a>
                            <span className="dev">|&nbsp;&nbsp; Yuri Fernandes</span>

                            <span className="dev">|&nbsp;&nbsp; GitHub Ptojeto </span>
                            <a className="back-link" href="https://github.com/TalissonMelo/project-event-backend">
                                <FiGithub size={20} color="#7159c1" />
                            </a>
                            
                            <a className="back-link" href="https://github.com/patrickferdinan/pi-frontend">
                                <FiGithub size={20} color="#7159c1" />
                            </a>

                            <a className="back-link" href="https://github.com/patrickferdinan/pi-mobile">
                                <FiGithub size={20} color="#7159c1" />
                            </a>
                        </footer>
                    </div>
                </div>
            </>
        );
    }
}

export default Logon