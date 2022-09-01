import React, { cloneElement, useState, useRef, useEffect, PointerEvent } from 'react';
import ReactDOM from 'react-dom';

import { extractElementRect, IElementRect } from '~/utils/extractElementRect';
import { Container } from './styles';

const offsetScreen = 3;

type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

interface IInvert {
  X: {
    [k in TooltipPlacement]: TooltipPlacement;
  };
  Y: {
    [k in TooltipPlacement]: TooltipPlacement;
  };
}

const invert: IInvert = {
  X: {
    'top-start': 'top-end',
    'top-end': 'top-start',
    'left-start': 'right-start',
    'right-start': 'left-start',
    left: 'right',
    right: 'left',
    top: 'left-start',
    bottom: 'left-end',
    'left-end': 'right-end',
    'right-end': 'left-end',
    'bottom-start': 'bottom-end',
    'bottom-end': 'bottom-start',
  },
  Y: {
    'top-start': 'bottom-start',
    'bottom-start': 'top-start',
    'left-start': 'left-end',
    'left-end': 'left-start',
    top: 'bottom',
    bottom: 'top',
    left: 'top-start',
    right: 'top-end',
    'top-end': 'bottom-end',
    'bottom-end': 'top-end',
    'right-start': 'right-end',
    'right-end': 'right-start',
  },
};

interface IReturnCalculatePosition {
  x: number;
  y: number;
  transform: string;
  arrowClass: TooltipPlacement;
}

const calculatePosition = (
  container: IElementRect,
  target: IElementRect,
  placement: TooltipPlacement,
  spacing: number,
): IReturnCalculatePosition => {
  let x = 0;
  let y = 0;
  let transform = '';

  if (placement === 'top') {
    y = container.top - target.height;
    x = container.left + container.centerX - target.centerX;
    transform = `translateY(-${spacing}px)`;
  } else if (placement === 'bottom') {
    y = container.top + container.height;
    x = container.left + container.centerX - target.centerX;
    transform = `translateY(${spacing}px)`;
  } else if (placement === 'left') {
    y = container.top + container.centerY - target.centerY;
    x = container.left - target.width;
    transform = `translateX(-${spacing}px)`;
  } else if (placement === 'right') {
    y = container.top + container.centerY - target.centerY;
    x = container.left + container.width;
    transform = `translateX(${spacing}px)`;
  } else if (placement === 'top-start') {
    y = container.top - target.height;
    x = container.left;
    transform = `translate(0, -${spacing}px)`;
  } else if (placement === 'top-end') {
    y = container.top - target.height;
    x = container.left + container.width - target.width;
    transform = `translateY(-${spacing}px)`;
  } else if (placement === 'bottom-start') {
    y = container.top + container.height;
    x = container.left;
    transform = `translateY(${spacing}px)`;
  } else if (placement === 'bottom-end') {
    y = container.top + container.height;
    x = container.left + container.width - target.width;
    transform = `translateY(${spacing}px)`;
  } else if (placement === 'left-start') {
    y = container.top;
    x = container.left - target.width;
    transform = `translateX(-${spacing}px)`;
  } else if (placement === 'left-end') {
    y = container.top + container.height - target.height;
    x = container.left - target.width;
    transform = `translateX(-${spacing}px)`;
  } else if (placement === 'right-start') {
    y = container.top;
    x = container.left + container.width;
    transform = `translateX(${spacing}px)`;
  } else if (placement === 'right-end') {
    y = container.top + container.height - target.height;
    x = container.left + container.width;
    transform = `translateX(${spacing}px)`;
  }
  return { x, y, transform, arrowClass: placement };
};

const getTooltipPosition = (
  container: IElementRect,
  target: IElementRect,
  placement: TooltipPlacement,
  spacing: number,
  screenX: number,
  screenY: number,
  loop = 1,
): IReturnCalculatePosition => {
  const position = calculatePosition(container, target, placement, spacing);

  if (loop > 4) return position;

  if (position.x < offsetScreen || position.x + target.width + offsetScreen > screenX) {
    return getTooltipPosition(
      container,
      target,
      invert.X[placement],
      spacing,
      screenX,
      screenY,
      loop + 1,
    );
  }

  if (position.y < offsetScreen || position.y + target.height + offsetScreen > screenY) {
    return getTooltipPosition(
      container,
      target,
      invert.Y[placement],
      spacing,
      screenX,
      screenY,
      loop + 1,
    );
  }

  return position;
};

interface ITooltipContentProps {
  content: React.ReactNode | string | number | null;
  container: IElementRect;
  placement: TooltipPlacement;
  duration: number;
  arrow?: boolean;
  unStyled?: boolean;
  spacing: number;
  className?: string;
}

function TooltipContent({
  content,
  container,
  placement,
  duration,
  arrow,
  spacing,
  className,
  unStyled,
}: ITooltipContentProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tooltipRef.current;
    if (el) {
      const target = extractElementRect(el);

      const position = getTooltipPosition(
        container,
        target,
        placement,
        spacing,
        window.innerWidth - offsetScreen,
        window.innerHeight - offsetScreen,
      );

      el.style.transitionDuration = `${duration}ms`;

      setTimeout(() => {
        el.style.left = `${position.x}px`;
        el.style.top = `${position.y}px`;
        el.style.transform = position.transform;
        el.style.opacity = '1';
        if (arrow) el.classList.add(`_tooltip--${position.arrowClass}`);
      }, 80);
    }
    // eslint-disable-next-line
  }, []);

  const classes = `_tooltip ${className || ''}`;

  const output = (
    <Container
      role='tooltip'
      data-testid='tooltip'
      className={classes}
      unStyled={!!unStyled}
      ref={tooltipRef}
    >
      {content}
    </Container>
  );

  const root = document.getElementById('root');

  return root ? ReactDOM.createPortal(output, root) : output;
}

export interface ITooltipProps {
  children: React.ReactElement<any>;
  content: React.ReactNode;
  placement: TooltipPlacement;
  unStyled?: boolean;
  spacing?: number;
  animationDuration?: number;
  enterDelay?: number;
  leaveDelay?: number;
  arrow?: boolean;
  className?: string;
}

export function Tooltip({
  children,
  placement,
  spacing = 8,
  animationDuration = 150,
  enterDelay,
  leaveDelay,
  content,
  unStyled,
  className,
  arrow,
  ...props
}: ITooltipProps) {
  const tipRef = useRef<HTMLDivElement>();
  const timerRef = useRef(0);

  const [show, setShow] = useState(false);
  const [elPosition, setElPosition] = useState<IElementRect>({
    x: 0,
    y: 0,
    bottom: 0,
    right: 0,
    height: 0,
    left: 0,
    top: 0,
    width: 0,
    centerX: 0,
    centerY: 0,
  });

  function requestOpen(e: PointerEvent<HTMLDivElement>) {
    clearTimeout(timerRef.current);
    setElPosition(extractElementRect(e.currentTarget));
    tipRef.current = e.currentTarget;

    if (!show && enterDelay && enterDelay > 0)
      timerRef.current = setTimeout(() => setShow(true), enterDelay);
    else setShow(true);
  }

  function requestClose() {
    clearTimeout(timerRef.current);

    if (show && leaveDelay && leaveDelay > 0)
      timerRef.current = setTimeout(() => setShow(false), leaveDelay);
    else setShow(false);
  }

  useEffect(() => {
    const moveListenner = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      if (!tipRef?.current) return;

      const { height, left, top, width } = extractElementRect(tipRef.current);
      if (clientX < left || clientX > left + width || clientY < top || clientY > top + height)
        requestClose();
    };

    const scrollListener = () => {
      setShow(false);
      clearTimeout(timerRef.current);
    };

    if (show) {
      window.addEventListener('mousemove', moveListenner, true);
      window.addEventListener('scroll', scrollListener, true);
    } else {
      window.removeEventListener('mousemove', moveListenner, true);
      window.removeEventListener('scroll', scrollListener, true);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', moveListenner, true);
      window.removeEventListener('scroll', scrollListener, true);
    };
  }, [show]);

  if (!content) return children;

  return (
    <>
      {show && (
        <TooltipContent
          container={elPosition}
          placement={placement}
          content={content}
          duration={animationDuration}
          spacing={spacing}
          unStyled={unStyled}
          className={className}
          arrow={arrow}
          {...props}
        />
      )}

      {cloneElement(children, {
        'data-testid': content,
        ...children.props,
        onPointerEnter: requestOpen,
        onPointerLeave: requestClose,
      })}
    </>
  );
}
