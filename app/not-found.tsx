import { Metadata } from 'next';
import Link from 'next/link';
import notFoundStyles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'NoteHub - Page Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'NoteHub - Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: 'https://notehub.vercel.app/404', 
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const NotFound = () => {
  return (
    <main className={notFoundStyles.main}>
      <div className={notFoundStyles.container}>
        <h1 className={notFoundStyles.title}>404 - Page not found</h1>
        <p className={notFoundStyles.text}>Sorry, the page you are looking for does not exist.</p>
        <Link href="/notes" className={notFoundStyles.link}>
          Go to notes
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
