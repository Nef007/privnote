import './App.scss';
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Confirm} from "./Confirm";
import {checkLink, deleteLink, getLink, setConfirm} from "./redux/link-reducer";
import {useParams, withRouter} from 'react-router-dom'
import {Read} from "./Read";
import {compose} from "redux";
import {DeleteNote} from "./DeleteNote";
import {Fetch} from "./compoments/Fetch";
import _ from "lodash";
import {Error404} from "./Error404";
import {useTranslation} from "react-i18next";

const Show = (props) => {
    const { t, i18n } = useTranslation();
    const {
        location, checkLink, check, messageLinkError
    } = props

    const [activeConfirm, setActiveConfirm] = useState(true)
    const linkId = useParams().code
    const linkBoolPassword = !!location.hash.substr(1)

    useEffect( () => {
        checkLink(linkId)
    },[])

if( _.isEmpty(check)){
    return <h1>{t("load")}</h1>
}


    return (
        <>
             { !check.isCheck && <DeleteNote check={check} {...props}/>}
            {  check.confirm && <Confirm linkId={linkId} linkBoolPassword={linkBoolPassword}
                                       setActiveConfirm={setActiveConfirm}{...props} />}
            {!check.confirm && check.isCheck && <Read linkId={linkId} linkBoolPassword={linkBoolPassword}{...props}/>}




        </>


    );
}


let mapStateToProps = (state) => {

    return {
        check: state.linkState.check,
        isTruePassword: state.linkState.isTruePassword,
        link: state.linkState.link,
        messageLinkError: state.linkState.messageLinkError,
        loading: state.linkState.loading,


    }

}


export default compose(connect(mapStateToProps, {getLink, deleteLink, checkLink, setConfirm}),
    withRouter,
)(Show);

