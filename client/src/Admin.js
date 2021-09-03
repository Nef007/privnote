import * as React from 'react';
import {connect} from "react-redux";
import {changeTextAria, deleteBD, getLinks, saveText} from "./redux/link-reducer";
import {useEffect, useState} from "react";
import {logout, reset} from "./redux/auth-reducer";
import 'moment/locale/ru';
import moment from 'moment';
import {Timer} from "./compoments/Timer";
import {Message} from "./compoments/Message";



const Admin = (props) => {

    const {
        getLinks, links, logout, reset, messageSave, deleteBD, changeTextAria, saveText, message
    } = props

    useEffect( () => {
        getLinks()
    },[getLinks])


    const [passwordValid, setPasswordValid] = useState(true)
    const [activePassword, setActivePassword] = useState(false)
    const [shortUpdate, setShortUpdate] = useState(false)

    const [form, setForm] = useState({
        password: "",
         confirm: ""
    })



    function onChangeForm (e)  {
        const {name, value} = e.target;

      if(name==="confirm"){
          if (value.length === 0) {
              setPasswordValid(true)
          }else    setPasswordValid(!value.length === 0 || value === form.password)
      }

        setForm({...form, [name]: value})
    }
    function onSubmit()  {
        if(form.password && form.confirm && form.password===form.confirm){
            reset(form)
        }

    }
    const onActivePassword = () =>{
        setActivePassword(!activePassword)
    }
    const onSaveTex= async (short, text) =>{
        setShortUpdate("")
        await saveText(short, text)
        setShortUpdate(short)
    }
       const onDeletebD= () =>{
           let isDelete  = window.confirm("Удалить все записи?");

           if(isDelete){
               deleteBD()
        }


    }

     let countActive = links.length ? links.filter(link=> link.status==="Активный" ): 0





    return(
        <div className="admin">
            <Message message={message} />

            <div>
                <button onClick={onActivePassword} className="button">Настройки</button>
                {/*<button onClick={onActivePassword} className="button mgl10">Настройки</button>*/}
                <button onClick={logout} className="button right">Выйти</button>
            </div>

            {activePassword &&  <div>
                База данных
                <button  onClick={onDeletebD}  className="primary_button center">Удалить все записи</button>
                Сменить пароль
                <label>
                    Пароль
                    <input  onChange={onChangeForm} value={form.password} name="password" type="text"/>
                </label>
                <label>
                    Повторить пароль
                    <input   onChange={onChangeForm} value={form.confirm} name="confirm" type="password"/>
                    {!passwordValid &&
                    <span className="error" >Пароли не совпадают.</span>}
                    {/*{messageError &&  <span className="error" >{messageError}</span>}*/}
                    {/*{messageSucces &&  <span className="caption weak " >{messageSucces}</span>}*/}
                </label>

                <button  onClick={onSubmit}  className="primary_button center">Изменить</button>

            </div>}
            <div>
                <span> Все({links.length}) </span>
                <span> Активные({countActive.length}) </span>
                <span> Удаленные({links.length-countActive.length}) </span>

            </div>

            {links.length ? links.map(link =>{


                return(
                    <div className="link">
                        <input type="text" value={link.link}/>
                        <div>Пароль: {link.password || "<пусто>"} </div>
                        <div>Таймер: {link.hour ?<> <Timer sec={link.hour}/><span>({moment(link.hour).format("HH:mm DD.MM.YYYY")})</span> </>:"-"}</div>
                        <div>Дата создания: {moment(link.date).format("HH:mm DD.MM.YYYY")}</div>
                       <div>Удалить после прочтения: {link.deletehour? "нет": "да"}</div>
                        <div>Статус: <span className={link.status==="Активный" ?"green" : "red"}>{link.status}</span> </div>
                        {link.email && <div>Email: {link.email } </div> }
                        {link.name && <div>Имя: {link.name } </div>}
                        <textarea onChange={e => changeTextAria(link.short, e.target.value)}  value={link.text}/>
                        {shortUpdate===link.short && <Message message={messageSave} /> }
                        <button onClick={event => onSaveTex(link.short, link.text)} className="button btn_admin" >Сохранить</button>
                    </div>


                )

            }
           ): <h1>Нет ссылок</h1> }
        </div>
    )
};

let mapStateToProps = (state) => {

    return {
        messageLinkError: state.linkState.messageLinkError,
        links: state.linkState.links,
        messageSave: state.linkState.messageSave,
        message: state.authState.message,
      //  messageSucces: state.authState.messageSucces

    }

}

export default connect(mapStateToProps,{getLinks, deleteBD, logout, reset, changeTextAria, saveText}) (Admin)