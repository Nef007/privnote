import * as React from 'react';
import {useEffect, useState} from 'react';
import {Fetch} from "./compoments/Fetch";
import {Timer} from "./compoments/Timer";
import {useTranslation} from "react-i18next";


export const Read = (props) => {
    const { t} = useTranslation();

    const {
        linkId, getLink, loading, linkBoolPassword, link, messageLinkError, isTruePassword, deleteLink
    } = props

    const [password, setPassword] = useState('')
    const [activeHelp, setActiveHelp] = useState(false)
    const myRefInputLinkFinish = React.createRef();

    useEffect(() => {
        if (linkBoolPassword) {
            getLink(linkId, '')
        }

    }, [getLink, linkBoolPassword, linkId])

    const onActiveHelp=()=>{
        setActiveHelp(!activeHelp)
    }


    const onGetLink = () => {
        getLink(linkId, password)
        //  setActivePassword(!activePassword)

    }

    const onFocusTextAria = (e) => {
        e.target.select();
    }

    const onButtonSelect = () => {
        myRefInputLinkFinish.current.select()
    }

    if (loading) {
        return <Fetch/>
    }


    return (
        <div id="content">
            <div id="read_note">
                <h1>{t("read_note")}</h1>

                {!isTruePassword && <div id="password_form">
                    <div className="warning_block">
                        {t("warning_block")}
                    </div>

                    <h3>{t("h3_2")}<span onClick={onActiveHelp} id="manual_password_help_toggle" className="help_button">?</span></h3>
                    {activeHelp && <div id="manual_password_help" className="help_block">
                        {t("help_block")}
                    </div>}
                    <div className="section group">
                        <div className="col span_3_of_6">
                            <label>
                                {t("passRead")}
                                <input onChange={e => setPassword(e.target.value)} value={password} id="note_password"
                                       type="password"/>
                                {messageLinkError && <span className="error " id="error_password_incorrect">
                                    {messageLinkError}
                    </span>}
                            </label>
                        </div>
                    </div>
                    <div className="section group">
                        <div className="col span_3_of_6">
                            <button onClick={onGetLink} id="decrypt_button" className="primary_button">  {t("decrypt_button")}
                            </button>
                        </div>
                    </div>

                </div>}

                {isTruePassword && <div id="ok_content" className="">

                    {!link.hour && <div id="info_destroyed" className="warning_block ">
                        {t("info_destroyed")}
                    </div>}

                    {link.hour ? <div id="info_expires" className="warning_block">
                        {t("info_expires1")} <span id="info_expires_text"><Timer sec={link.hour}/></span>.<br/>
                        <a id="note_link"
                           href={link.link}>{link.link}</a>
                    </div> : ""
                    }
                    <textarea onFocus={onFocusTextAria} ref={myRefInputLinkFinish} value={link.text} readOnly id="note_contents"/>
                    <div id="error_connection_destroy" className="error_block hidden">
                        Ошибка связи с сервером Privnote. Пожалуйста, проверьте ваше интернет-соединение и попробуйте
                        еще раз
                    </div>
                    <div id="error_ajax_destroy" className="error_block hidden">
                        Ошибка
                    </div>

                    <div className="section group">
                        <div className="col span_2_of_6">
                            <button  onClick={onButtonSelect} id="select_text"
                                    className="small_button"> {t("select_text")}
                            </button>
                        </div>
                        {link.hour ? <div className="col span_2_of_6 right">
                            <button onClick={event => deleteLink(link.short)} id="destroy_button" className="small_button danger">{t("destroy_link")}
                            </button>
                        </div> : ''}
                    </div>
                </div>}
            </div>
        </div>
    );
};