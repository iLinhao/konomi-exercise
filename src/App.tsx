import React, {useCallback, useState} from 'react';
import './App.css';
import Oracle from './pages/oracle/Oracle';
import Web3Transfer from './pages/web3/Web3';

const navItems = [
  { key: 'Web3', label: 'web3 Transfer' },
  { key: 'Oracle', label: 'Oracle' },
]

function App() {
  const [pageType, setPageType] = useState('Web3');

  const onMenuClick = (item: any) => {
    setPageType(item.key);
  }

  return (
    <div>
      <div className='layout-header'>
        {navItems.map(item =>
          <p
            key={item.key}
            onClick={() => onMenuClick(item)}
            className={`${item.key == pageType ? 'active-menu' : 'menu'}`}
          >{item.label}</p>)}
      </div>
      <div className="layout-background">
        {pageType === 'Oracle' && <Oracle />}
        {pageType === 'Web3' && <Web3Transfer />}
      </div>
    </div>
  );
}

export default App;
