import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export default function useFirestoreDoc({
  query,
  data,
  deps,
  shouldExecute = true,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: 'not-found',
              message: 'Could not find document',
            })
          );
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, deps);
}
