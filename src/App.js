import React from 'react';
import logo, {ReactComponent} from './logo.svg';
import './App.css';
import SearchForm from "./Components/SearchForm";
import Profile from "./Components/Profile";
import FollowerList from "./Components/FollowerList";

export class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'AzGround',
            users: [],
            userLi: {},
            UserMainInfo: {},
            FindedUser: [],
        };
        this.inputChange = this.inputChange.bind(this);
        this.inputChangeSort = this.inputChangeSort.bind(this);
        this.inputSubmit = this.inputSubmit.bind(this);
    }


    inputChangeSort(event) {
        console.log(event.target.value);

        var arSortChanges = [];
        this.state.users.filter(el => {
            if ( el.login.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
                arSortChanges.push(el);
        });
        this.setState({FindedUser:arSortChanges});
    }

    inputChange(value) {
        this.setState({value})
    }


    inputSubmit(event) {
        event.preventDefault();


        fetch('https://api.github.com/users/' + this.state.value)
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
            })
            .catch(error => console.error(error));

        fetch('https://api.github.com/users/' + this.state.value + "/followers")
            .then(function (response) {
                return response.json();
            })
            .then(users => {
                this.setState({users, FindedUser:users});
                console.log(users);

            })
            .catch(error => console.error(error));
    }

    LiClick(login) {
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
            })
            .catch(error => console.error(error));
    }


    render() {

        return (
            <div className="FormGit">

                <SearchForm
                    value={this.state.value}
                    inputChange={(e) => this.inputChange(e)}
                    inputSubmit={(e) => this.inputSubmit(e)}
                />


                {
                    Object.keys(this.state.UserMainInfo).length > 0 &&
                    <Profile
                        UserMainInfo={this.state.UserMainInfo}
                    />
                }
                {
                    this.state.FindedUser.length > 0 &&
                    <FollowerList users={this.state.FindedUser} onClick={(e) => this.LiClick(e)}>
                        <p> Find follower<br/>
                            <input type="text" className={"sortField"} onChange={this.inputChangeSort}/>
                        </p>
                    </FollowerList>
                }

                {
                    Object.keys(this.state.userLi).length > 0 &&

                    <Profile
                        UserMainInfo={this.state.userLi}
                    />
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
