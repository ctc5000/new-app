import React from 'react';

class FollowerList extends React.Component {
    render() {
        return (
            <ul className="FollowersList">
                <p className={"followers_list_title"}>Followers List</p>
                {this.props.children}
                {
                    this.props.users.map(el => {
                     return <li key={el.id} onClick={() => this.props.onClick(el.login)}>{el.login}</li>
                     })
                }
            </ul>
        );
    }
}

export default FollowerList;
