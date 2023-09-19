import { ButtonHTMLAttributes, forwardRef, RefObject, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

type ButtonProps = AriaButtonProps<'button'> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const ownRef = useRef<HTMLButtonElement>(null);

    const { buttonProps } = useButton(
      props,
      (ref as RefObject<HTMLButtonElement>) ?? ownRef,
    );

    return (
      <button {...buttonProps} ref={ref}>
        {props.children}
      </button>
    );
  },
);
