import React from 'react';
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
            FendedUser: [],
        };
        this.inputChange = this.inputChange.bind(this);
        this.inputChangeSort = this.inputChangeSort.bind(this);
        this.inputSubmit = this.inputSubmit.bind(this);
        this.SortList = this.SortList.bind(this);
    }


    inputChangeSort(event) {
        var arSortChanges = [];
        this.state.users.filter(el => {
            if (el.login.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
                arSortChanges.push(el);
            return arSortChanges;
        });
        arSortChanges = arSortChanges.sort();
        this.setState({FendedUser: arSortChanges});
    }

    SortList() {

        var ArSorted = this.state.FendedUser;

        const SortConst = (a, b) => ((a.login.toLowerCase() < b.login.toLowerCase()) ? -1 : (a.login.toLowerCase() > b.login.toLowerCase()) ? 1 : 0);

        this.setState({FendedUser: ArSorted.sort(SortConst)});
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
                fetch(UserMainInfo.organizations_url).then(function (response) {
                    return response.json();
                }).then(OrgInfo => {
                })
            })
            .catch(error => console.error(error));

        fetch('https://api.github.com/users/' + this.state.value + "/followers")
            .then(function (response) {
                return response.json();
            })
            .then(users => {
                this.setState({users: users, FendedUser: users});

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
                fetch(userLi.organizations_url).then(function (response) {
                    return response.json();
                }).then(OrgInfo => {
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
                <div className={"UserWrap"}>

                    {
                        Object.keys(this.state.UserMainInfo).length > 0 &&
                        <Profile
                            UserMainInfo={this.state.UserMainInfo}
                        />
                    }

                    {
                        Object.keys(this.state.UserMainInfo).length > 0 &&
                        <FollowerList users={this.state.FendedUser} onClick={(e) => this.LiClick(e)}>
                            <p> Найти подписчиков<br/>
                                <input type="text" className={"sortField"} onChange={this.inputChangeSort}/>
                                <br/>
                                <button onClick={this.SortList}>Сортировать по алфавиту</button>
                            </p>
                        </FollowerList>
                    }


                </div>
                <div className={"UserWrap"}>
                    {
                        Object.keys(this.state.userLi).length > 0 &&

                        <Profile
                            UserMainInfo={this.state.userLi}
                        />
                    }
                </div>
            </div>
        )
    }
}


export default NameForm;
