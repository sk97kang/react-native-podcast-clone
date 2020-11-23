import {FeedQuery_feed, SearchQuery_search} from '../types/graphql';

export type SearchStackRouteParamList = {
  Search: undefined;
  PodcastDetails: {
    data: SearchQuery_search;
  };
  EpisodeDetails: {
    episode: FeedQuery_feed;
    podcast: SearchQuery_search;
  };
};
