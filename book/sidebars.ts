import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'chapter-1-introduction-to-physical-ai-and-humanoid-robotics',
    'chapter-2-components-of-physical-ai-systems',
    'chapter-3-ai-algorithms-and-machine-learning-in-physical-ai',
    'chapter-4-human-robot-interaction-and-ethical-considerations',
    'chapter-5-future-trends-and-advanced-concepts-in-physical-ai-and-humanoid-robotics',
    'chapter-6-impact-and-societal-implications-of-physical-ai-and-humanoid-robotics',
    'chapter-7-case-studies-and-real-world-applications',
    'chapter-8-advanced-topics-in-physical-ai',
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
