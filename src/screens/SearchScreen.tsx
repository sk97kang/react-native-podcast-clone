import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import FeatherIcon from 'react-native-vector-icons/Feather';

import searchQuery from '../graphql/query/searchQuery';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../types/graphql';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';

import SearchEmpty from '../components/search/SearchEmpty';
import SearchLoading from '../components/search/SearchLoading';
import SearchTile from '../components/search/SearchTile';
import Error from '../components/Error';

const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({variables: {term}});
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container>
      <InputContainer>
        <InputBox>
          <FeatherIcon name="search" size={20} color={theme.color.greyDark} />
          <Input
            placeholder="Search Podcast"
            selectionColor={theme.color.blueLighter}
            value={term}
            onChangeText={setTerm}
            autoCorrect={true}
            onSubmitEditing={onSearch}
          />
        </InputBox>
      </InputContainer>
      {error ? (
        <Error message={error.message} />
      ) : (
        <FlatList<SearchQuery_search>
          contentContainerStyle={s.listContentContainer}
          keyboardShouldPersistTaps="never"
          data={data?.search ?? []}
          keyExtractor={(item) => item.feedUrl}
          ListEmptyComponent={!loading ? <SearchEmpty /> : <SearchLoading />}
          scrollEnabled={data?.search.length !== 0}
          renderItem={({item}) => <SearchTile item={item} />}
        />
      )}
    </Container>
  );
};

export default SearchScreen;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const InputContainer = styled.View`
  width: 100%;
  height: 50px;
  padding: 0px ${theme.space.sm}px;
  margin: ${theme.space.sm}px 0px;
`;

const Input = styled.TextInput`
  height: 40px;
  padding: 0;
  flex: 1;
  padding-left: ${theme.space.sm}px;
  font-size: ${theme.text.size.md}px;
`;

const s = StyleSheet.create({
  listContentContainer: {
    minHeight: '80%',
  },
});

const InputBox = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  background-color: ${theme.color.greyLightest};
  border-radius: 10px;
  padding: 0px ${theme.space.sm}px;
`;
