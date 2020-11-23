import React from 'react';
import {ActivityIndicator} from 'react-native';

import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

const SearchLoading = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.color.blueLight} />
    </Container>
  );
};

export default SearchLoading;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
