import './App.scss';
import React, {useState} from "react";
import {Processing} from "./compoments/Processing";
import {Admin} from "./Admin";
import CreateNote from "./CreateNote";
import {connect} from "react-redux";
import Created from "./Created";


import { useTranslation } from "react-i18next";

 const Main= (props) =>{

    const {
        activeCreateNote, activeProcesing, activeCreated,
    } = props





    return (
        <>
            {activeCreateNote && <CreateNote/>}
            {activeProcesing && <Processing/> }
            {activeCreated &&  <Created/>}

            {/*<Confirm/>*/}
            {/*<Fetch/>*/}
            {/*<Read/>*/}

        </>


    );
}


let mapStateToProps = (state) => {

    return {
        activeCreateNote: state.linkState.activeCreateNote,
        activeProcesing: state.linkState.activeProcesing,
        activeCreated: state.linkState.activeCreated
    }

}


export default connect(mapStateToProps,{}) (Main)