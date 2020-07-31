import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The date is: {data} </h3>
      <Button
        content='Increment'
        color='green'
        onClick={() => dispatch(increment(10))}></Button>
      <Button
        content='Decrement'
        color='green'
        onClick={() => dispatch(decrement(5))}></Button>
    </>
  );
}
