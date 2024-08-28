import { dir } from 'i18next';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { draftMode } from 'next/headers';

import { ContentfulPreviewProvider } from '@src/components/features/contentful';
import TranslationsProvider from '@src/components/shared/i18n/TranslationProvider';
import { Footer } from '@src/components/templates/footer';
import { Header } from '@src/components/templates/header';
import initTranslations from '@src/i18n';
import { locales } from '@src/i18n/config';

export async function generateMetadata() {
  const metatadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  } as Metadata;

  return metatadata;
}

export async function generateStaticParams(): Promise<LayoutProps['params'][]> {
  return locales.map(locale => ({ locale }));
}

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function PageLayout({ children, params }: LayoutProps) {
  const { isEnabled: preview } = draftMode();
  const { locale } = params;
  const { resources } = await initTranslations({ locale });

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        {/* <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" /> */}
      </head>

      <body>
        <TranslationsProvider locale={locale} resources={resources}>
          <ContentfulPreviewProvider
            locale={locale}
            enableInspectorMode={preview}
            enableLiveUpdates={preview}
            targetOrigin={'https://app.contentful.com'}
          >
            <main className={`${urbanist.variable} font-sans`}>
              <Header />
              {children}
              <Footer />
            </main>
            <div id="portal" className={`${urbanist.variable} font-sans`} />
          </ContentfulPreviewProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
