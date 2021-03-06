import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { messageError, messageSuccess } from '../../components/toastr'

import axios from 'axios'
import localStorageService from '../../service/localStorageService';
import './styles.css';
import logoImg from '../../assets/logo.png';
import SelectMenu from '../../components/selectMenu';

class NewEvent extends React.Component {

    state = {
        id: null,
        name: '',
        description: '',
        initialData: '',
        finalData: '',
        price: '',
        type: '',
        neighborhooh: '',
        complement: '',
        street: '',
        number: '',
        cep: '',
        participants: '',
        cidadeId: '',
        updateEvent: false
    }

    componentDidMount() {
        const params = this.props.match.params;
        this.setState({ id: params.id })
        if (params.id) {

            axios.get(`https://pi-event-imepac-api.herokuapp.com/events/${params.id}`)
                .then(response => {
                    this.setState({ ...response.data, updateEvent: true })
                }).catch(error => {
                    messageError(error.response.data)
                })
        }
    }

    update = () => {
        axios.put(`https://pi-event-imepac-api.herokuapp.com/events/${this.state.id}`, {
            name: this.state.name,
            description: this.state.description,
            initialData: this.state.initialData,
            finalData: this.state.finalData,
            price: this.state.price,
            type: this.state.type

        }).then(response => {

            const user = localStorageService.getlocalStorage('_user')
            var userId = user.id;
            axios.get(`https://pi-event-imepac-api.herokuapp.com/users/${userId}`).then(response => {
                localStorageService.addItem('_user', response.data);
            })

            this.props.history.push('/profile')
            messageSuccess('Evento Atualizado com sucesso...');
        }).catch(error => {
            console.log(error.response.data)
            messageError(error.response)
        })
    }

    validar() {
        const msgs = [];

        if (!this.state.name) {
            msgs.push('O campo Titulo é Obrigatório.')
        }

        if (!this.state.initialData) {
            msgs.push('O campo Data Inicial é Obrigatório.')
        }

        if (!this.state.finalData) {
            msgs.push('O campo Data Final é Obrigatório.')
        }

        if (!this.state.neighborhooh) {
            msgs.push('O campo Bairro é Obrigatório.')
        }

        if (!this.state.street) {
            msgs.push('Nome da Rua e Obrigatório.')
        }

        if (!this.state.type) {
            msgs.push('Tipo de evento é Obrigatório.')
        }

        if (!this.state.number) {
            msgs.push('Digite o número do estabelecimento.')
        }

        if (!this.state.cep) {
            msgs.push('Digite o CEP Obrigatório.')
        }

        if (!this.state.cidadeId) {
            msgs.push('Escolha uma cidade..')
        }

        if (!this.state.price) {
            msgs.push('Defina um Preço.')
        }

        return msgs;
    }

    saveEvent = () => {

        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                messageError(msg);
            })
            return false;
        }

        const user = localStorageService.getlocalStorage('_user')
        var userId = user.id;

        axios.post('https://pi-event-imepac-api.herokuapp.com/events/', {
            user: userId,
            name: this.state.name,
            description: this.state.description,
            initialData: this.state.initialData,
            finalData: this.state.finalData,
            price: this.state.price,
            type: this.state.type,
            neighborhooh: this.state.neighborhooh,
            complement: this.state.complement,
            street: this.state.street,
            number: this.state.number,
            cep: this.state.cep,
            participants: this.state.participants,
            cidadeId: this.state.cidadeId

        }).then(response => {

            axios.get(`https://pi-event-imepac-api.herokuapp.com/users/${userId}`).then(response => {
                localStorageService.addItem('_user', response.data);
            })

            this.props.history.push('/profile')
            messageSuccess("Evento : " + this.state.name + ", cadastrado com sucesso.")

        }).catch(erro => {
            messageError("Formatos dos campos errados.")
        })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    render() {

        const cidadeId = [
            { label: 'Cidade...', value: null },
            { label: 'Araguari', value: 1 },
            { label: 'Itumbiara', value: 2 }
        ]

        const type = [
            { label: 'Tipo de Evento...', value: null },
            { label: 'Público', value: 0 },
            { label: 'Privado', value: 1 }
        ]

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="new-event-container" >
                            <div className="content">
                                <section>
                                    <img src={logoImg} alt="event" />
                                    <h1>{this.state.updateEvent ? 'Atualizar Evento' : 'Cadastrar Evento'}</h1>
                                    <p>{this.state.updateEvent ? 'Atualizar evento na plataforma.' : 'Crie o seu evento na plataforma.'}</p>
                                    <Link className="back-link" to="/profile">
                                        <FiArrowLeft size={16} color="#333" />
                                        Voltar
                                    </Link>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form className="margin">
                            <h4 className="aling-center">{this.state.updateEvent ? 'Atualização De Evento' : 'Cadastro De Evento'} </h4>
                            <input type="text" name="name" value={this.state.name}
                                onChange={this.handleChange} placeholder="Titulo **" />

                            <textarea type="text" name="description" value={this.state.description}
                                onChange={this.handleChange} placeholder="Descrição" />

                            <div className="input-data">
                                <input type="text" name="initialData" value={this.state.initialData}
                                    onChange={this.handleChange} placeholder="00/00/0000 00:00:00 Data Inicial" style={{ width: 265 }} />

                                <input type="text" name="finalData" value={this.state.finalData}
                                    onChange={this.handleChange} placeholder="00/00/0000 00:00:00 Data Final" style={{ width: 265 }} />
                            </div>

                            <div className="input-group">
                                <input type="text" name="street" value={this.state.street}
                                    onChange={this.handleChange} placeholder="Rua **" style={{ width: 400 }} />

                                <input type="text" name="number" value={this.state.number}
                                    onChange={this.handleChange} placeholder="Numero **" style={{ width: 130 }} />
                            </div>

                            <div className="input-text">
                                <input type="text" name="neighborhooh" value={this.state.neighborhooh}
                                    onChange={this.handleChange} placeholder="Bairro **" style={{ width: 300 }} />

                                <input type="text" name="complement" value={this.state.complement}
                                    onChange={this.handleChange} placeholder="Complemento" style={{ width: 230 }} />
                            </div>

                            <input type="text" name="cep" value={this.state.cep}
                                onChange={this.handleChange} placeholder="Cep 00.000-000" />

                            <div className="select-group">
                                <div className="group">
                                    <SelectMenu className="button" lista={cidadeId} name="cidadeId"
                                        value={this.state.cidadeId} onChange={this.handleChange} style={{ width: 200 }} />

                                    <SelectMenu className="button" lista={type} name="type"
                                        value={this.state.type} onChange={this.handleChange} style={{ width: 200 }} />

                                    <input name="price" value={this.state.price}
                                        onChange={this.handleChange} placeholder="Preço* 00.00" style={{ width: 120 }} />
                                </div>
                            </div>

                            <textarea name="participants" value={this.state.participants}
                                onChange={this.handleChange} placeholder="Participantes, CPF separados por espaço." />

                            {
                                this.state.updateEvent ? (
                                    <Link className="button" onClick={this.update}>Atualizar Evento</Link>
                                ) : (
                                        <Link className="button" onClick={this.saveEvent}>Cadastrar Evento</Link>
                                    )
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewEvent