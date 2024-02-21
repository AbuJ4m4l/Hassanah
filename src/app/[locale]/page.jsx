
import { useTranslations } from 'next-intl';

export default function Home({ params: { locale } }) {
  const t = useTranslations('home');

  const userName = 'David';

  return (
    <main>
      <h1>{t('about_us')}</h1>
      <div>

      </div>
    </main>
  );
}