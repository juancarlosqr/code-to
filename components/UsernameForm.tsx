import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import debounce from 'lodash.debounce';
import { db } from '@/lib/firebase';
import { useUser } from '@/providers/UserProvider';
import {
  IS_PRODUCTION,
  USERNAME_MIN_LENGTH,
  USERNAME_RE,
} from '@/lib/constants';

// @todo: remove the length validation here
const UsernameMessage = ({ username, isValid, loading }: any) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{`${username} is available!`}</p>;
  } else if (username.length >= USERNAME_MIN_LENGTH && !isValid) {
    return <p className="text-danger">The username is taken</p>;
  } else {
    return <p />;
  }
};

const UsernameForm = () => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, username } = useUser();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = db.doc(`users/${user.uid}`);
    const usernameDoc = db.doc(`usernames/${value}`);

    // Commit both docs together as a batch write.
    const batch = db.batch();
    batch.set(userDoc, {
      username: value,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.toLowerCase();

    if (text.length < USERNAME_MIN_LENGTH) {
      setValue(text);
      setIsValid(false);
      setLoading(false);
    }

    if (USERNAME_RE.test(text)) {
      setValue(text);
      setIsValid(false);
      setLoading(true);
    }
  };

  const checkUsername = useCallback(
    debounce(async (choosenUsername: string) => {
      if (choosenUsername.length >= USERNAME_MIN_LENGTH) {
        const ref = db.doc(`usernames/${choosenUsername}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(value);
  }, [value]);

  return (
    !username && (
      <section>
        <h3>Choose username</h3>

        <form onSubmit={onSubmit}>
          <input
            placeholder="username"
            type="text"
            value={value}
            onChange={onChange}
          />

          <UsernameMessage
            username={value}
            isValid={isValid}
            loading={loading}
          />

          <button className="btn-green" disabled={!isValid} type="submit">
            Save
          </button>

          {!IS_PRODUCTION && (
            <>
              <h4>DEBUG</h4>
              <pre>{JSON.stringify({ isValid, loading, value }, null, 4)}</pre>
            </>
          )}
        </form>
      </section>
    )
  );
};

export default UsernameForm;
