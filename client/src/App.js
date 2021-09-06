import './App.scss';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {Helmet} from "react-helmet";
import Admin from "./Admin";
import logo from "./img/privnote-logo.svg";
import {connect} from "react-redux";
import Auth from "./Auth";
import {initializedApp} from "./redux/auth-reducer";
import Main from "./Main";
import Show from "./Show";
import {Error404} from "./Error404";
import {InfoAbout, InfoContact, InfoPrivacy, InfoSupport} from "./InfoPage";
import {useCookies} from 'react-cookie';
import {useTranslation} from "react-i18next";


function App({isAuth, initializedApp, initialized, check}) {

    const {t, i18n} = useTranslation();
    const [cookies, setCookie] = useCookies(['language', 'cook']);


    let language = window.navigator.language || "ru";
    language = language.substr(0, 2).toLowerCase();
    const [languageSelect, setLanguageSelect] = useState(cookies.language || language);

    useEffect(() => {
        initializedApp()

        if (cookies.language) {
            cookies.language && i18n.changeLanguage(cookies.language);
        } else if (language) {
            i18n.changeLanguage(language);
        }


    }, [cookies.language, i18n, initializedApp, language])




    const changeLanguage = (e) => {
        setLanguageSelect(e.target.value)
        setCookie('language', e.target.value, {path: '/'});
        i18n.changeLanguage(e.target.value);
    };

    const onSetCook = () => {
        setCookie('cook', true)
    };


    if (!initialized) {
        return <h1>{t("load")}</h1>
    }
    if (check.message === "404") {
        return <Error404/>
    }

    return (
        <>
            <Helmet>
                <title>{t("titleHead")}</title>
            </Helmet>
            <div id="header_bg">
                <div id="header">
                    <h1>
                        <a href="/" title="Нажмите здесь, чтобы создать новую заметку">
                            <img src={logo} alt="Privnote"
                                //  onError="this.onerror=null; this.src='/static-58c8928/style/legacy/privnote-logo.png'"
                            />
                            {/*<span>Privnote</span>*/}
                        </a>
                    </h1>
                    <h2>{t("title")}</h2>
                </div>
            </div>


            <Router>
                <Switch>
                    <Route path="/admin" exact>
                        {isAuth ? <Admin/> : <Auth/>}
                    </Route>
                    <Route path="/" exact>
                        <Main t={t}/>
                    </Route>
                    <Route path="/info/contact" exact>
                        <InfoContact/>
                    </Route>
                    <Route path="/info/support" exact>
                        <InfoSupport/>
                    </Route>
                    <Route path="/info/privacy" exact>
                        <InfoPrivacy/>
                    </Route>
                    <Route path="/info/about" exact>
                        <InfoAbout/>
                    </Route>
                    <Route path="/blog" exact>
                        <Error404/>
                    </Route>
                    <Route path="/:code" exact>
                        <Show/>
                    </Route>
                    <Redirect to="/"/>

                </Switch>
            </Router>


            <div id="footer">
                <div id="nav" className="section group">
                    <div className="col span_2_of_6">
                        <a href="/"><strong>{t("footer.newNote")}</strong></a><br/>
                        <a href="/info/contact">{t("footer.comment")}</a>
                    </div>

                    <div className="col span_1_of_6">
                        <a href="/info/support">{t("footer.support")}</a><br/>
                        <a href="/info/privacy">{t("footer.privacy")}</a><br/>
                        <a href="/info/about">{t("footer.about")}</a>

                    </div>

                    <div className="col span_1_of_6">
                        <a href="https://blog.privnote.com/" rel="noreferrer">Blog</a><br/>
                        <a href="https://twitter.com/privnote" rel="noreferrer">Twitter</a><br/>
                        <a href="https://www.facebook.com/privnote" rel="noreferrer">Facebook</a>
                    </div>

                    <div className="col span_2_of_6">
                        <form>
                            <select onChange={changeLanguage} value={languageSelect} name="manual_locale" id="dkfl">
                            <option value="de">Deutsch</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="it">Italiano</option>
                            <option value="pl">Polski</option>
                            <option value="pt">Português</option>
                            <option value="ro">Romana</option>
                            <option value="ru">Русский</option>
                            <option value="sv">Svenska</option>
                            <option value="tr">Türkçe</option>
                            <option value="uk">українська мова</option>
                            <option value="zh_CN">汉语</option>
                            <option value="zh_TW">漢語</option>
                            <option value="cs">čeština</option>
                            <option value="nl">Dutch</option>
                            <option value="th">ไทย</option>
                            <option value="default">(По умолчанию в браузере)</option>
                        </select></form>

                        <a href="http://blog.privnote.com/post/125553077722/helps-us-translate-privnote">{t("footer.translite")}!</a><br/><br/>
                    </div>
                </div>

                <div id="footnote">
                    Privnote <span className="version">Ver. 1.1-44-g58c8928 / 2018-05-25</span> |
                    © <a href="http://www.ikatu.us/privnote.html">Ikatu</a>
                </div>

            </div>
            {!cookies.cook &&  <div id="cookie-modal" className="cookie-modal">
            <span className="cookie-span">В Privnote используются файлы cookie.
               <a className="cookie-link" target="_blank" href="/info/privacy">Изучите это в нашей Политике конфиденциальности.</a>
               <button onClick={onSetCook} id="cookie_consent" className="cookie-button">Понял!</button>
            </span>
            </div> }

        </>


    );
}

let mapStateToProps = (state) => {

    return {
        check: state.linkState.check,
        isAuth: state.authState.isAuth,
        initialized: state.authState.initialized,

    }

}


export default connect(mapStateToProps, {initializedApp})(App)