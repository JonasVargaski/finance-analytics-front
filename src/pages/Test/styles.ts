import styled from '@emotion/styled';

export const Container = styled.div`
  width: 65vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px auto;

  .list-modal-backdrop {
    position: absolute;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(158, 158, 158, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .list-modal {
      max-height: calc(100% - 50px);
      box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.33);
      border-top-left-radius: 13px;
      border-top-right-radius: 13px;
      overflow: hidden;
      background-color: #fff;

      .list-modal-header > button {
        width: 100%;
        height: 38px;
        outline: none;
        border: none;
        font-weight: 500;
        text-align: center;
        background-color: #00f;
        color: #fff;
      }

      .list-modal-content {
        padding: 4px;
        overflow-y: auto;
        list-style: none;
        position: relative;

        li {
          padding: 20px 0 5px;
          > b {
            display: block;
            text-transform: uppercase;
            font-weight: bold;
            margin: 0 0 8px 12px;
          }

          .list-modal-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 14px 5px 12px;
            > label {
              width: 100%;
              p.list-modal-item-title {
                margin: 0;
                padding: 0;
              }
              span.list-modal-item-description {
                font-size: 12px;
              }
            }

            > input {
              margin-left: 10px;
              height: 20px;
              width: 20px;
            }

            &.list-modal-item--active {
              border-radius: 3px;
              background-color: lightgreen;
            }
          }
        }
      }

      .list-modal-footer {
        padding: 6px 8px 10px 8px;
        button {
          outline: none;
          border: none;
          width: 100%;
          height: 32px;
          border-radius: 6px;
        }
      }
    }
  }
`;
