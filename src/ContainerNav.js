import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';

import {Header, Menu} from 'semantic-ui-react';
import Subreddits from './Subreddits';
import './index.css';

const Nav = props => <NavLink exact {...props} activeClassName="active" />;

class ContainerNav extends Component {
  render () {
    return (
      <HashRouter>
        <div className="container">
          <div className="header">
            <Header as="h1">Reddit Challenge Demo</Header>
          </div>
          <div className="content">
            <div className="menu-container">
              <Menu pointing secondary vertical>
                <Menu.Item
                  name="alternative"
                  as={Nav}
                  to="/subreddits/alternative"
                />
                <Menu.Item name="pics" as={Nav} to="/subreddits/pics" />
                <Menu.Item name="gifs" as={Nav} to="/subreddits/gifs" />
                <Menu.Item name="advice" as={Nav} to="/subreddits/advice" />
                <Menu.Item name="animals" as={Nav} to="/subreddits/animals" />
                <Menu.Item name="cats" as={Nav} to="/subreddits/cats" />
                <Menu.Item name="images" as={Nav} to="/subreddits/images" />
                <Menu.Item
                  name="photoshop"
                  as={Nav}
                  to="/subreddits/photoshop"
                />
                <Menu.Item name="battles" as={Nav} to="/subreddits/battles" />
                <Menu.Item name="hmmm" as={Nav} to="/subreddits/hmmm" />
                <Menu.Item name="all" as={Nav} to="/subreddits/all" />
                <Menu.Item name="aww" as={Nav} to="/subreddits/aww" />
              </Menu>
            </div>
            <div className="subreddit">
              <Route path="/subreddits/:id" component={Subreddits} />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default ContainerNav;
