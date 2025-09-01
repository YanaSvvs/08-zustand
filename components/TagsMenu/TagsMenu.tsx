import { NoteTag } from '@/types/note';
import { Dispatch, SetStateAction } from 'react';
import css from './TagsMenu.module.css';

interface TagsMenuProps {
  tags: NoteTag[];
  activeTag: NoteTag | 'all';
  onSelectTag: Dispatch<SetStateAction<NoteTag | 'all'>>;
}

const TagsMenu: React.FC<TagsMenuProps> = ({ tags, activeTag, onSelectTag }) => {
  return (
    <div className={css.tagMenu}>
      <button
        key="all"
        className={`${css.tagButton} ${activeTag === 'all' ? css.active : ''}`}
        onClick={() => onSelectTag('all')}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`${css.tagButton} ${activeTag === tag ? css.active : ''}`}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagsMenu;
