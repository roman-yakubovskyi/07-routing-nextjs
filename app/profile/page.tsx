import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
};

const Profile = () => {
  return (
    <section>
      <h3>Profile</h3>
      <p>
        This is the profile page. Here you can view and edit your personal
        information, manage your account settings, and customize your
        preferences. Stay tuned for updates as we continue to enhance the
        features available on this page.
      </p>
      <button type="button">
        <Link href="/">Back to Home</Link>
      </button>

      <Link href="/profile/edit">Edit Profile</Link>
    </section>
  );
};
export default Profile;
