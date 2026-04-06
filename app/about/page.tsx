import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page of my app',
};

const About = () => {
  return (
    <div>
      <p>About Page</p>
    </div>
  );
};
export default About;
