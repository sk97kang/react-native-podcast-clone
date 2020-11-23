import React from 'react';
import HTML from 'react-native-render-html';
import {Linking} from 'react-native';

import {theme} from '../constants/theme';

interface HtmlReaderProps {
  html: string;
}

const HtmlReader = ({html}: HtmlReaderProps) => {
  return (
    <HTML
      html={html}
      onLinkPress={(event, href) => {
        Linking.openURL(href);
      }}
      tagsStyles={{
        a: {color: theme.color.blueLight, fontWeight: 'bold'},
      }}
    />
  );
};

export default HtmlReader;
