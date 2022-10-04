import {Alert, Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {useState} from "react";
import {userData} from "../../Data/Data";
import {useDispatch, useSelector} from "react-redux";
import {loading, loginFail, successLogin} from "../../redux/reducers/auth.reducer";
import { useNavigate  } from "react-router-dom";
import LinearIndeterminate from "../../components/common/loader";

export const Auth = () => {
    const dispatch = useDispatch()
    const fetching = useSelector(loading)
    const failLogin = useSelector(loginFail)
    const navigate = useNavigate();
    const [uname, setUname] = useState('')
    const [pass, setPass] = useState('')
    const [errorMessage, setErrorMessage] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage({})
        dispatch({type: 'LOGIN', navigate ,payload: {email: uname,password:pass}})
    }

    const handleChangePass = (e) => {
        const value = e.currentTarget.value;
        if (value === '') {
            setPass(null)
        } else {
            setPass(value)
        }
    }
    const handleChangeUname = (e) => {
        const value = e.currentTarget.value;
        if (value === '') {
            setUname(null)
        } else {
            setUname(value)
        }
    }


    return <>

        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title='Login'
                style={{textAlign: 'center'}}
            >
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="uname"
                        error={errorMessage['uname']}
                        value={uname}
                        type={'email'}
                        fullWidth label={'User'}
                        autoComplete={'off'}
                        onChange={handleChangeUname}
                        id="margin-dense"
                        margin="dense"/>
                    <TextField
                        name="pass"
                        value={pass}
                        error={errorMessage['pass']}
                        onChange={handleChangePass}
                        type={'password'}
                        fullWidth
                        autoComplete={'off'}
                        label={'Password'}
                        id="margin-dense"
                        margin="dense"/>
                    <Button
                        color="primary"
                        type={'submit'}
                        fullWidth
                        disabled={fetching}
                        variant="outlined"
                        size='large'>SingIn</Button>
                </form>
                {fetching && <LinearIndeterminate color="secondary" />}
                {failLogin && <Alert severity="error">Fail login!</Alert>}
            </CardContent>

        </Card>
    </>

}