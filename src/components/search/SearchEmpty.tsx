import React from 'react';

import styled from 'styled-components/native';

const SearchEmpty = () => {
  return (
    <Container>
      <Text>No Podcasts, please search something...</Text>
    </Container>
  );
};

export default SearchEmpty;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
