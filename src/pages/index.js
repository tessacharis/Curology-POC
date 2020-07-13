import React, { useEffect } from 'react';
import { graphql, withPrefix, Link } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../layouts/index';
import Call from '../components/Call';

const Home = (props) => {
  const markdown = props.data.allMarkdownRemark.edges;
  const json = props.data.allFeaturesJson.edges;
  const pathPrefix = process.env.pathPrefix;
  return (
    <Layout bodyClass="page-home">
      <SEO title="Home" />
      <Helmet>
        <meta
          name="description"
          content="Small Business Theme. Multiple content types using Markdown and JSON sources. Responsive design and SCSS. This is a beautiful and artfully designed starting theme."
        />
      </Helmet>
      <div className="intro intro-home pb-4">
        <div className="container">
          <h1>Put your best <b>face</b> forward.</h1>
          <p>
             Protect your skin for longevity with your custom anti-aging formula.
          </p>
          <a href="/contact" className="button">
            UNLOCK MY FREE TRIAL
          </a>
        </div>
      </div>
      <div className="container pt-8 pt-md-10">
        <div className="row justify-content-start">
          <div className="col-12">
            <h2 className="title-3 text-dark mb-3">How your anti-aging formula helps</h2>
          </div>
          {markdown.map((edge, i) => {
            var fadeCount = 200 * i;
            return(
                <div data-sal="fade"
                data-sal-delay={fadeCount}
                data-sal-easing="linear" key={edge.node.frontmatter.path} className="card service service-teaser">
                  <div class="card-image" style={{ backgroundImage: `url(${location.pathname}${edge.node.frontmatter.background}` }}>
                    <img
                      alt={edge.node.frontmatter.title}
                      className="img-fluid mb-2"
                      src={edge.node.frontmatter.image}
                    />
                  </div>
                  <div className="card-content">
                    <h2>
                      {edge.node.frontmatter.title}
                    </h2>
                    <p>{edge.node.excerpt}</p>
                  </div>
              </div>)
            })}
        </div>
      </div>
      <section class="cta"
        data-sal="fade"
        data-sal-delay="300"
        data-sal-easing="ease">
      <div
        className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2 className="">Give your skin what it wants.</h2>
            <h3>Create your custom anti-aging formula today.</h3>
            <ul class="checklist">
              <li>Improve your skin's elasticity</li>
              <li>Erase fine lines and wrinkles</li>
              <li>Feel buttery smooth and moisturized</li>
              <li>Speak directly with a dermatologist and track your journey</li>
            </ul>
            <a href="/contact" className="button">
              UNLOCK MY FREE TRIAL
            </a>
          </div>
        </div>
      </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            image
            background
            date(formatString: "DD MMMM YYYY")
          }
          excerpt
        }
      }
    }
    allFeaturesJson {
      edges {
        node {
          id
          title
          description
          image
        }
      }
    }
  }
`;

export default Home;
