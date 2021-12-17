import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';


interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type IQueryResponse = {
  after: number | null;
  data: Card[];
};


export default function Home(): JSX.Element {

  const fetchImages = async ({
    pageParam = null,
  }): Promise<IQueryResponse> => {
    const { data } = await api.get('/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  };


  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<unknown, unknown, IQueryResponse>(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (after) => after === undefined ? null : after
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(p => p.data).flat()
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
