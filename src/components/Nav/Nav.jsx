import React, { Fragment, useContext } from 'react';
import { Menu } from 'antd';
import { capitalize } from 'lodash';
import Context from '../../Context';
import './Nav.css';

const Nav = () => {
  const { state, dispatch, openTab } = useContext(Context);
  const { openedTab } = state;
  const tabs = ['search', 'rated'];

  return (
    <div className="container centered">
      <Menu
        mode='horizontal'
        selectedKeys={[openedTab]}
        className='menu'
      >
        {
          tabs.map(tab => (
            <Fragment key={tab}>
              <Menu.Item key={tab} onClick={() => dispatch(openTab(tab))}>
                {capitalize(tab)}
              </Menu.Item>
            </Fragment>
          ))
        }
      </Menu>
    </div>
  );
}

export default Nav;
