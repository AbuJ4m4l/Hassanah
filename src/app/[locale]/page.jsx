"use client";
import { useTranslations } from 'next-intl';
import "./globals.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
export default function Home({ params: { locale } }) {
  const t = useTranslations('home');
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <main>
      <h1>{t('about_us')}</h1>
      <div>
      </div>
    </main>
  );
}