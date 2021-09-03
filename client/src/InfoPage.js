

import * as React from 'react';


export const InfoContact = (props) => {
    return (
        <div id="content">
            <div>


                <h2>Share your comments &amp; questions</h2>

                <p>If you have any questions about Privnote or if you want to share your comments or ideas, please send us an e-mail at <a href="mailto:info@privnote.com">info@privnote.com</a>.</p>

                <p>Remember to check the <a href="faq">Frequently Asked Questions</a> and our <a href="privacy">Privacy Policy first</a>.</p>

            </div>
        </div>

    );
};
export const InfoSupport = (props) => {
    return (
        <div id="content">
            <div>

                <h2>Problems?</h2>

                <p>If you are having difficulties with Privnote, please send us an e-mail at <a href="mailto:support@privnote.com">support@privnote.com</a>.</p>

                <p>Please include your br/owser name and version, type of device or computer and the operating system name and version, so we can reproduce the issue.</p>

                <p>Remember to check the <a href="faq">Frequently Asked Questions</a> and our <a href="privacy">Privacy Policy first</a>.</p>

            </div>
        </div>

    );
};
export const InfoAbout = (props) => {
    return (
        <div id="content">
            <div>




                <h2>About Privnote</h2>

                <p>Have you ever wanted to send confidential information within your work environment, to family or friends, but were afraid to do so over the internet, because some malicious hacker could be spying on you?</p>

                <p>Privnote is a free web based service that allows you to send top secret notes over the internet. It's fast, easy, and requires no password or user registration at all.</p>

                <p>Just write your note, and you'll get a link. Then you copy and paste that link into an email (or instant message) that you send to the person who you want to read the note. When that person clicks the link for the first time, they will see the note in their browser and the note will automatically self-destruct; which means no one (even that very same person) can read the note again. The link won't work anymore.</p>

                <p>If you have any questions, feel free to submit your inquiry via e-mail to <a href="mailto:info@privnote.com">info@privnote.com</a>, and remember to check our <a href="faq">Frequently Asked Questions</a> first.</p>

                <p>If you are concerned about Privacy issues, please read our <a href="privacy">Privacy Policy</a>.</p>

                <p><a href="/">Give Privnote a try!</a></p>

            </div>
        </div>

    );
};
export const InfoPrivacy= (props) => {
    return (
        <div id="content" >
            <div >


                <h2>Privacy Policy</h2>

                <p><i>Last modified: May 25th, 2018</i></p>

                <p>At Privnote, privacy is taken very seriously, since the main purpose of the site is to preserve it.
                    This policy outlines the measures taken by Privnote to protect the privacy of its users.</p>

                <h3>1. Service description</h3>

                <p>Privnote is a free web based service that allows users to create encrypted notes that they can share
                    over the internet as unique one-time-use HTTPS URLs (hereafter referred to as links) which by
                    default expire after its first access via any web br/owser.</p>

                <p>As Privnote does not provide any means for transmitting the link, the act of sending the link is the
                    full responsibility of Privnote users.</p>


                <p>Depending on the communication channel of your choice (e.g., e-mail, fax, SMS, phone, instant
                    messaging, social media), there may be a certain risk that third parties intercept your
                    communication, get knowledge of the communicated link and thus may be able to read your note.</p>

                <h3>2. How the notes and its contents are processed</h3>

                <p>The link is generated in the user's br/owser and at no time is sent as such to Privnote. The link is
                    thus in the sender's (and later possibly in the recipient's) hands only. Therefore, there is no way
                    to recover a note if a Privnote user losses the link.</p>

                <p>Since only the link binds the decryption key to the note's content and since Privnote does not have
                    the link, at no time is any note held in any readable format state at Privnote. This assures that
                    nobody (including Privnote's administrators) can read a note.</p>


                <p>When using Privnote's default funtionality, when a note is retrieved, its data is completely removed
                    from Privnote; there is absolutely no way to recover it again.</p>

                <p>When "Show options" is selected and the user opts for a time interval for the note's removal, then
                    independently of how many times the note is retrieved, the note will be deleted only after that
                    specified time is completed.</p>

                <p>After a note is deleted from Privnote, there is absolutely no way to recover it again.</p>

                <p>When a note is not retrieved after 30 days, Privnote removes it permanently, just as if it were
                    read.The Privnote sysadmin team will do as much as possible to protect the site against unauthorized
                    access, modification or destruction of the data. But, even if someone or something could manage to
                    gain access to the database, they would be unable to read the notes since their contents are
                    encrypted and can't be decrypted without the links which Privnote never has a hold of.</p>


                <h3>3. Processing of IP addresses</h3>

                <p>Privnote is not logging the IP addresses; they are processed to enable communication with Privnote's
                    servers but they are not part of the log-files. IP addresses are deleted as soon as they are no
                    longer needed for the purpose of communication.</p>

                <h3>4. Pseudonymous data</h3>

                <p>The creator of the note can introduce personal data into the note. Even though this data is
                    encrypted, the data can be decrypted again and thus constitutes pseudonymous (personal) data. In any
                    case, one cannot deduce the note's creator from Privnote's database, as Privnote does not store IP
                    addresses.</p>

                <p>The decryption of the note's data is in the users' hands (sender and recipient). Privnote is not able
                    to decrypt the note and access the data (personal or otherwise) introduced by the creator since
                    Privnote is never in possession of the decryption key which is contained only in the link.</p>

                <h3>5. Disclaimer</h3>

                <p>When a person clicks the Privnote's link, Privnote declines any responsibility related to the note's
                    content.</p>

                <h3>6. Disclosure of Data to Third Party</h3>

                <p>Privnote does not share nor sell any information to others, nor use it in any way not mentioned in
                    this Privacy Policy.</p>

                <h3>7. Use of cookies</h3>

                <p>Privnote uses cookies (small text files that are stored on your computer by your br/owser when you
                    visit a website) for our own interest in improving the use of our site and service. In some cases
                    they will also be used for promotional purposes. The type of cookies Privnote uses are listed
                    below:</p>

                <p></p><p >Functional cookies</p> Privnote uses persistent cookies to keep a
                session in the user's preferred language and to record your notification that Privnote uses cookies as
                explained in this section. Also some cookies are used as part of the link hiding mechanism when reading
                a note, these cookies in particular must be enabled for Privnote to function and are deleted immediately
                after the note is retrieved.<p></p>

                <p></p><p >Non-functional cookies</p> Used for commercial and promotional
                purposes. Non-functional cookies are placed by third parties. In case of European citizens, these
                cookies do not store personal data (non-personalized ads).<p></p>

                <p>If you would want to remove certain cookies, or block them from being stored in your br/owser, it is
                    possible via your br/owser settings for cookies. However, if you do this, the site might not work as
                    expected.</p>


                <h3>8. Children</h3>

                <p>Privnote does not target and is not intended to attract children under the age of 16. Minors must
                    obtain express consent from their parents or legal guardians prior to accessing or using
                    Privnote.</p>

                <h3>9. Validity of this Privacy Policy</h3>

                <p>Please note that this Privacy Policy may change from time to time. We expect most changes to be
                    minor. Regardless, we will post any Policy changes on this page, and if the changes are significant,
                    we will provide a more prominent notice such as a message on the home page. Each version of this
                    Policy will be identified at the top of the page by its effective date.</p>

                <h3>10. Contact information</h3>

                <p>If you have any questions about this Privacy Policy or other concerns regarding privacy issues,
                    please send us an e-mail at <a href="mailto:info@privnote.com">info@privnote.com</a> and we will
                    answer you in less than 5 working days. If you are not satisfied with the outcome of our
                    communication, you may refer your complaint to a local supervisor authority.</p>

                <p>Privnote is a service provided by ikatu. The corporate details are as follows:</p>


                <p>
                    Legal Company Name:<br/>
                    Gletin S.A.<br/>
                    RUT: 214528610018<br/>
                </p>
                <p>
                    Address:<br/>
                    Siria 6101, 11400 Montevideo, Uruguay<br/>
                    Tel/Fax +598 2 600 8887<br/>
                    email: <a href="mailto:info@privnote.com">info@privnote.com</a>
                </p>


            </div>
            </div>

    );
};