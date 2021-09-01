import { useState } from 'react';
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import { useCollection } from 'react-firebase-hooks/firestore';
import AuthCheck from '@/components/AuthCheck';
import Metatags from '@/components/Metatags';
import PostFeed from '@/components/PostFeed';
import { db, ts } from '@/lib/firebase';
import toaster from '@/lib/toaster';
import { useUser } from '@/providers/UserProvider';
import styles from '../../styles/Admin.module.css';

const AdminPage = () => {
  return (
    <main>
      <AuthCheck>
        <Metatags title="Manage posts" />
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

function PostList() {
  const { user } = useUser();
  const ref = db.collection('users').doc(user.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { user, username } = useUser();
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = user.uid;
    const ref = db.collection('users').doc(uid).collection('posts').doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: ts(),
      updatedAt: ts(),
      heartCount: 0,
    };

    await ref.set(data);

    toaster.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}

export default AdminPage;
