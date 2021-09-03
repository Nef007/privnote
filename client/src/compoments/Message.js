
import * as React from 'react';


export const Message = (props) => {

    const {
        message
    } = props

    if(message.message){
        return (
            <div>
                <label >
                   <span className={message.status==="error"? "error" : "success" }>{message.message}</span>
                </label>
            </div>
        );
    }else return ""

};