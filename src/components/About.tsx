import { GraduationCap, Code, Settings, Lightbulb } from 'lucide-react';
import francisImage from '@/assets/francis-graduation-2.jpg';

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'BSc IT Graduate',
      description: 'Kabarak University',
    },
    {
      icon: Settings,
      title: 'ICT Systems Expert',
      description: 'Networking, Biometrics, CCTV',
    },
    {
      icon: Code,
      title: 'Full-Stack Developer',
      description: 'React, Node.js, Python, SQL',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focused',
      description: 'AI, Digital Transformation',
    },
  ];

  return (
    <section id="about" className="section-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate technology professional with expertise spanning software development,
            ICT infrastructure, and business operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={francisImage}
                  alt="Francis Ividah Professional Photo"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="slide-up">
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I am a <strong className="text-primary">BSc IT graduate from Kabarak University</strong> with 
                comprehensive experience in ICT support, software development, and business operations. 
                My expertise spans across networking, biometrics systems, CCTV installations, 
                ERP systems, and full-stack web development.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With hands-on experience in <strong className="text-primary">inventory management, 
                procurement processes, and facility systems</strong>, I bring a unique perspective that 
                bridges technical implementation with business requirements. I'm passionate about 
                leveraging AI and modern technologies to drive digital transformation.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="card-elevated p-4 text-center hover:shadow-lg transition-all duration-300"
                  >
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;