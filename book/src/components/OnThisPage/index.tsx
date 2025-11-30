import React from 'react';
import TOC from '@theme/TOC';

export default function OnThisPage(props) {
  return (
    <div>
      <h2>What's on this page</h2>
      <TOC {...props} />
    </div>
  );
}
