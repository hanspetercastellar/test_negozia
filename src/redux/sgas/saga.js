import { call, put, fork, takeLatest, all, takeEvery } from 'redux-saga/effects'
import {actionsConst, success, successClients} from '../reducers/clients.reducer';
import Swal from "sweetalert2";
import {authServices} from "../../services/authServices";
import {actionAuth, failedLogin, isFetching, successLogin} from "../reducers/auth.reducer";


function* loginSaga({payload, navigate}) {
   try {
       yield put(isFetching(true))
       const response = yield call(authServices.login, payload)
       if (response.hasOwnProperty('status') && response.status === 201) {
           yield put(successLogin(response.data))
           yield put(isFetching(false))
           yield navigate('/')
       } else {
              yield put(failedLogin())
       }
     console.log(response)
   }catch (e) {
       yield put(failedLogin())
   }
}

function* getAllClients(){
    try {
        const response = yield call(authServices.getAllClients)
        if (response.hasOwnProperty('status') && response.status === 200) {
            yield put(successClients(response.data))
        } else {
              console.error('error',response)
        }
    } catch(e) {

    }

}

function* postClient({payload}) {
    try {
        const response = yield call(authServices.postClient, payload)
        if (response.hasOwnProperty('status') && response.status === 200) {
            yield put(success(response.data))
        } else {
            console.error('error',response)
        }
    }catch (e) {
        console.log(e)
    }
}

function* patchClient({payload}) {
    try {
        const response = yield call(authServices.patchClient, payload)
        if (response.hasOwnProperty('status') && response.status === 200) {
            yield put(success(response.data))
            Swal.fire('The clients has updated', '', 'info')
        }

    }catch (e) {
        Swal.fire('Error', 'The clients has not updated', 'error')
    }
}

function* deleteClient({id}) {
    try {

        const response = yield call(authServices.deleteClient, id)
        if (response.hasOwnProperty('status') && response.status === 200) {
            yield put(success(response.data))
            Swal.fire('Deleted', '', 'info')
        }

    }catch (e) {
        Swal.fire('Deleted', '', 'error')
    }


}


function* sagasMain() {
   yield all([
        takeEvery(actionsConst.FETCH_ALL, getAllClients),
        takeEvery(actionsConst.POST_CLIENT, postClient),
        takeEvery(actionsConst.PATCH_CLIENT, patchClient),
        takeEvery(actionsConst.DELETE_CLIENT, deleteClient),
        takeEvery(actionAuth.LOGIN, loginSaga)
    ])
}

function* allSagas() {
    yield fork(sagasMain)
}

export default allSagas