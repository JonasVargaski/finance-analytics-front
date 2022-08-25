import { useNavigate } from 'react-router-dom';
import { useWallets } from '~/hooks/resources/useWallets';

interface IWalletsProps {
  children?: React.ReactNode;
}

export function Wallets({ children }: IWalletsProps) {
  const navigate = useNavigate();
  const { data } = useWallets({ suspense: true });

  return (
    <div>
      <div>CARTEIRAS</div>
      <ul>
        {data?.map((x) => (
          <li key={x.id} style={{ display: 'flex', gap: 20 }}>
            <span>{x.name}</span>
            <b>{x.items.length} ativos</b>
            <button
              type='button'
              onClick={() => navigate(`/wallet/performace/${x.id}`, { state: x.name })}
            >
              Ver
            </button>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}
