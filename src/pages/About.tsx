import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Globe, 
  Award, 
  Sparkles,
  PenTool,
  Star,
  Target,
  Lightbulb,
  Coffee,
  Mail
} from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & Editor-in-Chief",
      bio: "A passionate poet and literary advocate with over 10 years of experience in publishing.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      name: "Marcus Johnson",
      role: "Community Manager",
      bio: "Dedicated to fostering connections between writers and readers worldwide.",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      name: "Elena Rodriguez",
      role: "Content Curator",
      bio: "Expert in discovering and nurturing emerging literary voices.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      gradient: "from-purple-400 to-pink-400"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Literature",
      description: "We believe in the transformative power of words and the importance of preserving literary culture.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description: "Every voice matters. We celebrate diversity in perspectives, styles, and backgrounds.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain high editorial standards while supporting writers at every stage of their journey.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting writers and readers across cultures and continents through the universal language of literature.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const milestones = [
    { year: "2020", event: "Inklet was founded with a vision to democratize literary publishing" },
    { year: "2021", event: "Reached 1,000 published poems and launched our community features" },
    { year: "2022", event: "Introduced blog platform and expanded to include prose and essays" },
    { year: "2023", event: "Launched mentorship program connecting emerging writers with established authors" },
    { year: "2024", event: "Celebrating 10,000+ community members and 5,000+ published works" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-20"></div>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <Sparkles className="h-16 w-16 text-white mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Born from a love of literature and a belief that every voice deserves to be heard, 
            Inklet is more than a platform—it's a movement to celebrate the written word.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-gradient p-12 text-center animate-on-scroll">
            <Target className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              To create a vibrant, inclusive platform where writers can share their work, 
              connect with readers, and contribute to the rich tapestry of human expression. 
              We believe that literature has the power to bridge divides, inspire change, 
              and illuminate the human experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <PenTool className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Empower Writers</h3>
                <p className="text-slate-600">Provide tools and opportunities for writers to share their voice</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Celebrate Literature</h3>
                <p className="text-slate-600">Honor the craft and artistry of written expression</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Build Community</h3>
                <p className="text-slate-600">Foster connections between writers and readers worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Inklet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className={`card-gradient p-8 hover-lift animate-on-scroll`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mb-6 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The passionate individuals behind Inklet's mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`card-gradient p-8 text-center hover-lift animate-on-scroll`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg"
                  />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}>
                  {member.role}
                </p>
                <p className="text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient-2 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Key milestones in Inklet's evolution
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-6 animate-on-scroll`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="card-gradient p-6 flex-1">
                  <p className="text-slate-700 leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll">
            <Coffee className="h-16 w-16 text-gold-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Join Our Literary Family
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're a seasoned writer or just starting your journey, 
              there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/auth?mode=signup"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Join Our Community</span>
              </a>
              <a
                href="/contact"
                className="btn-outline inline-flex items-center space-x-2 border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Mail className="h-5 w-5" />
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;