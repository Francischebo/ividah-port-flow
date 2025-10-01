import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    'Full-Stack Development',
    'ICT Support & Maintenance',
    'System Integration',
    'Web Application Development',
    'Database Design',
    'Network Administration'
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/francis-ividah',
      label: 'LinkedIn'
    },
    {
      icon: Github,
      href: 'https://github.com/Francischebo',
      label: 'GitHub'
    },
    {
      icon: MessageCircle,
      href: 'https://wa.me/254740411091',
      label: 'WhatsApp'
    }
  ];

  return (
    <footer className="bg-foreground text-background relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-background mb-4">
              Francis Ividah
            </h3>
            <p className="text-background/80 mb-6 leading-relaxed">
              Full-Stack Developer and ICT Support Specialist passionate about 
              bridging technology and operations through innovative solutions. 
              Based in Nairobi, Kenya.
            </p>
            
            <div className="space-y-3">
              <a
                href="tel:+254740411091"
                className="flex items-center text-background/80 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4 mr-3" />
                +254 740 411 091
              </a>
              <a
                href="mailto:fividah@gmail.com"
                className="flex items-center text-background/80 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4 mr-3" />
                fividah@gmail.com
              </a>
              <div className="flex items-center text-background/80">
                <MapPin className="w-4 h-4 mr-3" />
                Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-background transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-background/80 text-sm"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-background/80 text-sm">Follow me:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background/10 rounded-lg text-background hover:bg-background/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-background/80 text-sm">
                © {currentYear} Francis Ividah. All rights reserved.
              </p>
              <p className="text-background/60 text-xs mt-1">
                Crafted with passion and precision
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;