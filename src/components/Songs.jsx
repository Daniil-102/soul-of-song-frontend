import { Link } from 'react-router-dom';
import { SongPreview } from './SongPreview';

export const Songs = ({ songs }) => {
  return (
    <>
      {songs.map((song) => (
        <SongPreview key={song.id} song={song} />
      ))}
    </>
  );
};
