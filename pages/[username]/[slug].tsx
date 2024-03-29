import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import AuthCheck from '@/components/AuthCheck';
import HeartButton from '@/components/HeartButton';
import Metatags from '@/components/Metatags';
import PostContent from '@/components/PostContent';
import { db, getUserWithUsername, postToJSON } from '@/lib/firebase';
import styles from '../../styles/Post.module.css';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await db.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function PostPage(props) {
  const postRef = db.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <Metatags title={post.title} />

      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          {post.heartCount ? (
            <strong>{post.heartCount} 💗</strong>
          ) : (
            <strong>0 🤍</strong>
          )}
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter" passHref>
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  );
}
