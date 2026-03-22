import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const navigateTo = (path: string, id?: string) => {
    try {
      // For contact page we prefer a query param so the page can read it
      const target = id && path === '/contact' ? `${path}?open=${id}` : id ? `${path}#${id}` : path;
      navigate(target);

      if (typeof document !== 'undefined' && id) {
        let attempts = 0;
        const tryScroll = () => {
          attempts += 1;
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (attempts < 12) {
            setTimeout(tryScroll, 120);
          }
        };
        setTimeout(tryScroll, 150);
      } else if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      // graceful fallback
      window.location.href = id ? `${path}#${id}` : path;
    }
  };
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-16 relative overflow-hidden font-poppins">
      {/* Background sketch placeholder */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <img src="https://picsum.photos/seed/building/400/400" alt="Building sketch" className="w-96 h-96 object-cover grayscale mix-blend-screen" referrerPolicy="no-referrer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div>
            <h2 className="font-ceramon text-3xl text-white mb-6 tracking-widest">TOOTHALIE</h2>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-ceramon italic text-xl text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>
                <button type="button" onClick={() => navigateTo('/')} className="hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">About</button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/', 'services')} className="hover:text-white transition-colors">Services</button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/', 'testimonials')} className="hover:text-white transition-colors">Testimonials</button>
              </li>
              <li>
                 <button type="button" onClick={() => navigateTo('/contacts')} className="hover:text-white transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-ceramon italic text-xl text-white mb-6">About Sections</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>
                <button type="button" onClick={() => navigateTo('/about', 'mission')} className="hover:text-white transition-colors">Mission</button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/about', 'problems')} className="hover:text-white transition-colors">Problems</button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/about', 'testimonials')} className="hover:text-white transition-colors">Testimonials</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-ceramon italic text-xl text-white mb-6">Contact Sections</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>
                <button type="button" onClick={() => navigateTo('/contacts', 'forms')} className="hover:text-white transition-colors">Contact Form</button>
              </li>
              <li>
                 <button type="button" onClick={() => navigateTo('/contacts', 'gmail')} className="hover:text-white transition-colors">Email</button>
              </li>
              <li>
                 <button type="button" onClick={() => navigateTo('/contacts', 'phone')} className="hover:text-white transition-colors">Phone</button>
              </li>
              <li>
                 <button type="button" onClick={() => navigateTo('/contacts', 'location')} className="hover:text-white transition-colors">Location</button>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="bg-[#222] py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-500 uppercase tracking-wider">
          <p>COPYRIGHT 2026 © TOOTHALIE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-3 mt-4 md:mt-0">
            <span>VISA</span>
            <span>MC</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
