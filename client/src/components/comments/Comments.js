import React, { Component } from 'react';
import Comment from './Comment';

export default class Comments extends Component {
  state = {
    comments: [],
    isFetching: true,
  };


  /*************************************/
  // Temporary stuff to test displaying comments as json
  
  // async fetchData(url) {
  //   const response = await fetch(url);
  //   let data = await response.json();
  //   return data;
  // }

  // componentDidMount() {
  //   const url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
  //   let data = this.fetchData(url);
  //   data.then((comments) => {
  //     let commentList = comments.slice(0, 10);
  //     this.setState(
  //       {
  //         comments: commentList,
  //         isFetching: false,
  //       },
  //       () => console.log('New State', this.state.comments)
  //     );
  //   });
  // }
  /*************************************/


  componentDidMount() {
    // Get item_id using Redux
    const item_id = this.props.item_id;
    // Make request for all comments of an item
    const response = await fetch(`/api/comments/${item_id}`);
    let data = await response.json();
    data.then((comments) => {
      this.setState(
        {
          comments: comments,
          isFetching: false,
        },
        () => console.log('New State', this.state.comments)
      );
    });
   }

  // Display comments inside comment box
  render() {
    const { comments, isFetching } = this.state;
    return isFetching ? 'Loading...' : <Comment comments={comments} />;
  }
}
