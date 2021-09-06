
import * as React from 'react';
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


export const Timer = (props) => {
    const { t } = useTranslation();
    const {
       sec
    } = props

    useEffect( () => {
        timer(sec)
    },[timer])

    useEffect( () => {
        timer(sec)
    },[timer])

    const [time, setTime] = useState("")

    function timer (endTime) {
        let now = new Date().getTime();
        let diff = endTime - now;
        if (diff > 0) {
            let day = Math.floor(diff / (60 * 60) / 1000 / 24);
            let hour = Math.floor(diff / (60 * 60) / 1000);
            let minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
            let seconds = Math.floor(diff % (1000 * 60) / 1000);

            if (day) {
                setTime(day + `${t("day")}`);
            } else if (hour) {
                setTime(hour + `${t("hour")}` + minutes + `${t("min")}`);
            } else {
                setTime(minutes + `${t("min_and")}` + seconds + `${t("ces")}`);
            }

        } else {
            return("0")
        }
    }


    setInterval(  ()=>timer(sec), 1000);



    return (
        <span >
            {time}
        </span>
    );
};