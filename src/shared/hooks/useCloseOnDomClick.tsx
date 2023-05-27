import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

type useCloseOnDomClick = ({
  targetRef,
  isOpen,
  setIsOpen,
}: {
  targetRef: RefObject<HTMLElement>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => void;

export const useCloseOnDomClick: useCloseOnDomClick = ({ targetRef, isOpen, setIsOpen }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, setIsOpen, targetRef]);
};
