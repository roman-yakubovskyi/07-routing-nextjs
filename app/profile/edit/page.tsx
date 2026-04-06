import Link from 'next/link';

export default function EditProfilePage() {
  return (
    <section>
      <h3>Edit Profile</h3>
      <p>This is the edit profile page. </p>
      <p>
        Here you can update your personal information and manage your account
        settings.
      </p>
      <Link href="/profile">Back to Profile</Link>
    </section>
  );
}
