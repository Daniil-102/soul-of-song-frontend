import { Header } from './Header';
import { useGetMeQuery } from '../store/auth/auth';
import { useState } from 'react';
import { setLanguageF, setSizeF } from '../utils/settings';

export const Settings = () => {
  const { data: me, isLoading } = useGetMeQuery();
  // const size = useSelector((state) => state.settings.sizeAddition);
  // const language = useSelector((state) => state.settings.language);
  // const dispatch = useDispatch();
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'EN'
  );

  const [size, setSize] = useState(
    parseInt(localStorage.getItem('sizeAddition') || '0', 10)
  );
  const eng = language === 'EN';

  return (
    <div className='p-5'>
      {isLoading ? (
        'Loading'
      ) : (
        <>
          <Header me={me} />
          <h2 className='settings__title'>
            <img
              className='settings__icon'
              src='settings-2.svg'
              alt='settings icon'
            />
            {eng ? 'Settings' : 'Настройки'}
          </h2>
          <h3 className='text-3xl mb-3 ml-5 underline'>
            {eng ? 'Select language' : 'Выбрать язык'}
          </h3>
          <div className='settings__lang mb-12'>
            <div
              className='lang__switcher'
              data-lang={language}
              onClick={() =>
                setLanguageF(language === 'EN' ? 'RU' : 'EN', setLanguage)
              }
            >
              <div className='lang__switcher-slider'></div>
              <span
                className={`lang__switcher-side ${
                  language === 'EN' ? 'active' : ''
                }`}
              >
                En
              </span>
              <span
                className={`lang__switcher-side ${
                  language === 'RU' ? 'active' : ''
                }`}
              >
                Ru
              </span>
            </div>
            <p className='settings__text'>
              {language === 'EN'
                ? 'Ps 136:1-3: "O give thanks unto the LORD; for he is good: for his mercy endureth forever. O give thanks unto the God of gods: for his mercy endureth forever. O give thanks to the Lord of lords: for his mercy endureth forever."'
                : 'Пс 135:1-3: "Славьте Господа, ибо Он благ, ибо вовек милость Его. Славьте Бога богов, ибо вовек милость Его. Славьте Господа господствующих, ибо вовек милость Его;"'}
            </p>
          </div>
          <h3 className='text-3xl underline mb-3 ml-5'>
            {eng ? 'Select font size' : 'Выбрать размер шрифта'}
          </h3>
          <div className='settings__size'>
            <div className='settings__size-buttons'>
              <button
                onClick={() => setSizeF(size + 2, setSize)}
                className='settings__size-button'
              >
                {eng ? 'Increase size' : 'Увеличить размер'}
              </button>
              <button
                onClick={() => setSizeF(size - 2, setSize)}
                className='settings__size-button'
              >
                {eng ? 'Decrease size' : 'Уменьшить размер'}
              </button>
            </div>
            <p className='settings__size-text'>
              {eng ? 'Expample text' : 'Пример'}
            </p>
            <ul className='songs__list'>
              <li
                className='songs__item'
                style={{ fontSize: `${23 + size}px` }}
              >
                <div className='songs__item-left'>
                  <span className='songs__item-number'>7</span>Благословений
                  потоки
                </div>
                <div>
                  <img className='star' src='star-1.svg' alt='star Icon' />
                </div>
              </li>
              <li
                className='songs__item'
                style={{ fontSize: `${23 + size}px` }}
              >
                <div className='songs__item-left'>
                  <span className='songs__item-number'>48</span>Не в словах
                  молитвенных речей
                </div>
                <div>
                  <img className='star' src='star-0.svg' alt='star Icon' />
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
