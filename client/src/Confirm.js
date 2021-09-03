import * as React from 'react';
import {connect} from "react-redux";
import {getLink} from "./redux/link-reducer";
import {useTranslation} from "react-i18next";


export const Confirm = (props) => {
    const { t, i18n } = useTranslation();

    const {
        linkId, linkBoolPassword, setRead, setActiveConfirm, setConfirm
    } = props

    const onGetLink=()=>{
        setConfirm()
    }

    return (
        <div id="content">
            <div id="confirm_read_note" >

                {/*<div id="error_link_incomplete" className="error_block ">*/}
                {/*    <h1>Ссылка записки неполная</h1>*/}
                {/*    <p>*/}
                {/*        Ссылка записки, которую вы открыли, неполная. Часть после символа # отсутствует.<br/>*/}
                {/*        Вместо того, чтобы кликать по ссылке, попробуйте скопировать её и вставить в адресную строку*/}
                {/*        браузера.*/}
                {/*    </p>*/}
                {/*</div>*/}


                <div id="link_ok">
                    <h1>{t("link_ok")}</h1>

                    <p>
                        {t("link_ok1")} <strong>{linkId}</strong>.<br/>
                    </p>
                    {!linkBoolPassword &&  <p>{t("link_pass")} </p>}


                    {/*<div id="error_connection_read" className="error_block ">*/}
                    {/*    Ошибка связи с сервером Privnote. Пожалуйста, проверьте ваше интернет-соединение и попробуйте*/}
                    {/*    еще раз*/}
                    {/*</div>*/}
                    {/*<div id="error_ajax_read" className="error_block">*/}
                    {/*    Ошибка*/}
                    {/*</div>*/}

                    <div className="section group">
                        <div className="col span_3_of_6">
                            <button onClick={onGetLink} id="confirm_button" className="primary_button" >{t("link_yes")}
                            </button>
                        </div>
                        <div className="col span_3_of_6">
                            <button className="button">{t("link_no")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// let mapStateToProps = (state) => {
//
//     return {
//
//     }
//
// }
//
//
// export default connect(mapStateToProps,{getLink}) (Confirm)