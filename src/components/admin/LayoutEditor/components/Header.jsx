import { memo } from 'react';

const Header = memo(({ settings = {} }) => {
  const {
    logo,
    backgroundColor = '#1F2937',
    textColor = '#FFFFFF',
    showSearch = true,
    announcement
  } = settings;

  return (
    <div 
      className="relative p-4"
      style={{ 
        backgroundColor,
        color: textColor
      }}
    >
      {announcement && (
        <div 
          className="bg-blue-600 text-white text-center text-sm py-2 mb-4"
          dangerouslySetInnerHTML={{ __html: announcement }}
        />
      )}
      <div className="flex items-center justify-between">
        {logo ? (
          <img 
            src={logo} 
            alt="Logo" 
            className="h-8"
          />
        ) : (
          <span className="text-xl font-bold">Logo</span>
        )}
        {showSearch && (
          <div className="relative flex-1 max-w-lg mx-8">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
});

Header.displayName = 'Header';
export default Header;