import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react'
import { useAuthStore } from './../store/authUser';
import { useContentStore } from '../store/content';

export const Navbar = ()=>{
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
 

  const { setContentType } = useContentStore();

  const toggleMobileMenu = ()=> setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="w-full bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 text-white">
        
        {/* Left section */}
        <div className="flex items-center gap-10">
          <Link to={'/'}>
            <img src="/netflix-logo.png" alt="netflix logo" className='w-32 sm:w-40'/>
          </Link>
          <div className="hidden sm:flex gap-4 items-center">
            <Link to={'/'} className='hover:underline' onClick={()=>setContentType('movie')}>Movies</Link>
            <Link to={'/'} className='hover:underline' onClick={()=>setContentType('tv')}>Tv Shows</Link>
            <Link to={'/history'} className='hover:underline'>Search History</Link>
          </div>
        </div>

        {/* Right section */}
        <div className="flex gap-4 items-center">
          <Link to={'/search'}>
            <Search className="size-5 cursor-pointer"/>
          </Link>
          
          {user?.image ? (
            <img src={user.image} alt="avatar" className='h-8 w-8 rounded-full cursor-pointer object-cover'/>
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}

          <LogOut className='size-6 cursor-pointer' onClick={logout}/>
          
          <div className="sm:hidden">
            <Menu className='size-5 cursor-pointer' onClick={toggleMobileMenu}/>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden bg-black border-t border-gray-800">
          <Link to={'/'} className='block hover:underline p-2' onClick={toggleMobileMenu}>Movies</Link>
          <Link to={'/'} className='block hover:underline p-2' onClick={toggleMobileMenu}>Tv Shows</Link>
          <Link to={'/history'} className='block hover:underline p-2' onClick={toggleMobileMenu}>Search History</Link>
        </div>
      )}
    </header>
  )
}
