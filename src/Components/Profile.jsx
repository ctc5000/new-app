import React from 'react';

const Profile = props=>{

    return(
        <div className="UserMiniCard ">
            <img src={props.UserMainInfo.avatar_url} alt="{this.state.userLi.login} "/>
            <ul className="FoloverCard">

                <li>Name: {props.UserMainInfo.login}</li>
                <li>Profile url : <a href={"https://github.com/" + props.UserMainInfo.login}
                                     target="blank">{props.UserMainInfo.login}</a></li>
                <li>Followers count : {props.UserMainInfo.followers}</li>
                <li>Id on git : {props.UserMainInfo.id}</li>
                <li>Company name : {props.UserMainInfo.company}</li>
                <li>Repo count : {props.UserMainInfo.public_repos}</li>
                <li>Created at : {props.UserMainInfo.created_at}</li>
            </ul>


        </div>
    )
};
export default Profile;