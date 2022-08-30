import { Container } from './styles';

export function Test() {
  return (
    <Container>
      <div className='list-modal-backdrop'>
        <div className='list-modal'>
          <header className='list-modal-header'>
            <button type='button'>X Fechar</button>
          </header>

          <ul className='list-modal-content'>
            <li className='list-modal-section'>
              <b>COMPRA</b>
              <div className='list-modal-item list-modal-item--active'>
                <label htmlFor='1'>
                  <p className='list-modal-item-title'>Ajuda para comprar asdsda ds aasd asd</p>
                  <span className='list-modal-item-description'>
                    Texto complementar do produto dsadsasddsasad asddsa{' '}
                  </span>
                </label>
                <input name='item' id='1' type='radio' />
              </div>
            </li>
          </ul>

          <div className='list-modal-footer'>
            <button type='button'>Enviar</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
