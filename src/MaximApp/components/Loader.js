import Flex from 'components/common/Flex';
import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      style={{ height: '94vh' }}
    >
      <Spinner />
    </Flex>
  );
}
