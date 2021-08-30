import Metatags from '@/components/Metatags';
import PostFeed from '@/components/PostFeed';
import Loader from '@/components/Loader';
import { db, fromMillis, postToJSON } from '@/lib/firebase';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps() {
  const postsQuery = db
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function HomePage(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = db
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    if (newPosts.length) {
      setPosts(posts.concat(newPosts));
    } else {
      setPostsEnd(true);
    }

    setLoading(false);
  };

  return (
    <main>
      <Metatags />

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
