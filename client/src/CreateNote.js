import * as React from 'react';
import {useState} from 'react';
import {connect} from "react-redux";
import {createLinks} from "./redux/link-reducer";
import {useTranslation} from "react-i18next";



 const CreateNote = ({createLinks}) => {

     const { t } = useTranslation();
    const [activeHelp, setActiveHelp] = useState(false)
    const [activeOption, setActiveOption] = useState(false)
    const [state, setState] = useState({
        level_password: 0,
        emailValid: true,
        nameValid: false,
        textValid: false,
        passwordValid: true,
        stateValid: false

    })
    const [form, setForm] = useState({
        text: "",
        hour: 0,
        confirm: false,
        password: "",
        confirm_password: "",
        email: "",
        name: "",

    })




    const onActiveHelp = () => {
        setActiveHelp(!activeHelp)
    }
    const onActiveOption = () => {
        setActiveOption(!activeOption)
    }


   function onChangeForm (e)  {
        const {target} = e;
        const {name} = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let emailValid = state.emailValid
        let level_password = state.level_password
        let passwordValid = state.passwordValid
        let nameValid = state.nameValid


        switch (target.name) {
            case 'email':
                emailValid = value.length === 0 ? true : !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;

            case 'name':
                nameValid = value.length > 8
                break;
            case 'confirm_password':
                if (value.length === 0) {
                    passwordValid = true
                }else passwordValid = !value.length === 0 || value === form.password
                break;
            case 'password':
                if (value.length === 0) {
                    level_password = 0
                }
                if (value.length > 0 && value.length <= 3) {
                    level_password = 1
                }
                if (value.length > 3) {
                    level_password = 2
                }
                if (value.length >= 5) {
                    level_password = 3
                }
                if (value.length >= 7) {
                    level_password = 4
                }
                if (value.length >= 9) {
                    level_password = 5
                }
                break;
            default:
                break;
        }

        setForm({...form, [name]: value})
        setState({...state, emailValid, level_password, passwordValid, nameValid})


    }


    const onSubmit = (e) => {

        if (!form.text.length) {

            setState({...state,textValid: true})
        }

        if(form.text.length && state.passwordValid && state.emailValid ){
           console.log(form)
            createLinks(form)

        }
    }

    return (
        <div id="content">
            <div id="new_note">
                <div>
                    <h1>{t("h1Name")} <span onClick={onActiveHelp} id="new_note_help_toggle"
                                            className="help_button">?</span></h1>
                </div>
                {activeHelp && <div id="new_note_help" className="section help_block">
                    {t("text1")}<br/>
                    {t("text2")}<br/>
                    {t("text3")}<br/>
                    {t("text4")}.<br/>

                    <p> {t("text5")}</p>

                    {t("text6")} <a href="/info/about">{t("text7")}</a>.
                </div>}

                <textarea onChange={onChangeForm} id="note_raw" name="text" rows="4" value={form.text}
                          placeholder={t("placeholder")}/>
                {activeOption && <div id="advanced_options">
                    <h3>{t("h3_1")}</h3>
                    <div className="section group">

                        <div className="col span_3_of_6">
                            <label>
                                <select onChange={onChangeForm} value={form.hour} id="duration_hours"
                                        name="hour">
                                    <option value="0">{t("deleteData1")}</option>
                                    <option value="1">{t("deleteData2")}</option>
                                    <option value="24">{t("deleteData3")}</option>
                                    <option value="168">{t("deleteData4")}</option>
                                    <option value="720">{t("deleteData5")}</option>
                                </select>
                            </label>
                        </div>

                        <div className="col span_3_of_6" id="confirmation_option">
                            <label className="checkbox">
                                <input onChange={onChangeForm} type="checkbox" checked={form.confirm} name="confirm"
                                       id="destroy_without_confirmation"/>{t("confirm")}
                            </label>
                        </div>


                    </div>

                    <h3>{t("h3_2")}</h3>
                    <div className="section group">

                        <div className="col span_3_of_6">
                            <label>
                                {t("entePassword")}
                                <input onChange={onChangeForm} id="manual_password" value={form.password}
                                       name="password"
                                       type="password"/>
                                {state.level_password === 1 &&
                                <span id="very_weak_manual_password" className="caption very_weak ">{t("pass1")}</span>}
                                {state.level_password === 2 &&
                                <span id="weak_manual_password" className="caption weak ">{t("pass2")}</span>}
                                {state.level_password === 3 &&
                                <span id="good_manual_password" className="caption good ">{t("pass3")}</span>}
                                {state.level_password === 4 &&
                                <span id="strong_manual_password" className="caption strong ">{t("pass4")}</span>}
                                {state.level_password === 5 && <span id="very_strong_manual_password"
                                                                     className="caption very_strong ">{t("pass5")}</span>}
                            </label>
                        </div>
                        <div className="col span_3_of_6">
                            <label>
                                {t("confirmPassword")}
                                <input onChange={onChangeForm} value={form.confirm_password}
                                       id="manual_password_confirm"
                                       name="confirm_password" type="password"/>
                                {!state.passwordValid &&
                                <span className="error" id="error_password_mismatch"> {t("confirmError")}</span>}
                            </label>
                        </div>

                    </div>

                    <h3>{t("h3_3")}</h3>
                    <div className="section group">

                        <div className="col span_3_of_6">
                            <label>
                                {t("email")}
                                <input onChange={onChangeForm} value={form.email} id="notify_email" name="email"
                                       type="text"/>
                                {!state.emailValid && <span className="error" id="error_notify_email_invalid"> {t("emailError")}</span>}
                            </label>
                        </div>
                        <div className="col span_3_of_6">
                            <label>
                                {t("name")}
                                <input onChange={onChangeForm} value={form.name} id="notify_ref" name="name"
                                       type="text" maxlength="7"/>
                            </label>
                        </div>

                    </div>

                    <div className="section group hidden" id="advanced_options_tip">
                        Подсказка: добавьте эту страницу в закладки, чтобы не устанавливать эти настройки каждый раз
                    </div>
                </div>}
                {state.textValid && <div id="error_note_is_empty" className="error_block ">
                    {t("errorText")}
                </div>}
                <div id="error_connection" className="error_block hidden">
                    {t("errorNet")}
                </div>
                {/*<div id="error_ajax" className="error_block hidden">Ошибка*/}
                {/*</div>*/}




                <div className="section group">
                    <div className="col span_2_of_6">
                        <button onClick={onSubmit} id="encrypt_note" className="primary_button">{t("createNote")}</button>
                    </div>
                    <div className="col span_2_of_6 right">
                        <button onClick={onActiveOption} id="advanced_options_show" className="button">
                            {!activeOption ? `${t("showParam")}` : `${t("hideParam")}`} <span
                            id="options_on_notice_asterisk" className="hidden">(*)</span></button>
                        {/*<button id="advanced_options_hide" className="button hidden">*/}
                        {/*    Отключить параметры*/}
                        {/*</button>*/}
                        <div className="hint hidden" id="options_on_notice">(*) функции, установленные ссылкой</div>
                    </div>
                </div>


            </div>
        </div>
    );
};



let mapStateToProps = (state) => {

    return {

    }

}



export default connect(mapStateToProps,{createLinks}) (CreateNote)