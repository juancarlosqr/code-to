import Image from 'next/image';
import { UserInterface } from '@/lib/types';
import { PROFILE_IMAGE_BLUR_DATA } from '@/lib/constants';
import hackerImg from '../public/hacker.png';

type UserProfileProps = {
  user: UserInterface;
};

// UI component for user profile
const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="box-center">
      <div className="image-center">
        <Image
          alt="Picture of the author"
          src={user.photoURL || hackerImg}
          className="card-img-center"
          height={150}
          width={150}
          layout="fixed"
          placeholder="blur"
          blurDataURL={PROFILE_IMAGE_BLUR_DATA}
        />
      </div>
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  );
};

export default UserProfile;
