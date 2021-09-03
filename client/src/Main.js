import './App.scss';
import React from "react";
import {Processing} from "./compoments/Processing";
import CreateNote from "./CreateNote";
import {connect} from "react-redux";
import Created from "./Created";

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