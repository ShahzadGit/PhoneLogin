import React, { useState } from 'react'
import "./Banner.css"
import  {authentication} from "../firebaseConfig"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

function PhoneLogin() {
    const countryCode = '+92';
    const [phoneNumber, setPhoneNumber] = useState(countryCode);
    const [expandeForm, setExpandeForm] = useState(false);
    const [otp, setOtp] = useState('')

    const generateRecaptcha = () =>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
            'size': 'invisible',
            'callback': (response) => {

            }
        }, authentication);
    }


    const requestOTP = (e) => {
        // console.log("Here i am ", phoneNumber);
        e.preventDefault();
        if (phoneNumber.length >= 12) {
            setExpandeForm(true);
            generateRecaptcha()
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber,appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
            }).catch((error)=>{
                console.log("Error->",error);
            })
            
        }
        // console.log("There you go...",e);
    }

    const verifyOTP = (e) =>{
        
        if(otp.length === 6){
            console.log(otp);
            let confirmationResult = window.confirmationResult;

            confirmationResult.confirm(otp).then((result) => {
                const user = result.user;
                console.log(user)
                alert("OTP verified successfully!");
            }).catch((err) => {
                alert("Sorry!!! Invalid OTP");
            })
        }
    }
    return (
        <section id="banner">
            <div className="container-fluid" id="banner-container">
                <div className="row" id="banner-row">
                  <div className="col-md-8 order-md-first m-auto pb-4" id="banner-col">
                        <div className="formContainer p-5">
                            <form onSubmit={requestOTP}>
                                <h1>Sign In with phone number</h1>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumberInput" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="phoneNumberInput" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
                                    <div id="phoneNumberHelp" className="form-text">Please enter your phone number starting with country Code(e.g. +92 for Pak.)</div>
                                </div>
                                {expandeForm === true ?
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="otpInput" className="form-label">OTP</label>
                                            <input type="number" className="form-control" id="otpInput" value={otp} onChange={e => setOtp(e.target.value)}/>
                                            <div id="otpHelp" className="form-text">Please enter the one time pin sent on your phone Number </div>
                                            <button type="button" className="btn btn-primary" onClick={verifyOTP}>Verify OTP</button>

                                        </div>
                                    </>
                                    :
                                    null
                                }
                                {
                                    expandeForm === false ?
                                        <div className="d-flex justify-content-around" id="banner-anchor">
                                            <button type="submit" className="btn btn-primary">Request OTP</button>
                                        </div>

                                        :
                                        null
                                }
                                <div id="recaptcha-container"></div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default PhoneLogin
