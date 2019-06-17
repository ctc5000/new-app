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
                <label>Login
                    <br/>
                    <input type="text" name="name" value={this.state.value} onChange={this.inputChange}/>
                    <br/>
                </label>

                <label>GetFolowers
                    <br/>
                   <input type="submit" name="submit" value="Get Folowers" onClick={this.props.inputSubmit}/>
                    <br/>
                </label>
                <br/>


            </form>
        )
    }

}

export default SearchForm;