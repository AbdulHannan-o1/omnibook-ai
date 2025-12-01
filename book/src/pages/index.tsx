import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '@site-frontend/components/HeroSection';
import FeatureGrid from '@site-frontend/components/FeatureGrid';
import AboutSection from '@site-frontend/components/AboutSection';
import '@site-frontend/styles/variables.css';
import '@site-frontend/styles/global.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HeroSection />
      <main>
        <FeatureGrid />
        <AboutSection />
      </main>
    </Layout>
  );
}
