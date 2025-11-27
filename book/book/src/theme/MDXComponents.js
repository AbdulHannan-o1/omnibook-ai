import React from 'react';
import OriginalMDXComponents from '@theme-original/MDXComponents';
import OnThisPage from '@site/src/components/OnThisPage';

export default {
  ...OriginalMDXComponents,
  // Override the default TOC component with our custom one
  TOC: OnThisPage,
};
