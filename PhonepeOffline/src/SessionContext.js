import { createContext } from 'react';

const SessionContext = createContext({
  state: {
    walletBalance: 0,
    pendingTransactions: []
  },
  dispatch: () => { }
});

export default SessionContext;
