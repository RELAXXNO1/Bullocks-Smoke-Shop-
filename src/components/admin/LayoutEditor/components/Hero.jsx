import { memo } from 'react';

const Hero = memo(({ settings = {} }) => {
  const {
    backgroundImage,
    backgroundColor = '#1F2937',
    heading = 'Welcome',
    subheading = 'Discover our products'
  } = settings;

  return (
    <div 
      className="relative h-64 bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor
      }}
    >
      <div className="text-center text-white">
        <h1 
          className="text-4xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        <p 
          className="text-xl"
          dangerouslySetInnerHTML={{ __html: subheading }}
        />
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';
export default Hero;