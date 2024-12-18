import { useEffect, useState } from 'react';
import {
  useChangeFavoritesMutation,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
} from '../store/songs/songs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SongPreview = ({ song }) => {
  const { data: favorites, isLoading: isFavoritesLoading } =
    useGetFavoritesQuery();
  const [changeFavorites] = useChangeFavoritesMutation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [getFavorites] = useLazyGetFavoritesQuery();
  // const size = useSelector((state) => state.settings.sizeAddition);
  const size = parseInt(localStorage.getItem('sizeAddition') || '0', 10);

  useEffect(() => {
    if (!isFavoritesLoading && favorites) {
      setIsFavorite(!!favorites.find((f) => f._id === song._id));
    }
  }, [song._id, isFavoritesLoading]);

  const handleFavorites = async () => {
    setIsFavorite((prev) => !prev);
    await changeFavorites({ songId: song._id });
    await getFavorites();
  };
  return (
    <li
      className='songs__item'
      style={{ fontSize: `${23 + size}px` }}
      key={song.id}
    >
      <div className='songs__item-left'>
        <Link to={`/${song._id}`}>
          <span className='songs__item-number'>{song.id}</span>
          {song.title}
        </Link>
      </div>
      <div>
        {!isFavorite ? (
          <img
            onClick={handleFavorites}
            className='star'
            src='star-0.svg'
            alt='star Icon'
          />
        ) : (
          <img
            onClick={handleFavorites}
            className='star'
            src='star-1.svg'
            alt='star Icon'
          />
        )}
      </div>
    </li>
  );
};
