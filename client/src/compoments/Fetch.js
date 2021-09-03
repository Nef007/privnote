
import * as React from 'react';
import {useTranslation} from "react-i18next";


export const Fetch = () => {
    const { t} = useTranslation();
    return (
        <div id="content">
            <div id="fetching_note" >
                <h1>{t("fetching_note")}</h1>
                <p>{t("fetching_note1")}</p>
            </div>
        </div>
    );
};