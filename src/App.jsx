import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useGetSongsQuery } from './store/songs/songs';
import { Songs } from './components/Songs';
import { debounce } from './utils/debounce';
import {
  useGetMeQuery,
  useLazyGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
} from './store/auth/auth';
import toast from 'react-hot-toast';
import { Header } from './components/Header';

const ONLYLETTERS_REGEX = /^[\p{L}]+([\p{L}\s]*[\p{L}]+)?$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const { data, isLoading, error } = useGetSongsQuery();
  const { data: me } = useGetMeQuery();
  const [register] = useRegisterMutation();
  const [loginData] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  // const size = useSelector((state) => state.settings.sizeAddition);

  const [login, setLogin] = useState(true);
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const language = localStorage.getItem('language') || 'EN';
  const eng = language === 'EN';

  const size = parseInt(localStorage.getItem('sizeAddition') || '0', 10);

  const validateName = (name) => {
    if (!login && name.trim().length < 3) {
      return 'Min length is 3.';
    } else if (!login && !ONLYLETTERS_REGEX.test(name.trim())) {
      return 'Only letters.';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required.';
    } else if (!EMAIL_REGEX.test(email)) {
      return 'Invalid email format.';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 5) {
      return 'At least 5 characters.';
    }
    return '';
  };

  const onNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!login && name.trim().length < 3) {
      newErrors.name = 'Min length is 3.';
    } else if (!login && !ONLYLETTERS_REGEX.test(name.trim())) {
      newErrors.name = 'Only letters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (password.length < 5) {
      newErrors.password = 'At least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let data = {
      password,
      email,
    };

    if (!login) {
      data = { ...data, name };
    }

    try {
      let response;
      if (login) {
        response = await loginData(data).unwrap();
      } else {
        response = await register(data).unwrap();
      }
      window.localStorage.setItem('token', response?.token);
      await getMe();
      toast.success('Success');
    } catch (err) {
      toast.error('Invalid data');
      console.error(err);
    }
  };

  const applyInput = useCallback(debounce(setSongs), []);

  const onInputChange = (e) => {
    setInput(e);
    applyInput(
      [...data]
        .filter(
          (song) =>
            song.title.toLowerCase().startsWith(e.trim().toLowerCase()) ||
            song.id.toString().startsWith(e.trim())
        )
        .sort((a, b) => a.id - b.id)
    );
  };

  useEffect(() => {
    if (data) {
      setSongs([...data].sort((a, b) => a.id - b.id));
    }
  }, [data]);

  return (
    <>
      {!me ? (
        <div className='z-[101] p-5 min-h-full h-full overflow-hidden flex items-center justify-center form__container absolute top-0 right-0 w-[100vw] shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0'>
          <form className='form m-5' onSubmit={handleSubmit}>
            <h2 className='form__title'>
              {login
                ? eng
                  ? 'Sign in'
                  : 'Вход'
                : eng
                ? 'Sign up'
                : 'Регистация'}
            </h2>
            <div className='form__content'>
              {!login && (
                <div className='relative'>
                  <input
                    type='text'
                    value={name}
                    onChange={onNameChange}
                    placeholder={eng ? 'Enter fullname' : 'Введите полное имя'}
                    className='form__input'
                  />
                  {errors.name && (
                    <div className='form__error'>{errors.name}</div>
                  )}
                </div>
              )}
              <div className='relative'>
                <input
                  value={email}
                  onChange={onEmailChange}
                  type='email'
                  placeholder={eng ? 'Enter email' : 'Введите email'}
                  className='form__input'
                />
                {errors.email && (
                  <div className='form__error'>{errors.email}</div>
                )}
              </div>
              <div className={`relative  ${errors.password && 'mb-6'}`}>
                <input
                  type='password'
                  value={password}
                  onChange={onPasswordChange}
                  placeholder={eng ? 'Enter password' : 'Введите пароль'}
                  className='form__input'
                />
                {errors.password && (
                  <div className='form__error'>{errors.password}</div>
                )}
              </div>
            </div>

            <button
              type='button'
              onClick={() => setLogin(!login)}
              className='form__check'
            >
              {login
                ? eng
                  ? "Don't have an account?"
                  : 'Нет аккаунта?'
                : eng
                ? 'Already have an acount?'
                : 'Уже есть аккаунт?'}
            </button>
            <button className='form__button'>
              {eng ? 'Submit' : 'Отправить'}
            </button>
          </form>
        </div>
      ) : (
        ''
      )}
      <main className='main'>
        <div className='main__content'>
          <Header me={me} />
          <div className='main_top' style={{ fontSize: `${30 + size}px` }}>
            <div className='flex items-center'>
              <h1
                className='font-bold text-slate-800'
                style={{ fontSize: `${36 + size}px` }}
              >
                {eng ? 'Soul of song' : 'Душа песни'}
              </h1>
            </div>

            <div
              className='main_desc text-pretty mt-2 font-normal max-w-[400px] text-center text-gray-800'
              style={{ fontSize: `${20 + size}px` }}
            >
              {eng
                ? 'Discover your favorite songs, explore chords, adjust the tone, and save tracks you love—all in one place.'
                : 'Откройте для себя любимые песни, исследуйте аккорды, настройте тон и сохраняйте любимые треки - все в одном месте.'}
            </div>
          </div>
          <div className='main_middle flex flex-col items-center justify-center'>
            <div
              className='text-center font-semibold italic max-w-[600px] pb-16'
              style={{ fontSize: `${20 + size}px` }}
            >
              <p className='mb-3'>
                {eng
                  ? '"O come, let us sing unto the LORD: let us make a joyful noise to the rock of our salvation. Let us come before his presence with thanksgiving, and make a joyful noise unto him with psalms. For the LORD is a great God, and a great King above all gods."'
                  : '"Приидите, воспоем Господу, воскликнем твердыне спасения нашего; предстанем лицу Его со славословием, в песнях воскликнем Ему, ибо Господь есть Бог великий и Царь великий над всеми богами."'}
              </p>
              <span className='font-bold'>
                {eng ? 'Ps 95:1-3' : 'Пс 94:1-3'}
              </span>
            </div>
          </div>
        </div>
        <div className='main_bottom'>
          <input
            type='text'
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className='input block w-full rounded-3xl'
            placeholder={
              eng ? 'Search for your song...' : 'Найдите вашу песню...'
            }
            style={{ fontSize: `${21 + size}px` }}
          />
        </div>
      </main>
      {me ? (
        <div>
          {isLoading ? (
            'Loading'
          ) : error ? (
            <div className='text-red-700'>{error}</div>
          ) : songs.length ? (
            <ul className='songs__list'>
              <Songs songs={songs} />
            </ul>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default App;
