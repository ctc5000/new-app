import React from 'react';
import logo, {ReactComponent} from './logo.svg';
import './App.css';


export class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'AzGround',
            users: [],
            userLi: {},
            UserMainInfo: {},
        };
        this.inputChange = this.inputChange.bind(this);
        this.inputSubmit = this.inputSubmit.bind(this);
        this.TextAreaChange = this.TextAreaChange.bind(this);
    }

    TextAreaChange(event) {
        this.setState({value: event.target.value.toUpperCase()});


    }

    inputChange(event) {
        this.setState({value: event.target.value.toUpperCase()});
    }


    inputSubmit(event) {
        // alert('Sended name: ' + this.state.value);
        event.preventDefault();
        let options = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({})
        }


        fetch('https://api.github.com/users/' + this.state.value )
            .then(function (response) {
                return response.json();
            })
            .then(UserMainInfo => {
                this.setState({UserMainInfo});
                console.log(UserMainInfo);
                fetch(UserMainInfo.organizations_url).then(function (response) {
                    return response.json();
                }).then(OrgInfo => {
                    console.log(OrgInfo)
                })
                //this.setState({ Text: user.followers });
            })
            .catch(error => console.error(error));

        fetch('https://api.github.com/users/' + this.state.value + "/followers")
            .then(function (response) {
                return response.json();
            })
            .then(users => {
                this.setState({users});
                console.log(users);

                //this.setState({ Text: user.followers });
            })
            .catch(error => console.error(error));
    }

    LiClick(login) {
        // alert('Sended name: ' + this.state.value);
        let options = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({})
        }

        fetch('https://api.github.com/users/' + login)
            .then(function (response) {
                return response.json();
            })
            .then(userLi => {
                this.setState({userLi});
                console.log(userLi);
                console.log(userLi.organizations_url);
                fetch(userLi.organizations_url).then(function (response) {
                    return response.json();
                }).then(OrgInfo => {
                    console.log(OrgInfo)
                })
                //this.setState({ Text: user.followers });
            })
            .catch(error => console.error(error));
    }


    render() {

        return (
            <div className="FormGit">
                <form>
                    <label>Login
                        <br/>
                        <input type="text" name="name" value={this.state.value} onChange={this.inputChange}/>
                        <br/>
                    </label>

                    <label>GetFolowers
                        <br/>
                        <input type="submit" name="submit" value="Get Folowers" onClick={this.inputSubmit}/>
                        <br/>
                    </label>
                    <br/>




                </form>

                {
                    Object.keys(this.state.UserMainInfo).length > 0 &&
                    <div className="UserMiniCard ">
                        <img src={this.state.UserMainInfo.avatar_url} alt="{this.state.userLi.login} "/>
                        <ul className="FoloverCard">
                            <li>Name: {this.state.userLi.login}</li>
                            <li>Profile url : <a href={"https://github.com/" + this.state.UserMainInfo.login}
                                                target="blank">{this.state.UserMainInfo.login}</a></li>
                            <li>Followers count : {this.state.UserMainInfo.followers}</li>
                            <li>Id on git : {this.state.UserMainInfo.id}</li>
                            <li>Company name : {this.state.UserMainInfo.company}</li>
                            <li>Repo count : {this.state.UserMainInfo.public_repos}</li>
                            <li>Created at : {this.state.UserMainInfo.created_at}</li>
                        </ul>


                    </div>


                }


                {
                    this.state.users.length > 0 &&
                    <ul className="FollowersList">
                        <p className={"followers_list_title"}>Followers List</p>
                        {
                            this.state.users.map(el => {
                                return <li key={el.id} onClick={() => this.LiClick(el.login)}>{el.login}</li>
                            })
                        }
                    </ul>

                }

                {
                    Object.keys(this.state.userLi).length > 0 &&
                    <div className="FollowersInfo">
                        <img src={this.state.userLi.avatar_url} alt="{this.state.userLi.login} "/>
                        <div className="FoloverCard">
                            <p>Name: {this.state.userLi.login}</p>
                            <p>Profile url : <a href={"https://github.com/" + this.state.userLi.login}
                                                target="blank">{this.state.userLi.login}</a></p>
                            <p>Followers count : {this.state.userLi.followers}</p>
                            <p>Id on git : {this.state.userLi.id}</p>
                            <p>Company name : {this.state.userLi.company}</p>
                            <p>Repo count : {this.state.userLi.public_repos}</p>
                            <p>Created at : {this.state.userLi.created_at}</p>
                        </div>


                    </div>


                }
            </div>
        )
    }
}


function App() {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div>
                    <div id="button"></div>
                </div>
            </header>
        </div>
    );
}

export default App;
