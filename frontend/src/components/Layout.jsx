import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Layout({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className={`flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Agreement Manager
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}