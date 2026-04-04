import Link from 'next/link';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yakubovskyi Roman</p>
          <p>
            Contact us:
            <Link href="mailto:yakubovskyi133@gmail.com">
              {' '}
              yakubovskyi133@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
