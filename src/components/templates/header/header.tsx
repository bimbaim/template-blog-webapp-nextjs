import Link from 'next/link';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  return (
    <header className="pt-4 pb-8 lg:pt-5 xl:py-10">
      <nav>
        <Container className="flex justify-between py-2">
          <div>
            <Link href="/">
              <BlogLogo />
            </Link>
          </div>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};