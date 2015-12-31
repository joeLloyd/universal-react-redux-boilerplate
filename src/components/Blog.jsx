'use strict';

import './Blog.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchArticles } from '../actions/articles';
import { Nav } from '../components';

const mapStateToProps = (state) => ({
  articles: state.articles.overview.map((slug) => (state.articles.map[slug]))
});

class Blog extends Component {
  static onEnter(dispatch) {
    dispatch(fetchArticles());
  }
  render() {
    let { articles, children } = this.props;

    let links = articles.map(({ slug, title }) => ({
      to: `/blog/${slug}`,
      text: title
    }));

    return (
      <div className="Blog">
        <aside className="overview">
          <h1>Articles:</h1>
          <Nav links={links} />
        </aside>
        <main className="article">
          {children}
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Blog);
