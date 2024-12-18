import { useGetMeQuery } from '../store/auth/auth';
import { Header } from './Header';

export const About = () => {
  const { data: me } = useGetMeQuery();
  const language = localStorage.getItem('language') || 'EN';
  const eng = language === 'EN';
  const size = parseInt(localStorage.getItem('sizeAddition') || '0', 10);

  return (
    <div className='p-5'>
      <Header me={me} />
      <h2
        className='text-center mt-12 flex justify-center items-center'
        style={{ fontSize: `${40 + size}px` }}
      >
        <img
          className={`h-${10 + Math.floor(size / 8)} mr-4`}
          src='data:image/png;base64,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'
          alt='snowman--v1'
        ></img>
        {eng ? 'About' : 'Про нас'}
      </h2>
      <main
        className='about__text max-w-[600px] mx-auto my-7'
        style={{ fontSize: `${18 + size}px` }}
      >
        <section className='mb-6'>
          <h3 className='font-bold mb-3'>
            {eng
              ? 'Welcome to "Soul of song"'
              : 'Добро пожаловать на наш сайт "Душа песни"'}
          </h3>
          <p className='mb-3'>
            {eng
              ? "Your go-to resource for songs with chords! Whether you're a beginner or a seasoned musician, we aim to make learning and playing music accessible and enjoyable."
              : 'Ваш ресурс для песни с аккордами! Как для начинающих, так и для опытных музыкантов - мы хотим сделать обучение и исполнение музыки доступными и приятными.'}
          </p>
        </section>
        <section className='mb-6'>
          <h3 className='italic font-semibold mb-2'>
            {eng ? 'What We Offer' : 'Что Мы Предлагаем'}
          </h3>
          <ul>
            <li>
              <strong>
                {eng ? 'Chords for All Levels' : 'Аккорды для Любого уровня'}
              </strong>
              {eng
                ? ': Find songs tailored to beginners and advanced players.'
                : ': Найдите песни, адаптированные для начинающих и продвинутых игроков.'}
            </li>
            <li>
              <strong>
                {eng ? 'Interactive Tools' : 'Интерактивные Инструменты'}
              </strong>
              {eng
                ? `: Easily transpose chords,
              adjust font size, and access chord diagrams.`
                : `: Легко переносить аккорды,
              настроить размер шрифта и получить доступ к схемам аккордов.`}
            </li>
            <li>
              <strong>{eng ? 'Diverse Genres' : 'Разнообразные Жанры'}</strong>
              {eng
                ? `: Explore a library of music from
              various styles and traditions.`
                : `: Исследуйте библиотеку музыки Различных стилей и традиций.`}
            </li>
          </ul>
        </section>
        <section className='mb-6'>
          <h3 className='italic font-semibold'>
            {eng ? 'Our Mission' : 'Наша Миссия'}
          </h3>
          <p>
            {eng
              ? 'We believe music is a gift from God for all. Our platform is dedicated to glorifying Him through song, encouraging creativity, deepening spiritual connection, and fostering a global community of believers who share a passion for worship and music.'
              : 'Мы верим, что музыка - это дар Бога для всех. Наша платформа посвящена прославлению Его через песни, поощрение творчества, углубление духовной связи и развитие глобального сообщества верующих, которые разделяют страсть к поклонению и музыке.'}
          </p>
        </section>
        <section>
          <h3 className='italic font-semibold'>
            {eng ? 'Join Us!' : 'Присоединяйтесь к нам!'}
          </h3>
          <p>
            {eng
              ? 'Explore songs, practice your skills, and connect with others who share your passion for music. Start your musical journey today!'
              : 'Исследуйте песни, практикуйте свои навыки и установите связь с другими людьми, которые разделяют вашу страсть к музыке. Начните свое музыкальное путешествие сегодня!'}
          </p>
        </section>
      </main>
    </div>
  );
};
