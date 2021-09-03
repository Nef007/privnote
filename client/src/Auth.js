import * as React from 'react';
import {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {initializedApp, isEmptyAdmin, login} from "./redux/auth-reducer";
import {Message} from "./compoments/Message";


const Auth = (props) => {

    const {
        isAdmin, register, messageError, isEmptyAdmin, login, loading, message
    } = props


    const [formAuth, setFormAuth] = useState({
        email: "",
        password: ""
    })

    // useEffect( () => {
    //
    //     isEmptyAdmin()
    // },[])


    function onChangeForm(e) {
        const {name, value} = e.target;
        setFormAuth({...formAuth, [name]: value})
    }


// const onRegister=()=>{
//     register(formAuth)
// }

const onLogin=()=>{
    login(formAuth)
}

if(loading){
    return <h1>Загрузка</h1>
}
    return (
        <div className="admin">
        {/*{true ?*/}
                <div>
                    <h2 className="center">Авторизация</h2>
                    <Message message={message} />
                    <label>
                        Логин
                        <input onChange={onChangeForm} value={formAuth.login} name="email" type="text"/>
                    </label>
                    <label>
                        Пароль
                        <input onChange={onChangeForm} value={formAuth.password} name="password" type="password"/>
                    </label>
                    <button onClick={onLogin}  className="primary_button center">Войти</button>

            </div>
            {/*:*/}
            {/*    <div>*/}
            {/*        <h2 className="center">Регистрация</h2>*/}
            {/*        {messageError && <div id="error_note_is_empty" className="error_block ">*/}
            {/*            {messageError}*/}
            {/*        </div>}*/}
            {/*        <label>*/}
            {/*            Логин*/}
            {/*            <input onChange={onChangeForm} value={formAuth.login} name="email" type="text"/>*/}
            {/*        </label>*/}
            {/*        <label>*/}
            {/*            Пароль*/}
            {/*            <input onChange={onChangeForm} value={formAuth.password} name="password" type="password"/>*/}
            {/*        </label>*/}
            {/*        <button onClick={onRegister} className="primary_button center">Регистрация</button>*/}

            {/*</div>}*/}
        </div>


    )


};

let mapStateToProps = (state) => {
    return {
        isAdmin: state.authState.isAdmin,
        message: state.authState.message,
        loading: state.authState.loading,
        messageError: state.authState.messageError
    }
}
export default connect(mapStateToProps, { isEmptyAdmin, login, initializedApp})(Auth)