import React, {useEffect, useState} from "react";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal, NativeSelect,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actionsConst, openModal, success} from "../../redux/reducers/clients.reducer";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialState = {
    name: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: ''
}

export const ModalEdit = ({open, handleClose, isEditing, setEdit}) => {
    const dispatch = useDispatch()
    const [fileds, setFields] = useState(initialState)
    const rowEditing = useSelector((state) => state.client.rowEditing)
    const statusSaved = useSelector(state => state.client.statusSaved)
    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (Object.entries(fileds).length > 0) {
            if (isEditing) {
                dispatch({type: actionsConst.PATCH_CLIENT, payload: {data:fileds, id: rowEditing._id}})
                handleClose(false)
            } else {
                dispatch({type: actionsConst.POST_CLIENT, payload: fileds})
            }
        } else {
            alert('the fields has required')
        }
    }
    const handleChange = (e) => {
        const {value, name} = e.target
        setFields({...fileds, [name]: value})
    }

    useEffect(() => {
        if (Object.entries(statusSaved).length > 0 && !statusSaved.hasOwnProperty('detail')) {
            setFields(initialState)
            dispatch({type: actionsConst.FETCH_ALL})
        }
    }, [statusSaved])

    useEffect(() => {
        if(isEditing) {
            setFields(rowEditing)
        }else {
            setFields(initialState)
        }
    }, [isEditing, rowEditing])
    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    handleClose(false);
                    setEdit(false)
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >


                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        {statusSaved && statusSaved.hasOwnProperty('detail') && (
                            <Alert severity="error" onClose={() => {
                                dispatch(success({}))
                            }}>Client created successfully</Alert>
                        )}
                        {Object.entries(statusSaved).length > 0 && !statusSaved.hasOwnProperty('detail') && (
                            <Alert severity="success" onClose={() => {
                                dispatch(success({}))
                            }}>Updated successfulled</Alert>
                        )}
                        <h1>{isEditing ? 'Edit' : 'Create'}</h1>

                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="name"
                                    onChange={handleChange}
                                    value={fileds.name}
                                    label="Name"
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="lastName"
                                    label="LasName"
                                    value={fileds.lastName}
                                    onChange={handleChange}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="phone"
                                    label="Phone"
                                    value={fileds.phone}
                                    onChange={handleChange}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    value={fileds.email}
                                    onChange={handleChange}
                                    defaultValue=""
                                    type={'email'}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="city"
                                    label="City"
                                    value={fileds.city}
                                    onChange={handleChange}
                                    type={'text'}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="address"
                                    label="Address"
                                    value={fileds.address}
                                    onChange={handleChange}
                                    type={'text'}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs>
                                <Button type={'submit'} variant={'contained'}>Save</Button>
                            </Grid>
                            <Grid item xs>
                                <Button onClick={() => handleClose(false)}>Close</Button>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Modal>
        </div>

    )
}