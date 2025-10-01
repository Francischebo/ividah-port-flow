import { ExternalLink, Github, Smartphone, Monitor, Brain, TrendingUp, ShoppingCart } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Inventory Management System',
      description: 'Comprehensive inventory tracking system with real-time updates, low stock alerts, and detailed reporting. Built for Ecokleen Facility Management Solutions Limited to streamline their inventory operations.',
      icon: Monitor,
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Chart.js'],
      features: [
        'Real-time inventory tracking',
        'Automated low stock alerts',
        'Comprehensive reporting dashboard',
        'User role management',
        'Export functionality'
      ],
      status: 'Production',
      category: 'Business Application'
    },
    {
      title: 'E-Commerce Website',
      description: 'Modern, responsive e-commerce platform with user authentication, payment integration, and admin dashboard. Features include product catalog, shopping cart, and order management.',
      icon: ShoppingCart,
      technologies: ['React.js', 'Next.js', 'Stripe API', 'PostgreSQL', 'Tailwind CSS'],
      features: [
        'Product catalog with search',
        'Shopping cart functionality',
        'Secure payment processing',
        'Order tracking system',
        'Admin dashboard'
      ],
      status: 'Completed',
      category: 'Web Application'
    },
    {
      title: 'AI Text Classifier',
      description: 'Machine learning application for automatic text classification and sentiment analysis. Uses natural language processing to categorize and analyze text content.',
      icon: Brain,
      technologies: ['Python', 'Scikit-learn', 'NLTK', 'Flask', 'React.js'],
      features: [
        'Text classification algorithms',
        'Sentiment analysis',
        'Real-time processing',
        'Model training interface',
        'API integration'
      ],
      status: 'Development',
      category: 'AI/ML Application'
    },
    {
      title: 'Credit Risk Assessment & Loan Approval App',
      description: 'MERN stack application for evaluating credit risk using machine learning algorithms. Helps financial institutions make informed lending decisions.',
      icon: TrendingUp,
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Python', 'TensorFlow'],
      features: [
        'Risk scoring algorithms',
        'Data visualization',
        'Report generation',
        'User management',
        'API integrations'
      ],
      status: 'Production',
      category: 'Financial Technology'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production':
        return 'bg-green-100 text-green-800';
      case 'Development':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="projects" className="section-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions spanning web development, AI applications, 
            and integrated systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-elevated p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {project.title}
              </h3>
              
              <p className="text-sm text-primary font-medium mb-3">
                {project.category}
              </p>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {project.features.slice(0, 3).map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-xs text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex items-center text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Live Demo
                </button>
                <button className="flex items-center text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">
                  <Github className="w-4 h-4 mr-1" />
                  Source Code
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Interested in seeing more of my work or discussing a project?
          </p>
          <button className="btn-primary">
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;