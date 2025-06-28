import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Clock,
  Globe,
  Heart,
  Sparkles
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

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

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would send this to your backend
      console.log('Contact form submitted:', data);
      
      setSubmitted(true);
      reset();
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@inklet.com",
      description: "We'll respond within 24 hours",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      content: "Available 9 AM - 6 PM EST",
      description: "Get instant help from our team",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Literary Lane, Poetry City",
      description: "Our creative headquarters",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const faqs = [
    {
      question: "How do I submit my work?",
      answer: "Visit our Submit page and fill out the submission form. Our editorial team reviews all submissions within 2-3 weeks."
    },
    {
      question: "Is there a fee to publish on Inklet?",
      answer: "No, Inklet is completely free for writers. We believe in making literature accessible to everyone."
    },
    {
      question: "Can I edit my published work?",
      answer: "Yes, you can edit your work through your profile dashboard. Changes will be reviewed before going live."
    },
    {
      question: "How do I become a featured author?",
      answer: "Featured authors are selected based on the quality and engagement of their work. Keep writing and engaging with the community!"
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="card-gradient p-12 text-center max-w-lg mx-4">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Thank you for reaching out! We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              reset();
            }}
            className="btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-accent-600 via-primary-600 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-20"></div>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <MessageCircle className="h-16 w-16 text-white mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Have questions, suggestions, or just want to say hello? 
            We'd love to hear from you and help with anything you need.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div 
                key={index}
                className={`card-gradient p-8 text-center hover-lift animate-on-scroll`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl mb-6 shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-slate-700 mb-2">{info.content}</p>
                <p className="text-slate-600">{info.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="card-gradient p-8 animate-on-scroll">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Send className="h-6 w-6 mr-3 text-primary-600" />
              Send us a Message
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 mb-6">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={6}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div className="animate-on-scroll">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-secondary-600" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Response Time */}
            <div className="card p-6 mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-green-900">Quick Response</h3>
              </div>
              <p className="text-green-700">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please mention it in your subject line.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center animate-on-scroll">
          <div className="card-gradient p-8 max-w-2xl mx-auto">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              We Love Hearing From You
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Whether you're a writer looking for guidance, a reader with feedback, 
              or someone interested in collaborating, we're here to help. 
              Your voice matters to us, and we're excited to be part of your literary journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;