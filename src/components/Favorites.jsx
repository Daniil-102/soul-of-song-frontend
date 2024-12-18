import { Header } from './Header';
import { useGetMeQuery } from '../store/auth/auth';
import { useGetFavoritesQuery } from '../store/songs/songs';
import { Songs } from './Songs';
import { useEffect, useState } from 'react';

export const Favorites = () => {
  const { data: me } = useGetMeQuery();
  const { data: favoritesData, isLoading: isFavoritesLoading } =
    useGetFavoritesQuery();

  const [favorites, setFavorites] = useState([]);
  const language = localStorage.getItem('language') || 'EN';
  const eng = language === 'EN';
  const size = parseInt(localStorage.getItem('sizeAddition') || '0', 10);

  useEffect(() => {
    if (favoritesData) {
      setFavorites([...favoritesData].sort((a, b) => a.id - b.id));
    }
  }, [favoritesData]);
  return (
    <div className='min-h-[100vh] flex flex-col'>
      <div className='p-5 pb-0'>
        <Header me={me} />
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='favorites__t'>
          <img
            className='favorites__img'
            src='favor.svg'
            alt='favorites icon'
          />
          <h2
            className='favorites__title'
            style={{ fontSize: `${38 + size}px` }}
          >
            {eng ? 'Favorites' : 'Избранное'}
          </h2>
        </div>
        {isFavoritesLoading ? (
          'Loading'
        ) : favorites.length ? (
          <ul className='songs__list flex-1 overflow-auto'>
            <Songs songs={favorites} />
          </ul>
        ) : (
          <div className='favorites__empty p-5 text-center'>
            You do not have songs in the favorites, you can add them by clicking
            on the star next to the song name
          </div>
        )}
      </div>
    </div>
  );
};
