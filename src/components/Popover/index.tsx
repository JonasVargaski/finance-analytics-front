import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { extractElementRect, IElementRect } from '~/utils/extractElementRect';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
import { Backdrop, Container } from './styles';

type tVerticalPosition = 'top' | 'center' | 'bottom';
type tHorizontalPosition = 'left' | 'center' | 'right';

interface IPopoverProps {
  open: boolean;
  className?: string;
  enableBackdrop?: boolean;
  anchorEl: any;
  children: React.ReactNode;
  anchorOrigin?: {
    vertical: tVerticalPosition;
    horizontal: tHorizontalPosition;
  };
  transformOrigin?: {
    vertical?: tVerticalPosition;
    horizontal?: tHorizontalPosition;
  };
  offset?: {
    x?: number;
    y?: number;
  };
  onRequestClose: (
    e: MouseEvent | React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement>,
  ) => void;
}

const offsetMargin = 5;

function keepWindow(util: number, node: number, total: number): number {
  const totalUtil = total - offsetMargin;
  let result = util;

  if (result + node + offsetMargin > total) result = totalUtil - node - offsetMargin;
  else if (result < offsetMargin) result = offsetMargin;

  return result;
}

function calculatePosition(
  anchor: IElementRect,
  child: IElementRect,
  anchorOrigin: IPopoverProps['anchorOrigin'],
  transformOrigin: IPopoverProps['transformOrigin'],
  offset: IPopoverProps['offset'],
  screenWidth: number,
  screenHeight: number,
) {
  let x = 0;
  let y = 0;

  if (anchorOrigin?.horizontal === 'left') {
    x = anchor.left;
  } else if (anchorOrigin?.horizontal === 'center') {
    x = anchor.left + anchor.centerX;
  } else if (anchorOrigin?.horizontal === 'right') {
    x = anchor.left + anchor.width;
  }

  if (anchorOrigin?.vertical === 'top') {
    y = anchor.top;
  } else if (anchorOrigin?.vertical === 'center') {
    y = anchor.top + anchor.centerY;
  } else if (anchorOrigin?.vertical === 'bottom') {
    y = anchor.top + anchor.height;
  }

  if (transformOrigin?.horizontal === 'center') {
    x -= child.width / 2;
  } else if (transformOrigin?.horizontal === 'right') {
    x -= child.width;
  }

  if (transformOrigin?.vertical === 'center') {
    y -= child.height / 2;
  } else if (transformOrigin?.vertical === 'bottom') {
    y -= child.height;
  }

  if (offset?.x) x += offset.x;
  if (offset?.y) y += offset.y;

  x = keepWindow(x, child.width, screenWidth);
  y = keepWindow(y, child.height, screenHeight);

  return { x, y };
}

export function Popover({
  open,
  anchorEl,
  onRequestClose,
  children,
  anchorOrigin = { horizontal: 'right', vertical: 'bottom' },
  transformOrigin,
  offset,
  className,
  enableBackdrop = true,
}: IPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let timer = 0;

    if (open) {
      const childRef = popoverRef.current;
      const anchorRef = anchorEl?.current || anchorEl;

      const setPosition = () => {
        if (anchorRef && childRef) {
          const position = calculatePosition(
            extractElementRect(anchorRef),
            extractElementRect(childRef),
            anchorOrigin,
            transformOrigin,
            offset,
            window.innerWidth,
            window.innerHeight,
          );

          timer = setTimeout(() => {
            childRef.style.left = `${position.x}px`;
            childRef.style.top = `${position.y}px`;
            childRef.style.transform = 'scale(1)';
            childRef.style.opacity = '1';
            setPosition();
          }, 10);
        }
      };

      setPosition();
    } else clearTimeout(timer);
    return () => clearTimeout(timer);
  }, [open, anchorOrigin, transformOrigin, offset, anchorEl]);

  useOnClickOutside(popoverRef, (e) => {
    if (e.button !== 2 && open) onRequestClose(e, popoverRef);
  });

  const output = (
    <>
      {enableBackdrop && <Backdrop onClick={(e) => onRequestClose(e, popoverRef)} />}
      <Container ref={popoverRef} className={className} role='presentation' data-testid='popover'>
        {children}
      </Container>
    </>
  );

  if (!open) return null;

  const root = document.getElementById('root');
  return root ? createPortal(output, root) : output;
}
