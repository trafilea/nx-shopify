import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Helmet from 'react-helmet';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';

const features = [
  {
    title: 'Improved Dev Ergonomics',
    imageUrl: 'img/undraw_online_party.svg',
    description: (
      <>
        Get the most out of working with Nx workspaces and type-safe development
        using TypeScript. You also get BrowserSync!
      </>
    ),
  },
  {
    title: 'Local Development Server',
    imageUrl: 'img/undraw_dev_productivity.svg',
    description: (
      <>
        Nx-Shopify runs a local development server so you don't need to upload
        JS and CSS assets to Shopify during development.
      </>
    ),
  },
  {
    title: 'Code Generators',
    imageUrl: 'img/undraw_code_typing.svg',
    description: (
      <>
        Nx-Shopify comes with themes, layouts, templates, snippets and sections
        generators. You don't have to write that boilerplate code anymore!
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const gettingStartedCode = `$ npx create-nx-workspace my-org --preset=empty
$ cd ./my-org
$ npm i -D @trafilea/nx-shopify
$ nx g @trafilea/nx-shopify:theme my-theme`;

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="Nx-Shopify official documentation site"
    >
      <Helmet>
        <title>Nx-Shopify - Performance-first Shopify themes development</title>
        <meta
          name="description"
          content="Nx-Shopify - Nx plugin for developing performance-first Shopify themes"
        />
      </Helmet>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="hero__blocks">
            <div className="hero__intro">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
            <CodeBlock className={'start-code'}>{gettingStartedCode}</CodeBlock>
          </div>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--primary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
            <iframe src="https://ghbtns.com/github-btn.html?user=trafilea&repo=nx-shopify&type=star&count=true&size=large"></iframe>
          </div>
        </div>
      </header>
      <main>
        <section>
          {features && features.length > 0 && (
            <section className={styles.features}>
              <div className="container">
                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>
      </main>
    </Layout>
  );
}

export default Home;
