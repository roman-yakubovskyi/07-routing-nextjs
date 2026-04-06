import css from './SidebarNotes.module.css';
import Link from 'next/link';

const noteTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {noteTags.map(noteTag => (
        <li key={noteTag} className={css.menuItem}>
          <Link href={`/notes/filter/${noteTag}`} className={css.menuLink}>
            {noteTag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
