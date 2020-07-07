import React from 'react';
export default props => {
    const rows = props.participants.map(participant => {
        return (
            <tr key={participant.ticketsId}>
                <td>{participant.ticketsId} </td>
                <td>{participant.nameUser} </td>
                <td>{participant.emailUser}</td>
                <td>{participant.phoneUser}</td>
                <td>{participant.status}</td>
                <td>{participant.price}</td>
                <td>
                    <button type="button" className="btn-success" onClick={e => props.ticket(participant.ticketsId)} >PAGAR</button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Ingresso</th>
                    <th scope="col">Comprador</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}