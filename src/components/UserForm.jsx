import React from 'react';

export default class UserForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            errors:{},
            ...this.state,
            ...props.updateUser
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleChanges({target}){
        const {name,value} = target;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        //Validating the form
        const {errors, ...formData} = this.state;
        const result = this.validate(formData);


        
        if(!Object.keys(result).length){
            
            const { createUser,  handleUpdateUser, updateUser } = this.props;

            if(updateUser.id){
                handleUpdateUser(updateUser.id,formData);
            }
            else{
                createUser(formData);
            }
        }
        else{
            this.setState({errors:result});
        }
    }

    validate(formData){
        const errors = {};

        if(!formData.name){
            errors.name = 'Debe ingresar un Nombre';
        }

        if(!formData.email){
            errors.email = 'Debe ingresar un Correo';
        }

        if(!formData.website){
            errors.website = 'Debe ingresar un Sitio Web';
        }

        return errors;
    }

    goBack(){
        const {goBack} = this.props;

        goBack();
    }

    render(){
        const {errors} = this.state;
        const {updateUser} = this.props;

        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="txtName">Nombre {errors.name && <span className="text-danger">{errors.name}</span>} </label>
                    <input type="text" defaultValue={updateUser.name} className="form-control" name="name" id="txtName" onChange={this.handleChanges} />
                </div>
                <div className="form-group">
                    <label htmlFor="txtMail">Correo {errors.email && <span className="text-danger">{errors.email}</span>} </label>
                    <input type="email" defaultValue={updateUser.email} className="form-control" name="email" id="txtMail" onChange={this.handleChanges} />
                </div>
                <div className="form-group">
                    <label htmlFor="txtWebsite">Sitio Web {errors.website && <span className="text-danger">{errors.website}</span>} </label>
                    <input type="text" defaultValue={updateUser.website} className="form-control" name="website"  id="txtWebsite" onChange={this.handleChanges} />
                </div>

                <button onClick={this.goBack} className="btn btn-secondary mr-3">Volver</button>
                <button type="submit" className={`btn btn-${updateUser.id === undefined ? 'success' : 'primary'}`}>{updateUser.id === undefined ? 'Agregar' : 'Modificar' } Usuario</button>
            </form>
        )
    }
}