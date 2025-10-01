import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Education = () => {
  const education = [
    {
      institution: 'Kabarak University',
      degree: 'Bachelor of Science in Information Technology',
      duration: '2019 - 2023',
      location: 'Nakuru, Kenya',
      grade: 'Second Class Honours (Upper Division)',
      description: 'Comprehensive program covering software development, networking, database management, and IT project management. Specialized in web development and system administration.',
      highlights: [
        'Software Engineering & Development',
        'Network Administration & Security',
        'Database Design & Management',
        'IT Project Management',
        'System Analysis & Design'
      ],
      type: 'Degree'
    }
  ];

  const certifications = [
    {
      title: 'PLP Africa Full-Stack Development Program',
      issuer: 'Power Learn Project (PLP) Africa',
      duration: '2023',
      description: 'Intensive full-stack development program covering modern web technologies, software engineering best practices, and project management.',
      skills: ['React.js', 'Node.js', 'Database Design', 'Git/GitHub', 'Agile Methodology'],
      status: 'Completed'
    },
    {
      title: 'ALX Africa AI Career Essentials',
      issuer: 'ALX Africa',
      duration: '2024',
      description: 'Comprehensive AI and machine learning program focusing on practical applications, data science, and AI implementation in business contexts.',
      skills: ['Machine Learning', 'Python for AI', 'Data Analysis', 'AI Ethics', 'Business Applications'],
      status: 'Completed'
    },
    {
      title: 'CCTV Installation & Maintenance Certification',
      issuer: 'Kenya Institute of Security',
      duration: '2022',
      description: 'Specialized certification in CCTV system design, installation, configuration, and maintenance for commercial and residential applications.',
      skills: ['CCTV Systems', 'Network Cameras', 'System Design', 'Troubleshooting', 'Security Protocols'],
      status: 'Completed'
    },
    {
      title: 'Biometric Systems Integration',
      issuer: 'Technical Training Institute',
      duration: '2023',
      description: 'Advanced training in biometric access control systems, including fingerprint scanners, face recognition, and integrated security solutions.',
      skills: ['Biometric Technology', 'Access Control', 'System Integration', 'Hardware Setup', 'User Management'],
      status: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="education" className="section-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">Education & Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning and professional development through formal education 
            and specialized certifications.
          </p>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Formal Education
          </h3>
          
          {education.map((edu, index) => (
            <div
              key={index}
              className="card-elevated p-8 hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start mb-4 lg:mb-0">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-lg text-primary font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {edu.grade}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:items-end">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {edu.duration}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {edu.location}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {edu.type}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {edu.description}
              </p>

              <div>
                <h5 className="font-semibold text-foreground mb-3">Key Areas of Study:</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {edu.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlightIndex}
                      className="flex items-center text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Professional Certifications
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="card-elevated p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                    {cert.status}
                  </span>
                </div>

                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {cert.title}
                </h4>
                
                <p className="text-primary font-medium mb-2">
                  {cert.issuer}
                </p>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {cert.duration}
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {cert.description}
                </p>

                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-foreground mb-2">Skills Acquired:</h5>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="flex items-center text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Certificate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Continuing Education */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Committed to Continuous Learning
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I believe in staying current with emerging technologies and industry best practices. 
            I regularly participate in online courses, workshops, and tech conferences to enhance 
            my skills and knowledge.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;