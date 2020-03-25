import React from 'react';


export default class Lista extends React.Component
{
    constructor(props){
        super(props);
        
        this.handleUserSelector = this.handleUserSelector.bind(this);
    }

    handleUserSelector(id,e){
        e.preventDefault();
        const { handleUserSelector } = this.props;
        handleUserSelector(id);
    }

    render(){
        const {userData} = this.props;

        return(
            <table className="table table-bordered table-striped table-responsive-lg mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(x => 
                        <tr key={x.id}>
                            <td>{x.name}</td>
                            <td><button className="btn btn-primary" onClick={this.handleUserSelector.bind(this, x.id)}>Editar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}