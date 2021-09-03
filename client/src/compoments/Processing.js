import * as React from 'react';
import {useTranslation} from "react-i18next";


export const Processing = () => {
    const { t } = useTranslation();
    return (
        <div id="content">
            <div id="creating_note" >
                <h1>{t("processing")}</h1>
                <p>{t("processingInfo")}</p>
            </div>
        </div>
    );
};