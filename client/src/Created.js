import * as React from 'react';
import {useState} from 'react';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {Timer} from "./compoments/Timer";


const Created = (props) => {

    const {
       link
    } = props

    const { t } = useTranslation();

   const myRefInputLink = React.createRef();
   const myRefPassword = React.createRef();
    const [activeHelp, setActiveHelp]= useState(false)
    const [activeShowPassword, setActiveShowPassword]= useState(false)

    const onActiveShowPassword =()=>{
        setActiveShowPassword(!activeShowPassword)
    }
    const onActiveHelp =()=>{
        setActiveHelp(!activeHelp)
    }
  const onInputSelect =(e)=>{
      e.target.select();
    }
    const onButtonSelect =()=>{
        myRefInputLink.current.select()
    }
    const onButtonSelectPassword =()=>{
        myRefPassword.current.select()
    }

    const Mailto = ({ email, subject, body, children }) => {
        return (
            <a className="small_button"  href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
        );
    };

    return (
        <div id="content">
            <div id="created_note" >
                <h1>{t("linkFinish")} <span onClick={onActiveHelp} id="created_note_help_toggle" className="help_button">?</span></h1>

                {activeHelp && <div id="created_note_help" className="help_block">
                    {t("helptext1")}
                    {link.password && <span id="created_note_with_pass_help" >
               {t("helptext2")}
            </span>}
                </div> }


                <div className="section group">
                    <label>
                        <input onFocus={onInputSelect} id="note_link_input" ref={myRefInputLink} autoFocus onClick={onInputSelect} value={link.link} type="text" readOnly=""/>
                        {!link.hour ?
                            <span id="info_read_once" className="caption ">
                  {t("info_read_once")}</span>
                            :
                            <span id="info_expires" className="caption ">
                 {t("info_expires")} <Timer sec={link.hour}/> </span>
                        }

                    </label>
                </div>

                <div className="section group">
                    <div className="col span_1_of_6">
                        <button onClick={onButtonSelect}  id="select_link" className="small_button">{t("select_link")}</button>
                    </div>
                    <div className="col span_1_of_6">
                        <Mailto email="" subject="" body={link.link}>
                            E-mail
                        </Mailto>

                    </div>

                    <div className="col span_2_of_6 right">
                        {/*only for P_READ_ONCE */}
                        { !link.hour ? <a  href={link.link} id="destroy_link" className="danger small_button" >{t("destroy_link")}</a> :
                            <a  href={link.link} id="show_link" className="small_button " >{t("show_link")}</a>
                        }

                    </div>
                </div>

                {/*only for manual password */}
                {link.password &&  <div id="note_password_block" >
                    <h3>{t("h3_2")}</h3>
                    <div className="section group">
                        <label>
                            {t("notePassword")}
                            <input ref={myRefPassword} id="note_password_input" type={activeShowPassword ? "text" : "password" } value={link.password} readOnly=""/>
                        </label>
                    </div>

                    <div className="section group">
                        <div className="col span_2_of_6">
                            {!activeShowPassword ? <button id="show_password" onClick={onActiveShowPassword}
                                                           className="small_button">{t("showPassword")}</button> :
                                <button onClick={onActiveShowPassword} id="hide_password"
                                        className="small_button">{t("hidePassword")}</button>
                            }
                        </div>
                        <div className="col span_2_of_6">
                            {activeShowPassword && <button onClick={onButtonSelectPassword} id="select_password" className="small_button ">Выделить пароль</button>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};


let mapStateToProps = (state) => {

    return {
        link: state.linkState.link
    }

}

export default connect(mapStateToProps,{}) (Created)