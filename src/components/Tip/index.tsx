import { MdInfoOutline } from 'react-icons/md';
import { Tooltip, ITooltipProps } from '~/components/Tooltip';
import { TipContainer } from './styles';

interface ITipProps extends Omit<ITooltipProps, 'content' | 'children' | 'placement'> {
  children?: React.ReactNode;
  placement?: ITooltipProps['placement'];
}

export function Tip({ children, placement, ...props }: ITipProps) {
  return (
    <Tooltip content={children} placement={placement || 'top-start'} {...props}>
      <TipContainer>
        <MdInfoOutline />
      </TipContainer>
    </Tooltip>
  );
}
