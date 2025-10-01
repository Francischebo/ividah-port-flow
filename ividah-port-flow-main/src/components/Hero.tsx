import { Download, MessageCircle, ExternalLink } from 'lucide-react';
import francisImage from '@/assets/francis-graduation-1.jpg';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="fade-in">
              <h1 className="heading-xl hero-text mb-6">
                Full-Stack Developer |{' '}
                <span className="text-accent">ICT Support Specialist</span> |{' '}
                <span className="text-primary-light">Digital Transformation Advocate</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Bridging Technology and Operations Through Innovation
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="btn-primary bg-white text-primary hover:bg-white/90"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View My Projects
                </button>
                
                <button className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                  <Download className="w-5 h-5 mr-2" />
                  Download My CV
                </button>
                
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-outline border-white text-white hover:bg-white hover:text-primary"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Me
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="scale-in">
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={francisImage}
                    alt="Francis Ividah - Full-Stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full opacity-20 animate-pulse-slow" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;