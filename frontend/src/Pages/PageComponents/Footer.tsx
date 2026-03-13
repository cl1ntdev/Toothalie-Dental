import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-ceramon italic text-xl text-white mb-6">Information</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Location</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ceramon italic text-xl text-white mb-6">Our Services</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Purchase History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ceramon italic text-xl text-white mb-6">Contact Us</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>Main store: PO Box 1622 Colins Street West<br/>Victoria 8077 Australia</li>
              <li>Phone Number: +012 345 6789</li>
              <li>Email: info@toothalie.com</li>
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
