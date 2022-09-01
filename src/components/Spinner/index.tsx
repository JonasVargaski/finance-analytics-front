import styled from '@emotion/styled';

interface ISpinnerProps {
  color?: string;
  size?: number;
}

export const Spinner = styled((props: ISpinnerProps) => (
  <svg
    {...props}
    version='1.1'
    id='loader'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 50 50'
    xmlSpace='preserve'
  >
    <path
      fill='#000'
      d='M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z'
    >
      <animateTransform
        attributeType='xml'
        attributeName='transform'
        type='rotate'
        from='0 25 25'
        to='360 25 25'
        dur='0.6s'
        repeatCount='indefinite'
      ></animateTransform>
    </path>
  </svg>
))`
  color: ${({ color, theme }) => color || theme.palette.primary};
  font-size: ${({ size }) => (size ? `${size}px` : '1.5rem')};
  width: 2em;
  height: 2em;
  user-select: none;

  path {
    fill: currentColor;
    user-select: none;
    box-sizing: inherit;
  }
`;
