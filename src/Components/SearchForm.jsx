import React from 'react';

class SearchForm extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
        this.inputChange = this.inputChange.bind(this);
    }
    inputChange(event) {
        this.setState({value: event.target.value});
        this.props.inputChange(event.target.value);
    }


    render() {
        return(
            <form>
                <label>Логин пользователя
                    <br/>
                    <input type="text" name="name" value={this.state.value} onChange={this.inputChange}/>
                    <br/>
                </label>

                <label>
                   <input type="submit" name="submit" value="Найти" onClick={this.props.inputSubmit}/>
                    <br/>
                </label>
                <br/>


            </form>
        )
    }

}

export default SearchForm;