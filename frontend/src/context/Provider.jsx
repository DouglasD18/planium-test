import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContest from './MyContext';

function Provider({ children }) {
  const [propostas, setPropostas] = useState([]);

  const states = {
    propostas,
    setPropostas,
  };

  return (
    <main>
      <MyContest.Provider value={ states }>
        { children }
      </MyContest.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;