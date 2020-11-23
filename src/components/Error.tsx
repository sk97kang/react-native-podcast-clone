import React from 'react';

import styled from 'styled-components/native';

interface ErrorProps {
  message: string;
}

const Error = ({message}: ErrorProps) => {
  return (
    <Container>
      <Text>{message}</Text>
    </Container>
  );
};

export default Error;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
