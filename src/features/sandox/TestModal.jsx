import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';

export default function TestModal({ data }) {
  return (
    <ModalWrapper size='mini' header='Test Modal'>
      <div style={{ marginTop: '80px' }}>The data is: {data}</div>
    </ModalWrapper>
  );
}
