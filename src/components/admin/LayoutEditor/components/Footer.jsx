import { memo } from 'react';

const Footer = memo(({ settings = {} }) => {
  const {
    logo,
    backgroundColor = '#1F2937',
    textColor = '#FFFFFF',
    copyrightText = '© 2024 Your Store. All rights reserved.'
  } = settings;

  return (
    <div 
      className="p-4"
      style={{ 
        backgroundColor,
        color: textColor
      }}
    >
      {logo && (
        <img 
          src={logo} 
          alt="Footer Logo" 
          className="h-8 mb-4"
        />
      )}
      <p className="text-sm">
        {copyrightText}
      </p>
    </div>
  );
});

Footer.displayName = 'Footer';
export default Footer;