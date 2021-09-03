
import * as React from 'react';
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


export const Timer = (props) => {
    const { t, i18n } = useTranslation();
    const {
       sec
    } = props

    useEffect( () => {
        start(sec)
    },[])

    const [time, setTime] = useState("")

    timer(sec)

    function start (endTime) {
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


            // minutes = minutes < 10 ? `0${minutes}` : minutes;
            // seconds = seconds < 10 ? `0${seconds}` : seconds;

        } else {
            setTime("0")
        }
    }

    function timer(endTime) {
        var myTimer = setInterval(function  () {
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


                // minutes = minutes < 10 ? `0${minutes}` : minutes;
                // seconds = seconds < 10 ? `0${seconds}` : seconds;

            } else {
                clearInterval(myTimer);
                setTime("0")
            }
        }, 1000);
    }



    return (
        <span >
            {time}
        </span>
    );
};