import { Tooltip, TooltipProps } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';

import { TipContainer } from './styles';

interface ITipProps {
  children: NonNullable<React.ReactNode>;
  placement?: TooltipProps['placement'];
}

export function Tip({ children, placement, ...props }: ITipProps) {
  return (
    <Tooltip title={children} placement={placement || 'top-start'} {...props}>
      <TipContainer className='tip'>
        <HelpOutline />
      </TipContainer>
    </Tooltip>
  );
}
