
import * as React from 'react';
import logo404 from './img/privnote-logo.svg'


export const Error404 = (props) => {
    return (
        <>
            <div className="modal">
                <div className="dialog">
                    <a href="/">
                        <img className="logo" src={logo404} alt="Privnote"/>
                    </a>
                    <h1>Error 404</h1>
                    <p>
                        The page you requested was not found. <br/>
                        If this problem persists, please <a href="mailto:support@privnote.com">contact us.</a>
                    </p>
                </div>
                <div className="footer">
                    <a href="https://privnote.com">Privnote</a>&nbsp;&nbsp;
                </div>
            </div>

    </>
    );
};