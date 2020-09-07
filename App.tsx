import React from 'react';
import Main from './app/Main';

declare var global: { HermesInternal: null | {} };
import HOC from './app/hoc/HOC';

const App = () => {

  return (
    <HOC>
      <Main />
    </HOC>
  );
};

function HeadlessCheck({ isHeadless }: any) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

export default HeadlessCheck;