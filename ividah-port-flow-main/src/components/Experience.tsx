import { Calendar, MapPin, Building2 } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Ukombozi Sacco Ltd',
      position: 'ICT Support',
      duration: '2023 - Present',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      responsibilities: [
        'Managed comprehensive IT infrastructure including network administration and system maintenance',
        'Implemented and maintained systems for operational efficiency',
        'Provided technical support for biometric systems and facility management technologies',
        'Coordinated ICT procurement processes and vendor relations',
        'Developed internal tools for streamlined operations and reporting'
      ],
      technologies: ['Network Administration', 'Inventory Systems', 'Biometrics', 'ERP Systems']
    },
    {
      company: 'Ecokleen Facility Management',
      position: 'Procurement & CCTV Systems Specialist',
      duration: '2022 - 2023',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      responsibilities: [
        'Led procurement processes for facility management equipment and supplies',
        'Designed, installed, and maintained comprehensive CCTV surveillance systems',
        'Managed vendor relationships and contract negotiations',
        'Ensured compliance with facility management standards and regulations',
        'Optimized procurement workflows to reduce costs and improve efficiency'
      ],
      technologies: ['CCTV Systems', 'Procurement Software', 'Facility Management', 'Vendor Management']
    },
    {
      company: 'Eagle Web E-Commerce',
      position: 'Volunteer Web Developer',
      duration: '2021 - 2022',
      location: 'Remote',
      type: 'Volunteer',
      responsibilities: [
        'Developed responsive e-commerce website features using modern web technologies',
        'Collaborated with design team to implement user-friendly interfaces',
        'Optimized website performance and implemented SEO best practices',
        'Contributed to open-source projects and community initiatives',
        'Gained valuable experience in agile development methodologies'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'E-commerce Platforms']
    },
    {
      company: 'Freelance Developer',
      position: 'Full-Stack Web Developer',
      duration: '2020 - Present',
      location: 'Remote',
      type: 'Freelance',
      responsibilities: [
        'Developed custom web applications using MERN stack for various clients',
        'Created POS systems for small to medium businesses',
        'Built AI-powered applications including Credit risk assessment and Loan approval tools',
        'Provided ongoing maintenance and technical support for client projects',
        'Managed complete project lifecycle from requirements gathering to deployment'
      ],
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Python', 'AI/ML']
    }
  ];

  return (
    <section id="experience" className="section-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven track record of delivering technical solutions and driving operational excellence 
            across diverse industries.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-start md:items-center gap-8"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

                {/* Content */}
                <div className="w-full md:ml-16">
                  <div className="card-elevated p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {exp.position}
                        </h3>
                        <div className="flex items-center text-primary font-medium mb-2">
                          <Building2 className="w-4 h-4 mr-2" />
                          {exp.company}
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end gap-2">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((responsibility, respIndex) => (
                        <li
                          key={respIndex}
                          className="flex items-start text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-primary/60 rounded-full mr-3 mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{responsibility}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;