import React from 'react';

export default props => {


    const rows = props.eventos.map(event => {
        return (<>
            <div className="col-md-6">
                <div key={event.id} className="card bg-light">
                    <div className="card-header aling-center">{event.description}</div>
                    <div className="card-body">
                        <h4 className="card-title aling-center">{event.name}</h4>
                        <p><strong>Data Inicial : </strong> {event.initialData}  <strong> Preço : </strong> R$: {event.price} </p>
                        <p><strong> Data Final : </strong> {event.finalData}  <strong>    Evento : </strong> {event.type}</p>
                        <p><strong>Rua : </strong>  {event.address.street}</p>
                        <p><strong>Bairro : </strong> {event.address.neighborhooh} <strong> Complemento : </strong> {event.complement} </p>
                        <p><strong>CEP : </strong>  {event.address.cep}  <strong>Número : </strong> {event.address.number} </p>
                        <p><strong>Cidade : </strong>  {event.address.city.name}  <strong> Estado : </strong> {event.address.city.state.name} </p>
                    </div>
                    <button type="button" className="btn btn-success" onClick={e => props.updateTiket(event.id)} >Gerenciamento de Pagamentos</button>
                    <button type="button" className="btn btn-primary" onClick={e => props.updateEvent(event.id)} ><i className="pi pi-pencil"></i> Editar Evento</button>
                    <button type="button" className="btn btn-danger" onClick={e => props.deleteEvent(event.id)}><i className="pi pi-trash"></i> Deletar Evento</button>
                </div>
            </div>
        </>)
    })

    return (
        <div className="row">
            {rows}
        </div>
    )
}