import React from 'react';


export default class Cabecera extends React.Component
{
    constructor(props){
        super(props);

        this.handleNewUser = this.handleNewUser.bind(this)
    }

    handleNewUser(e){
        e.preventDefault();
        
        const {handleNewUser} = this.props;
        handleNewUser();
    }

    render(){
        
        
        return(
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand">Usuarios</span>
                <form className="form-inline">
                    <button onClick={this.handleNewUser} className="btn btn-success my-2 my-sm-0" type="submit">Nuevo usuario</button>
                </form>
            </nav>
        )
    }
}