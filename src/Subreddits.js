import React, {Component} from 'react';
import {connect} from 'react-redux';
import './subreddit.css';
import {Container, Icon, Button, Image, Modal, Loader} from 'semantic-ui-react';
import {getPost} from './redux/postAction';

import moment from 'moment';

import styled from 'styled-components';

const UpvoteContainer = styled.div`
    padding: 10px;
    padding-left: 20px;
    background-color: 'blue';
`;

const ButtonStyledUpvote = styled (Button)`
  &&&: hover {
    background-color: rgb(204, 55, 0);
  }
  &&&: active {
    background-color: rgb(255, 106, 50);
  }
`;
const ButtonStyledDownvote = styled (Button)`
  &&&: hover {
    background-color: rgb(90, 117, 204);
  }
  &&&: active {
    background-color: rgb(141, 168, 255);
  }
`;
const UpvoteCount = styled.div`
    padding: 5px;
    text-align: center;
    font-weight: 600;
`;
const Title = styled.div`
    color: rgb(34, 34, 34);
    overflow-wrap: break-word;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    padding-top:10px;
    padding-bottom:10px;
    padding-right: 5px;
`;
const Posted = styled.div`
    color: rgb(120, 124, 126);
    overflow-wrap: break-word;
    font-size: 12px;
    font-weight: 100;
    padding-right: 5px;
`;
const CommentContainer = styled.div`
    padding-left:5px;
    padding-top:5px;
    display: flex;
    flex-direction: row
`;
const ShareContainer = styled.div`
    padding-left:10px;
    padding-top:5px;
    display: flex;
    flex-direction: row
`;
class Subreddits extends Component {
  constructor (props) {
    super (props);
    this.state = {
      postUrl: '',
      isModalOpened: false,
    };
  }
  componentDidMount () {
    this.props.getPost (this.props.match.params.id);
  }
  componentDidUpdate (prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getPost (this.props.match.params.id);
    }
  }
  handlePostClick (postData) {
    if (postData && postData.preview && postData.preview.images[0].source.url) {
      this.setState ({
        postUrl: postData.preview.images[0].source.url,
        isModalOpened: true,
      });
    }
  }
  render () {
    const {posts, loading} = this.props;
    if (!posts) {
      return null;
    }
    if (loading) {
      return (
        <Loader
          active
          size="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          Loading
        </Loader>
      );
    }

    return (
      <div>
        {posts.data.children.map (post => {
          if (post.data.thumbnail.includes ('self')) {
            return;
          }
          return (
            <Container style={{marginBottom: '10px'}} key={post.id}>
              <div
                className="post"
                style={{maxWidth: window.screen.width / 1.7}}
                onClick={() => this.handlePostClick (post.data)}
              >

                <div style={{flexDirection: 'row', display: 'flex'}}>
                  <UpvoteContainer>
                    <ButtonStyledUpvote icon>
                      <Icon name="arrow up" />
                    </ButtonStyledUpvote>
                    <UpvoteCount> {post.data.ups} </UpvoteCount>
                    <ButtonStyledDownvote icon>
                      <Icon name="arrow down" />
                    </ButtonStyledDownvote>
                  </UpvoteContainer>
                  <div className="row1-container">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      <Posted>{post.data.author}</Posted>
                      <Posted>
                        {moment.unix (post.data.created_utc).fromNow ()}
                      </Posted>
                    </div>
                    <Title style={{maxWidth: window.screen.width / 3}}>
                      {post.data.title}
                    </Title>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      <CommentContainer>
                        <Icon name="comment" />
                        <div>{post.data.num_comments} Comments</div>
                      </CommentContainer>
                      <ShareContainer>
                        <Icon name="share" />
                        <div>Share</div>
                      </ShareContainer>
                    </div>
                  </div>
                </div>
                {post.data.thumbnail &&
                  !post.data.thumbnail.includes ('self') &&
                  <div className="image-container">
                    <Image src={post.data.thumbnail} />
                  </div>}
              </div>
            </Container>
          );
        })}
        {this.state.postUrl &&
          <Modal
            open={this.state.isModalOpened}
            centered={false}
            onClose={() => this.setState ({isModalOpened: false})}
          >
            <Image src={this.state.postUrl.replace ('&amp;', '&')} />
          </Modal>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.post,
    loading: state.post.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPost: subreddit => dispatch (getPost (subreddit)),
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Subreddits);
