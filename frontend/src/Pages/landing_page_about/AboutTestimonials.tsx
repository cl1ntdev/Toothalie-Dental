import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Michael Kowalski',
    role: 'Patient',
    quote: 'The booking process was incredibly smooth, and the staff was ready for me.',
    company: 'TOOTHALIE CLINIC',
    image: 'https://picsum.photos/seed/patient1/400/500'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Patient',
    quote: 'I love being able to access all my dental records right from my phone.',
    company: 'TOOTHALIE CLINIC',
    image: 'https://picsum.photos/seed/patient2/400/500'
  },
  {
    id: 3,
    name: 'David Wright',
    role: 'Clinic Manager',
    quote: 'Toothalie completely changed how our clinic operates. So efficient.',
    company: 'PARTNER CLINIC',
    image: 'https://picsum.photos/seed/patient3/400/500'
  },
  {
    id: 4,
    name: 'Emily Chen',
    role: 'Patient',
    quote: 'Finally, a dental experience that feels modern and respects my time.',
    company: 'TOOTHALIE CLINIC',
    image: 'https://picsum.photos/seed/patient4/400/500'
  }
];

export default function AboutTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#f4f5f7] py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight tracking-tight">
            Current<br/>Dentists
          </h2>
          
          <div className="flex flex-col items-end gap-6">
            <p className="text-sm text-gray-600 font-medium text-right">
              Built on insights from 250+ Clinics<br/>& Thousands of Patients
            </p>
            <div className="flex gap-4">
              <button onClick={() => scroll('left')} className="text-gray-400 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button onClick={() => scroll('right')} className="text-gray-900 hover:text-gray-600 transition-colors">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-12"
        >
          {testimonials.map((test, index) => (
            <motion.div 
              key={test.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start"
            >
              <div 
                className="w-full aspect-[4/5] bg-gray-200 mb-8"
                style={{ 
                  clipPath: index === 0 
                    ? 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)' 
                    : 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)' 
                }}
              >
                <img src={test.image} alt={test.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              <div className="pr-8">
                <h4 className="text-sm font-medium text-gray-900">{test.name}</h4>
                <p className="text-xs text-gray-500 mb-6">{test.role}</p>
                
                <p className="text-lg text-gray-800 leading-relaxed mb-8">
                  <span className="font-bold mr-2">→</span>
                  "{test.quote}"
                </p>
                
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 inline-block">
                  {test.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}