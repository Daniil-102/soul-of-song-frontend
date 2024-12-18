/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/auth/auth';

export const Header = ({ me }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  // const size = useSelector((state) => state.settings.sizeAddition);
  const size = parseInt(localStorage.getItem('sizeAddition') || '0', 10);
  const language = localStorage.getItem('language') || 'EN';
  const eng = language === 'EN';

  const onClickLogout = async () => {
    try {
      await logout();
      window.localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='relative'>
      <div
        className={`menu ${menuOpen ? 'open' : ''}`}
        style={{ fontSize: `${35 + size}px` }}
      >
        <div className='menu__content'>
          <div className='menu__top'>
            <h2 className='menu__name'>{me?.name}</h2>
            <button onClick={() => setMenuOpen(false)}>
              <img className='menu__close' src='close.svg' alt='Close button' />
            </button>
          </div>
          <ul className='menu__list'>
            <li>
              <Link to='/'>
                <div
                  className='menu__item'
                  style={{ fontSize: `${32 + size}px` }}
                >
                  <img
                    className='mr-4'
                    src='allSongs.svg'
                    alt='all images icon'
                  />
                  <span>{eng ? 'All songs' : 'Все песни'}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/favorites'>
                <div className='menu__item'>
                  <img
                    className='mr-4'
                    src='favorites.svg'
                    alt='favorites icon'
                  />
                  <span>{eng ? 'Favorites' : 'Избранные'}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/settings'>
                <div className='menu__item'>
                  <img
                    className='mr-4'
                    src='settings.svg'
                    alt='settings icon'
                  />
                  <span>{eng ? 'Settings' : 'Настройки'}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/about'>
                <div className='menu__item'>
                  <img className='mr-4' src='about.svg' alt='about icon' />
                  <span>{eng ? 'About' : 'Про нас'}</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={onClickLogout}
          className='flex justify-end absolute right-5 bottom-5'
        >
          <img src='logout.png' alt='logout icon' />
        </button>
      </div>
      <div className='main__header flex justify-between'>
        <Link to='/'>
          <svg
            className='noteIcon'
            viewBox='0 0 256 256'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect fill='none' height='256' width='256' />
            <circle
              cx='180'
              cy='172'
              fill='none'
              r='28'
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
            />
            <circle
              cx='52'
              cy='204'
              fill='none'
              r='28'
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
            />
            <line
              fill='none'
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
              x1='208'
              x2='80'
              y1='80'
              y2='112'
            />
            <polyline
              fill='none'
              points='80 204 80 64 208 32 208 172'
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
            />
          </svg>
        </Link>
        <button onClick={() => setMenuOpen(true)}>
          <svg
            height='32px'
            id='Layer_1'
            style={{ enableBackground: 'new 0 0 32 32' }}
            version='1.1'
            viewBox='0 0 32 32'
            width='32px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z' />
          </svg>
        </button>
      </div>
    </div>
  );
};
