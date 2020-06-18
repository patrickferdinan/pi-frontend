import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import 'bootswatch/dist/flatly/bootstrap.css'

//https://codeseven.github.io/toastr/
//https://codeseven.github.io/toastr/demo.html
import { messageError, messageSuccess } from '../../components/toastr';

import axios from 'axios'

import logoImg from '../../assets/logo.png';
import SelectMenu from '../../components/selectMenu';

class Register extends React.Component {

    state = {
        'name': '',
        'email': '',
        'userType': '',
        'cpfCnpj': '',
        'phone': '',
        'password': '',
        'passwordConfirme': ''
    }

    validar() {
        const msgs = [];

        if (!this.state.name) {
            msgs.push('O campo Nome é Obrigatório.')
        }

        if (!this.state.email) {
            msgs.push('O campo Email é Obrigatório.')
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um Email válido.')
        }


        if (!this.state.userType) {
            msgs.push('O campo Tipo de usuário é Obrigatório.')
        }

        if (!this.state.cpfCnpj) {
            msgs.push('O campo CpfCnpj é Obrigatório.')
        } else if (!this.state.cpfCnpj.match(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/)) {
            msgs.push('Informe um CpfCnpj válido.')
        }

        if (!this.state.phone) {
            msgs.push('O campo Telefone é Obrigatório.')
        }

        if (!this.state.password || !this.state.passwordConfirme) {
            msgs.push('Digite as Senhas são Obrigatório.')
        } else if (this.state.password !== this.state.passwordConfirme) {
            msgs.push('As Senhas não são iguais...')
        }


        return msgs;
    }

    cadastrar = () => {

        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                messageError(msg);
            })

            return false;
        }

        axios.post('http://localhost:8080/users/', {
            name: this.state.name,
            email: this.state.email,
            userType: this.state.userType,
            cpfCnpj: this.state.cpfCnpj,
            phone: this.state.phone,
            password: this.state.password
        }).then(response => {

            this.props.history.push('/')
            messageSuccess("Usuário " + this.state.email + " cadastrado com sucesso.")

        }).catch(erro => {
            messageError("Todos os campos são Obrigatórios.")
        })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    render() {

        const userType = [
            { label: 'Selecione...', value: null },
            { label: 'Pessoa Física', value: 0 },
            { label: 'Pessoa Jurídica', value: 1 }
        ]

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="aling aling-center" >
                            <section>
                                <img src={logoImg} alt="event" />

                                <h1>Crie a sua Conta</h1>
                                <p>Registre-se e entre na sua plataforma de eventos.</p>

                                <Link className="link" to="/">
                                    <FiArrowLeft size={16} color="#333" className="center" />
                                    Voltar
                                </Link>
                            </section>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form className="form">
                            <div className="aling-center">
                            </div>
                            <input type="text" id="name1" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Digite seu nome completo..." />
                            <input type="email" id="email2" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="digite seu melhor e-mail..." />
                            <SelectMenu id="userType" className="button" lista={userType} name="userType" value={this.state.userType} onChange={this.handleChange} />
                            <input type="text" id="cpfCnpj" value={this.state.cpfCnpj} onChange={e => this.setState({ cpfCnpj: e.target.value })} placeholder="Cpf ou Cnpj  000.000.000-00" />
                            <input type="text" id="phone1" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} placeholder="Whatsapp (00) 0 0000-0000" />
                            <input type="password" id="password2" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Digite uma senha..." />
                            <input type="password" id="passwordConfirme" value={this.state.passwordConfirme} onChange={e => this.setState({ passwordConfirme: e.target.value })} placeholder="Confirme sua senha..." />
                            <Link className="button" onClick={this.cadastrar}>Registrar</Link>
                        </form>
                    </div>
                </div >
            </div>
        )
    }
}

export default Register