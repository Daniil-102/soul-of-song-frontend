import { useParams } from 'react-router-dom';
import {
  useChangeFavoritesMutation,
  useChangeSongMutation,
  useGetFavoritesQuery,
  useGetSongQuery,
  useLazyGetFavoritesQuery,
  useLazyGetSongQuery,
} from '../store/songs/songs';
import { Header } from './Header';
import { useGetMeQuery } from '../store/auth/auth';
import './../index.scss';
import { SongPart } from './SongPart';
import { useEffect, useRef, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { changeTone, chordMap as chords } from '../utils/chords';
import { useReactToPrint } from 'react-to-print';

export const Song = () => {
  const { id: pageId } = useParams();
  const { data: me } = useGetMeQuery();
  const { data: favorites, isLoading: isFavoritesLoading } =
    useGetFavoritesQuery();
  const { data: song, isLoading: isSongLoading } = useGetSongQuery(pageId);
  const [changeSong] = useChangeSongMutation();
  const [getSongs] = useLazyGetSongQuery();
  const [changeFavorites] = useChangeFavoritesMutation();
  const [getFavorites] = useLazyGetFavoritesQuery();

  const [chordsActive, setChordsActive] = useState(true);
  const [select, setSelect] = useState('A');
  const [songData, setSongData] = useState(null);
  const [textSize, setTextSize] = useState(18);
  const [titleSize, setTitleSize] = useState(23);
  const contentRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (song) {
      const songToUse = song._doc || song;
      setSongData(songToUse);
      setSelect(songToUse.parts[0].lines[0].chords[0].replace('m', ''));
    }
  }, [song]);

  useEffect(() => {
    if (!isFavoritesLoading && favorites) {
      setIsFavorite(!!favorites.find((f) => f._id === pageId));
    }
  }, [favorites, pageId, isFavoritesLoading]);

  const handleFavorites = async () => {
    setIsFavorite((prev) => !prev);
    await changeFavorites({ songId: pageId });
    await getFavorites();
  };

  const handlePrint = useReactToPrint({ contentRef });

  const increaseSize = () => {
    if (textSize < 52) {
      setTextSize(textSize + 2);
      setTitleSize(titleSize + 2);
    }
  };

  const decreaseSize = () => {
    if (textSize > 10) {
      setTextSize(textSize - 2);
      setTitleSize(titleSize - 2);
    }
  };

  const handleSelectChange = async (e) => {
    setSelect(e);

    const newSong = songData.parts
      .map((part) => {
        if (part.lines[0].chords.length) {
          return changeTone(part, e);
        }
      })
      .filter((s) => s !== undefined);

    await changeSong({ songId: songData.id, modifiedParts: newSong });
    await getSongs(pageId);
  };

  return (
    <div className='song p-5'>
      <Header me={me} />

      <div className='song__utils'>
        <div className='song__utils-left'>
          <button
            onClick={() => setChordsActive(!chordsActive)}
            className={`song__util ${chordsActive && 'active'}`}
          >
            <img
              src='https://img.icons8.com/sf-black-filled/64/guitar.png'
              alt='guitar'
            />
          </button>
          <Select
            value={Object.keys(chords).includes(select) ? select : ''}
            onChange={(e) => handleSelectChange(e.target.value)}
            displayEmpty
            IconComponent={() => null}
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              outline: 'none',
              minWidth: '100px',
              padding: '10px',
              fontWeight: 'bold',
              height: '100%',
              marginRight: '20px',
              borderRadius: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgb(209, 217, 223)',
              '&:hover': {
                background: 'rgb(198, 210, 219)',
              },
              '@media (min-width: 1024px)': {
                minWidth: '200px',
              },
              '&.Mui-focused': {
                border: '1px solid rgba(0, 0, 0, 0.3)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSelect-select': {
                textOverflow: 'unset',
                whiteSpace: 'nowrap',
                overflow: 'visible',
              },
            }}
          >
            {Object.keys(chords).map((chord) => {
              let tone = songData?.originalTone;
              if (tone) {
                if (tone[1] === 'b' || tone[1] === '#') {
                  tone = tone.slice(0, 2);
                } else {
                  tone = tone[0];
                }
              }
              return (
                <MenuItem key={chord} value={chord}>
                  {chord} {chord === tone && '(original)'}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className='song__utils-right'>
          <button
            className='hover:scale-110 size-button'
            onClick={increaseSize}
          >
            <img src='plus.svg' alt='plus icon' />
          </button>
          <button
            className='hover:scale-110 size-button'
            onClick={decreaseSize}
          >
            <img src='minus.svg' alt='minus icon' />
          </button>
          <button className='hover:scale-110 size-button' onClick={handlePrint}>
            <img src='print.svg' alt='print icon' />
          </button>
        </div>
      </div>

      {isSongLoading ? (
        'Loading'
      ) : (
        <div ref={contentRef}>
          <div className='flex justify-between align-middle mb-10'>
            <h2 className='song__title' style={{ fontSize: `${titleSize}px` }}>
              <span className='mr-3'>{songData?.id}</span>
              {songData?.title}
            </h2>
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
          {songData?.parts.map((part) => (
            <SongPart
              key={part.id}
              part={part}
              isChords={chordsActive}
              textSize={textSize}
            />
          ))}
        </div>
      )}
    </div>
  );
};
