import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
const Footer = ({ locale }) => {
  const t = useTranslations("footer");

  return (
    <footer className="select-none bg-secondry w-full h-[540px] sm:h-[350px]">
      <div className="flex flex-row">
        <Image
          src="/images/hassanahLoggo-white.png"
          alt="Hassanah Logo"
          width={60}
          height={60}
          className="m-7 rounded-full"
          loading="lazy"
        ></Image>
        <h2 className="mt-11 text-primary">{t('hassanah')}</h2>
      </div>
      <hr className="w-[95%] m-[2.5%] my-4 border-primary lg:w-[70%] lg:mx-[15%]" />
      <div className="sm:hidden flex-row justify-center flex my-[10px]">
        <Link href="https://example.com" className="mx-3"><FontAwesomeIcon icon={faFacebook} size="xl" /></Link>
        <Link href="https://example.com" className="mx-3"><FontAwesomeIcon icon={faInstagram} size="xl" /></Link>
        <Link href="https://example.com" className="mx-3"><FontAwesomeIcon icon={faXTwitter} size="xl" /></Link>
      </div>
      <div className="flex flex-row space-x-3 px-3 justify-evenly my-[10px] lg:w-[800px] lg:mx-[10%] 2xl:mx-[15%]">
        <div className="sm:block hidden">
          <h3 className="text-primary text-lg">{t('helpfull_links')}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs"><Link href="/">{t('home')}</Link></li>
            <li className="text-xs"><Link href="/quran">{t('quran')}</Link></li>
            <li className="text-xs"><Link href="/stories">{t('stories')}</Link></li>
            <li className="text-xs"><Link href="/hadthis">{t('hadiths')}</Link></li>
          </ul>
        </div>
        <div className="sm:block hidden">
          <h3 className="text-primary text-lg">{t('company')}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs"><Link href="/about">{t('about_hasana')}</Link></li>
            <li className="text-xs"><Link href="/about-blueteam">{t('about_blueteam')}</Link></li>
            <li className="text-xs"><Link href="/news">{t('news')}</Link></li>
          </ul>
        </div>
        <div className="hidden sm:block">
          <h3 className="text-primary text-lg">{t('support_center')}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs"><Link href="/support-center?request=problem">{t('i_have_problem')}</Link></li>
            <li className="text-xs"><Link href="/support-center?request=question">{t('i_have_question')}</Link></li>
          </ul>
        </div>
        <div className="hidden sm:block">
          <h3 className="text-primary text-lg">{t('policies')}</h3>
          <ul className="space-y-3 mt-4">
            <li className="text-xs"><Link href="/terms">{t('terms_of_use')}</Link></li>
            <li className="text-xs"><Link href="/privacy">{t('privacy_policy')}</Link></li>
          </ul>
        </div>
        <div className="hidden sm:flex sm:flex-row">
          <Link href="https://example.com" className="mx-3"><FontAwesomeIcon icon={faFacebook} size="xl" /></Link>
          <Link href="https://example.com" className="mx-3"><FontAwesomeIcon icon={faInstagram} size="xl" /></Link>
          <Link href="https://example.com" className="mx-3"><FontAwesomeIcon icon={faXTwitter} size="xl" /></Link>
        </div>
      </div>
      <div className="px-3 space-x-5 sm:hidden flex justify-evenly my-[10px]">
        <div className="space-y-5">
          <div className="block sm:hidden">
            <h3 className="text-primary text-lg">{t('helpfull_links')}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs"><Link href="/">{t('home')}</Link></li>
              <li className="text-xs"><Link href="/quran">{t('quran')}</Link></li>
              <li className="text-xs"><Link href="/stories">{t('stories')}</Link></li>
              <li className="text-xs"><Link href="/hadthis">{t('hadiths')}</Link></li>
            </ul>
          </div>
          <div className="block sm:hidden">
            <h3 className="text-primary text-lg">{t('company')}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs"><Link href="/about">{t('about_hasana')}</Link></li>
              <li className="text-xs"><Link href="/about-blueteam">{t('about_blueteam')}</Link></li>
              <li className="text-xs"><Link href="/news">{t('news')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="space-y-20">
          <div>
            <h3 className="text-primary text-lg">{t('support_center')}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs">{t('i_have_problem')}</li>
              <li className="text-xs">{t('i_have_question')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary text-lg">{t('policies')}</h3>
            <ul className="space-y-3 mt-4">
              <li className="text-xs"><Link href="/terms">{t('terms_of_use')}</Link></li>
              <li className="text-xs"><Link href="/privacy">{t('privacy_policy')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="w-[95%] m-[2.5%] my-4 border-primary lg:w-[70%] lg:mx-[15%]" />
      <div className="flex justify-center">
        <p className="text-xs">{t('copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;