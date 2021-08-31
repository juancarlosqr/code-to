import AuthCheck from '@/components/AuthCheck';
import { db, ts } from '@/lib/firebase';
import { useUser } from '@/providers/UserProvider';

const dummyPost = {
  title: 'Hello World',
  slug: 'hello-world',
  // uid: '',
  // username: '',
  published: false,
  content: '# hello world!',
  createdAt: ts(),
  updatedAt: ts(),
  heartCount: 0,
};

const AdminPage = () => {
  const { user, username } = useUser();

  const onClickDummyImport = async () => {
    const data = { ...dummyPost, uid: user.uid, username };

    console.log('Data', data);
    await db
      .collection('users')
      .doc(user.uid)
      .collection('posts')
      .doc(dummyPost.slug)
      .set(data);
    console.log('Post created!');
  };

  return (
    <main>
      <AuthCheck>
        <h1>Admin</h1>
        <section>
          <button onClick={onClickDummyImport}>Add dummy post data</button>
        </section>
      </AuthCheck>
    </main>
  );
};

export default AdminPage;
