import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Pudensiana Abongo',
      position: 'Human Resource Manager',
      company: 'Ukombozi Sacco Ltd',
      testimonial: 'Francis has been instrumental in transforming our IT infrastructure. His technical expertise combined with his understanding of business operations makes him invaluable to our team. He is proactive, reliable, and always ready to go the extra mile to ensure our systems run smoothly.',
      rating: 5,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Gourav',
      position: 'System Administrator',
      company: 'Ecokleen Facility Management',
      testimonial: 'Working with Francis on our CCTV was a game-changer. His attention to detail and ability to deliver solutions that perfectly match our requirements is outstanding. He completed the project ahead of schedule and within budget.',
      rating: 5,
      image: '/api/placeholder/80/80'
    }
  ];

  return (
    <section id="testimonials" className="section-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">Client Testimonials</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            What colleagues and clients say about working with me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-elevated p-8 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-5 h-5 text-accent fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-primary/5 rounded-2xl">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and projects. 
            Let's connect and explore how I can help bring your ideas to life.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;