import { style } from '@macaron-css/core';
import { useContext } from 'react';
import { ClientContext } from '../index';

export const Home = () => {
  const client = useContext(ClientContext);

  if (client == null) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={style({
        width: '100%',
      })}
    >
      <div
        className={style({
          backgroundColor: 'red',
          margin: '0 auto',
          width: '70%',
          height: '400px',
        })}
      ></div>

      <div
        className={style({
          height: '24px',
        })}
      ></div>

      <div
        className={style({
          display: 'flex',
          justifyContent: 'space-around',
          margin: '0 auto',
          width: '30%',
        })}
      >
        <button
          onClick={() =>
            client.setColor.query('orange').then((res) => {
              console.log('res', { res });
            })
          }
        >
          Orange
        </button>
        <button>Purple</button>
      </div>
    </div>
  );
};
