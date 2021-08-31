import AuthCheck from '@/components/AuthCheck';

const AdminPostPage = () => {
  return (
    <main>
      <AuthCheck>
        <h1>Admin Post Page</h1>
      </AuthCheck>
    </main>
  );
};

export default AdminPostPage;
