


import * as React from 'react';
import 'moment/locale/ru';
import 'moment/locale/uk';
import moment from 'moment';
import {useTranslation} from "react-i18next";

export const DeleteNote = ({check}) => {
    const { t, i18n } = useTranslation();

    let time = moment(check.deleteNoteDate).fromNow().split(" ")
    moment.locale(`${t("language")}`)
    // time.pop()
    // time = time.join(" ")
    return (
        <div id="content">
            <div id="note_error">
                <h1> {t("note_error")}</h1>
                <p> {t("note_error1")} {check.short} {t("note_error2")} {moment(check.deleteNoteDate).fromNow()} </p>
                <p>{t("note_error3")}</p>
            </div>

        </div>
    );
};