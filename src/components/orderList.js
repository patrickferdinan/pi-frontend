import React from 'react';

export default props => {

    const rows = props.orders.map(order => {
        return (
            <tr key= { order.id}>
                <td>{order.id} </td>
                <td>{order.instant}</td>
                <td> R$: {order.valueTotal}</td>
                <td> {order.payment.status}</td>
                <td>Dados do evento enviado para seu E-mail...</td>
            </tr>
        )
    })
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Ingresso Nª</th>
                    <th scope="col">Data do Pedido</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col">Pagamento</th>
                    <th scope="col">Evento</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}