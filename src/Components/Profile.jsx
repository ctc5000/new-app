import React from 'react';

const Profile = props => {

    return (
        <div className="UserMiniCard ">
            <img src={props.UserMainInfo.avatar_url} alt="{this.state.userLi.login} "/>
            <ul className="FoloverCard">

                <li>Логин: {props.UserMainInfo.login}</li>
                <li>Ссылка на пользователя : <a href={"https://github.com/" + props.UserMainInfo.login}
                                                target="blank">{props.UserMainInfo.login}</a></li>
                <li>Подписчиков : {props.UserMainInfo.followers}</li>
                <li>Id на гите : {props.UserMainInfo.id}</li>
                <li>Название компании : {props.UserMainInfo.company ? props.UserMainInfo.company : 'Не указано'} </li>
                <li>Репозиториев : {props.UserMainInfo.public_repos} </li>
                <li>Профиль создан : {props.UserMainInfo.created_at}</li>
            </ul>


        </div>
    )
};
export default Profile;