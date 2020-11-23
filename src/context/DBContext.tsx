import React, {createContext, useEffect, useRef, useState} from 'react';
import {IDatabaseContract} from '../contract/DatabaseContract';
import {PodcastModel} from '../models/PodcastModel';
import {SQliteServices} from '../services/sqliteServices';

interface DBContextProps {
  podcasts: PodcastModel[];
  subToPodcast: (podcast: PodcastModel) => Promise<void>;
}

export const DBContext = createContext<DBContextProps>({
  podcasts: [],
  subToPodcast: () => Promise.resolve(),
});

export const DBProvider: React.FC = (props) => {
  const [podcasts, setPodcasts] = useState<PodcastModel[]>([]);
  const db = useRef<IDatabaseContract | null>(null);

  useEffect(() => {
    db.current = new SQliteServices();
  }, []);

  useEffect(() => {
    if (db.current?.isReady) {
      (async () => {
        if (db.current) {
          const _podcasts = await db.current.getAllPodcast();
          setPodcasts(_podcasts);
        }
      })();
    }
  }, [db.current?.isReady]);

  const subToPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.subscribeToPodcast(podcast);

      const _podcasts = await db.current.getAllPodcast();

      setPodcasts(_podcasts);
    }
  };

  const value: DBContextProps = {
    podcasts,
    subToPodcast,
  };

  return (
    <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
  );
};

export const useDBContext = () => React.useContext(DBContext);
