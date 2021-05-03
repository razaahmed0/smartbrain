import React from 'react';

function Rank({ user }) {
  return (
    <div>
      <div className='f3'>{`${user.name} your current rank is...`}</div>
      <div className='f1'>{user.entries}</div>
    </div>
  );
}

export default Rank;
