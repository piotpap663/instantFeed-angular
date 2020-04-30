export const setPosts = (posts) => {

  console.log(posts, 'SETPOSTS')
  return {
    type: 'SET_POSTS',
    posts
  };

}
