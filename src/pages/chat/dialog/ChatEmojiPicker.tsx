import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { memo, useRef, useState } from 'react';

import { useCloseOnDomClick } from '@/shared/hooks/useCloseOnDomClick';

import { ReactComponent as EmojiIcon } from 'svg/emoji.svg';

interface IChatEmojiPicker {
  onEmojiClick: (emoji: EmojiClickData) => void;
}

export const ChatEmojiPicker = memo(({ onEmojiClick }: IChatEmojiPicker) => {
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useCloseOnDomClick({ isOpen: showEmojis, setIsOpen: setShowEmojis, targetRef: emojiRef });

  return (
    <div className="absolute top-1/2 right-4 -translate-y-1/2">
      {showEmojis && (
        <div className="absolute bottom-11 -right-14" ref={emojiRef}>
          <EmojiPicker
            width={300}
            theme={Theme.DARK}
            skinTonesDisabled
            searchDisabled
            autoFocusSearch={false}
            previewConfig={{ showPreview: false }}
            lazyLoadEmojis
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
      <button
        className="hover:text-accentColor transition-bg"
        onClick={() => setShowEmojis((prev) => !prev)}
      >
        <EmojiIcon />
      </button>
    </div>
  );
});
