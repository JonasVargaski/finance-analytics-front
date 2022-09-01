import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  svg {
    width: 80%;
    display: block;
    margin: 0 auto;

    will-change: transform, opacity;
    animation: zoomBlur 0.45s ease-in-out both;

    @keyframes zoomBlur {
      0% {
        transform: scale(2.7);
        filter: blur(6px);
        opacity: 0.02;
      }
      100% {
        transform: scale(1);
        filter: blur(0.2px);
        opacity: 0.9;
      }
    }
  }

  @keyframes draw {
    0% {
      stroke: ${({ theme }) => theme.palette.primary};
    }
    100% {
      stroke-dashoffset: 300;
    }
  }

  @keyframes letterflash {
    0% {
      fill: ${({ theme }) => theme.palette.primary};
    }
    100% {
      fill: ${({ theme }) => theme.palette.warning};
    }
  }

  @keyframes spinnerflash {
    0% {
      stroke: ${({ theme }) => theme.palette.primary};
    }
    100% {
      stroke: ${({ theme }) => theme.palette.warning};
    }
  }

  .circle {
    stroke: ${({ theme }) => theme.palette.warning};
    stroke-dasharray: 150;
    animation: draw 2s linear infinite;
  }

  .one,
  .two,
  .three,
  .four,
  .five,
  .six {
    animation: letterflash 2s ease-in-out infinite;
  }

  .six {
    animation-delay: 0.5s;
  }

  .five {
    animation-delay: 0.4s;
  }

  .four {
    animation-delay: 0.3s;
  }

  .three {
    animation-delay: 0.2s;
  }

  .two {
    animation-delay: 0.1s;
  }

  .one {
    animation-delay: 0s;
  }
`;
