import { 
  Network, 
  Code, 
  Database, 
  Settings, 
  Briefcase, 
  Users,
  Monitor,
  Smartphone,
  Globe,
  Server
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'IT Support & Infrastructure',
      icon: Network,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      skills: [
        'Network Administration',
        'Biometric Systems',
        'CCTV Installation & Management',
        'System Troubleshooting',
        'Hardware Maintenance',
        'IT Security'
      ]
    },
    {
      title: 'Software Development',
      icon: Code,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      skills: [
        'HTML5 & CSS3',
        'JavaScript (ES6+)',
        'React.js & Next.js',
        'Node.js & Express',
        'Python',
        'RESTful APIs'
      ]
    },
    {
      title: 'Databases & Tools',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      skills: [
        'MySQL',
        'MongoDB',
        'PostgreSQL',
        'Git & GitHub',
        'Figma',
        'Docker'
      ]
    },
    {
      title: 'Business Operations',
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      skills: [
        'Inventory Management',
        'Procurement Processes',
        'ERP Systems',
        'Facility Management',
        'Project Coordination',
        'Process Optimization'
      ]
    },
    {
      title: 'Technical Specialties',
      icon: Settings,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      skills: [
        'MERN Stack Development',
        'AI & Machine Learning',
        'System Integration',
        'Web Application Development',
        'Database Design',
        'Web Performance'
      ]
    },
    {
      title: 'Soft Skills',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      skills: [
        'Team Collaboration',
        'Communication',
        'Problem Solving',
        'Leadership',
        'Adaptability',
        'Client Relations'
      ]
    }
  ];

  return (
    <section id="skills" className="section-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set spanning technical development, IT infrastructure, 
            and business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="card-elevated p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${category.bgColor} mr-4`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="flex items-center text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technology Icons */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <Monitor className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
            <Smartphone className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
            <Globe className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
            <Server className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
            <Database className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
            <Code className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;