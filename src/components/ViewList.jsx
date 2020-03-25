import React from 'react';
import Cabecera from './Cabecera';
import Lista from './Lista';


export default class ViewList extends React.Component
{

    render(){
        const {userData, handleUserSelector, handleNewUser} = this.props;

        return(
            <div>
                <Cabecera 
                    handleNewUser={ handleNewUser } 
                />

                <Lista 
                    handleUserSelector={ handleUserSelector }
                    userData={ userData }
                />
            </div>
        )
    }
}