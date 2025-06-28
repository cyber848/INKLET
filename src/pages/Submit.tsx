import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { 
  PenTool, 
  FileText, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  BookOpen,
  Sparkles,
  Heart,
  Globe,
  Users,
  Award,
  Clock,
  Tag
} from 'lucide-react';

interface SubmissionFormData {
  type: 'poem' | 'blog_post';
  title: string;
  content: string;
  excerpt: string;
  author_name: string;
  author_bio: string;
  category_id: string;
  tags: string;
  reading_time: number;
}

interface Category {
  id: string;
  name: string;
}

const Submit: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<SubmissionFormData>({
    defaultValues: {
      type: 'poem',
      author_name: user?.full_name || '',
      reading_time: 5
    }
  });

  const submissionType = watch('type');

  useEffect(() => {
    setIsVisible(true);
    loadCategories();
  }, []);

  useEffect(() => {
    if (user?.full_name) {
      reset(prev => ({ ...prev, author_name: user.full_name }));
    }
  }, [user, reset]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const onSubmit = async (data: SubmissionFormData) => {
    if (!user) {
      setError('You must be signed in to submit content.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const submissionData = {
        type: data.type,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        author_name: data.author_name,
        author_bio: data.author_bio,
        category_id: data.category_id || null,
        tags: tagsArray,
        reading_time: data.type === 'blog_post' ? data.reading_time : null,
        user_id: user.id,
        status: 'pending'
      };

      const { error } = await supabase
        .from('submissions')
        .insert(submissionData);

      if (error) throw error;

      setSubmitted(true);
      reset();
    } catch (error: any) {
      setError(error.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="card-gradient p-12 text-center max-w-md mx-4">
          <PenTool className="h-16 w-16 text-primary-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Sign In Required</h1>
          <p className="text-slate-600 mb-6">
            Please sign in to submit your poetry and blog posts to our community.
          </p>
          <a
            href="/auth"
            className="btn-primary"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="card-gradient p-12 text-center max-w-lg mx-4">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Submission Received!</h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Thank you for your submission! Our editorial team will review your work and get back to you soon.
            You can track the status of your submissions in your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                reset();
              }}
              className="btn-primary"
            >
              Submit Another
            </button>
            <a
              href="/profile"
              className="btn-outline"
            >
              View My Submissions
            </a>
          </div>
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
      <div className="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-20"></div>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <Sparkles className="h-16 w-16 text-white mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Share Your Voice
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Submit your poetry and prose to join our vibrant literary community. 
            Every voice matters, every story deserves to be heard.
          </p>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="card-gradient p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Award className="h-6 w-6 mr-3 text-gold-500" />
            Submission Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Original Work</h3>
              <p className="text-slate-600 text-sm">
                Submit only your original, unpublished work that you own the rights to.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Community Friendly</h3>
              <p className="text-slate-600 text-sm">
                Content should be respectful and appropriate for our diverse community.
              </p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Quality Focus</h3>
              <p className="text-slate-600 text-sm">
                We value thoughtful, well-crafted pieces that contribute to literary discourse.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <div className="card-gradient p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <PenTool className="h-6 w-6 mr-3 text-primary-600" />
            Submit Your Work
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 mb-6">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Submission Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                What are you submitting? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  submissionType === 'poem' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    {...register('type')}
                    type="radio"
                    value="poem"
                    className="sr-only"
                  />
                  <BookOpen className="h-6 w-6 text-primary-600 mr-3" />
                  <div>
                    <div className="font-semibold text-slate-900">Poetry</div>
                    <div className="text-sm text-slate-600">Share your poems and verses</div>
                  </div>
                </label>
                
                <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  submissionType === 'blog_post' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    {...register('type')}
                    type="radio"
                    value="blog_post"
                    className="sr-only"
                  />
                  <FileText className="h-6 w-6 text-secondary-600 mr-3" />
                  <div>
                    <div className="font-semibold text-slate-900">Blog Post</div>
                    <div className="text-sm text-slate-600">Share articles and essays</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                  placeholder={`Enter your ${submissionType === 'poem' ? 'poem' : 'blog post'} title`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Author Name *
                </label>
                <input
                  {...register('author_name', { required: 'Author name is required' })}
                  type="text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                  placeholder="Your name or pen name"
                />
                {errors.author_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.author_name.message}</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content *
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={submissionType === 'poem' ? 12 : 16}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                placeholder={submissionType === 'poem' 
                  ? 'Enter your poem here...' 
                  : 'Enter your blog post content here... (Markdown supported)'
                }
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Excerpt {submissionType === 'blog_post' && '*'}
              </label>
              <textarea
                {...register('excerpt', submissionType === 'blog_post' ? { required: 'Excerpt is required for blog posts' } : {})}
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                placeholder={submissionType === 'poem' 
                  ? 'Brief excerpt or opening lines...' 
                  : 'Brief summary of your blog post...'
                }
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
              )}
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  {...register('category_id')}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    {...register('tags')}
                    type="text"
                    className="w-full pl-10 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                    placeholder="love, nature, hope (comma-separated)"
                  />
                </div>
              </div>
            </div>

            {/* Reading Time (Blog Posts Only) */}
            {submissionType === 'blog_post' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estimated Reading Time (minutes)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      {...register('reading_time', { 
                        valueAsNumber: true,
                        min: 1,
                        max: 60
                      })}
                      type="number"
                      min="1"
                      max="60"
                      className="w-full pl-10 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Author Bio
              </label>
              <textarea
                {...register('author_bio')}
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300"
                placeholder="Brief biography about yourself..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit for Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Submit;