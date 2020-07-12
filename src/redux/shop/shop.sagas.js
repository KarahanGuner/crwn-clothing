import {call, put, takeLatest, all} from 'redux-saga/effects';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync () {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot); // the reason for call is to use yield thus adding a new point for the saga library
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
};

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}