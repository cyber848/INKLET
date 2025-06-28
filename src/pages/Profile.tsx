import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Globe, 
  Edit, 
  Save, 
  X, 
  BookOpen, 
  FileText, 
  Heart, 
  Eye,
  Calendar,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProfileData {
  full_name: string;
  bio: string;
  website: string;
}

interface UserContent {
  id: string;
  title: string;
  published: boolean;
  featured: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  type: 'poem' | 'blog_post';
}

interface UserSubmission {
  id: string;
  type: 'poem' | 'blog_post';
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userContent, setUserContent] = useState<UserContent[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'poems' | 'blog_posts' | 'submissions'>('overview');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>();

  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadUserContent();
      loadUserSubmissions();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, bio, website')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      reset({
        full_name: data.full_name || '',
        bio: data.bio || '',
        website: data.website || ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadUserContent = async () => {
    if (!user) return;

    try {
      const [poemsResult, blogPostsResult] = await Promise.all([
        supabase
          .from('poems')
          .select('id, title, published, featured, likes_count, views_count, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('blog_posts')
          .select('id, title, published, featured, likes_count, views_count, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      const poems = (poemsResult.data || []).map(p => ({ ...p, type: 'poem' as const }));
      const blogPosts = (blogPostsResult.data || []).map(p => ({ ...p, type: 'blog_post' as const }));

      setUserContent([...poems, ...blogPosts].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error) {
      console.error('Error loading user content:', error);
    }
  };

  const loadUserSubmissions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('id, type, title, status, admin_notes, created_at, reviewed_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserSubmissions(data || []);
    } catch (error) {
      console.error('Error loading user submissions:', error);
    }
  };

  const updateProfile = async (data: ProfileData) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          bio: data.bio,
          website: data.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setIsEditing(false);
      // Refresh auth context to get updated user data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContentByType = (type: 'poem' | 'blog_post') => {
    return userContent.filter(content => content.type === type);
  };

  const getStats = () => {
    const poems = getContentByType('poem');
    const blogPosts = getContentByType('blog_post');
    
    return {
      totalPoems: poems.length,
      totalBlogPosts: blogPosts.length,
      publishedPoems: poems.filter(p => p.published).length,
      publishedBlogPosts: blogPosts.filter(p => p.published).length,
      totalLikes: userContent.reduce((sum, content) => sum + content.likes_count, 0),
      totalViews: userContent.reduce((sum, content) => sum + content.views_count, 0),
      pendingSubmissions: userSubmissions.filter(s => s.status === 'pending').length,
      approvedSubmissions: userSubmissions.filter(s => s.status === 'approved').length,
      rejectedSubmissions: userSubmissions.filter(s => s.status === 'rejected').length
    };
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Please Sign In</h1>
          <p className="text-slate-600">You need to be signed in to view your profile.</p>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {user.full_name || 'Anonymous User'}
                </h1>
                <p className="text-slate-600 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </p>
                {user.is_admin && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                    <Settings className="h-3 w-3 mr-1" />
                    Administrator
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Form */}
        {isEditing && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(updateProfile)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register('full_name')}
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website
                </label>
                <input
                  {...register('website')}
                  type="url"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://your-website.com"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Content</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.totalPoems + stats.totalBlogPosts}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Likes</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalLikes}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalViews}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Submissions</p>
                <p className="text-2xl font-bold text-slate-900">{stats.pendingSubmissions}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', count: userContent.length },
                { id: 'poems', label: 'Poems', count: stats.totalPoems },
                { id: 'blog_posts', label: 'Blog Posts', count: stats.totalBlogPosts },
                { id: 'submissions', label: 'Submissions', count: userSubmissions.length },
              ].map(({ id, label, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {userContent.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No content yet</h3>
                    <p className="text-slate-600">Start sharing your poetry and thoughts with the world.</p>
                  </div>
                ) : (
                  userContent.slice(0, 10).map((content) => (
                    <div key={`${content.type}-${content.id}`} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {content.type === 'poem' ? (
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        ) : (
                          <FileText className="h-5 w-5 text-green-600" />
                        )}
                        <div>
                          <h4 className="font-medium text-slate-900">{content.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              content.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {content.published ? 'Published' : 'Draft'}
                            </span>
                            {content.featured && (
                              <span className="px-2 py-1 rounded-full text-xs bg-gold-100 text-gold-800">
                                Featured
                              </span>
                            )}
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {content.likes_count}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {content.views_count}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">
                        {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'poems' && (
              <div className="space-y-4">
                {getContentByType('poem').map((poem) => (
                  <div key={poem.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">{poem.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          poem.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {poem.published ? 'Published' : 'Draft'}
                        </span>
                        {poem.featured && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gold-100 text-gold-800">
                            Featured
                          </span>
                        )}
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {poem.likes_count}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {poem.views_count}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500">
                      {formatDistanceToNow(new Date(poem.created_at), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'blog_posts' && (
              <div className="space-y-4">
                {getContentByType('blog_post').map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">{post.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        {post.featured && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gold-100 text-gold-800">
                            Featured
                          </span>
                        )}
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes_count}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views_count}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-4">
                {userSubmissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No submissions yet</h3>
                    <p className="text-slate-600">Submit your work for review to get published.</p>
                    <a
                      href="/submit"
                      className="inline-flex items-center mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Submit Your Work
                    </a>
                  </div>
                ) : (
                  userSubmissions.map((submission) => (
                    <div key={submission.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {submission.type === 'poem' ? (
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-green-600" />
                          )}
                          <div>
                            <h4 className="font-medium text-slate-900">{submission.title}</h4>
                            <p className="text-sm text-slate-500 capitalize">{submission.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            submission.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : submission.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {submission.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {submission.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {submission.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                          <span className="text-sm text-slate-500">
                            {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      
                      {submission.admin_notes && (
                        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-slate-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">Admin Notes:</p>
                              <p className="text-sm text-slate-600">{submission.admin_notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {submission.reviewed_at && (
                        <div className="mt-2 text-xs text-slate-500">
                          Reviewed {formatDistanceToNow(new Date(submission.reviewed_at), { addSuffix: true })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;