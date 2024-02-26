
import { useTranslations } from 'next-intl';
import "./globals.css";
export default function Home({ params: { locale } }) {
  const t = useTranslations('home');
  return (
    <main>
      <h1>{t('about_us')}</h1>
      <div>

      </div>
    </main>
  );
}