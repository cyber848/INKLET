import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { 
  Users, 
  FileText, 
  BookOpen, 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  StarOff,
  Search,
  Filter,
  Calendar,
  Heart,
  TrendingUp,
  Save,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AdminStats {
  totalPoems: number;
  totalBlogPosts: number;
  totalUsers: number;
  totalCategories: number;
  publishedPoems: number;
  publishedBlogPosts: number;
  featuredPoems: number;
  featuredBlogPosts: number;
}

interface ContentItem {
  id: string;
  title: string;
  author_name: string;
  category?: { name: string };
  published: boolean;
  featured: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  user_id: string;
}

interface User {
  id: string;
  email: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  created_at: string;
}

interface PoemFormData {
  title: string;
  content: string;
  excerpt: string;
  author_name: string;
  author_bio: string;
  category_id: string;
  tags: string;
  featured: boolean;
  published: boolean;
}

interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  author_name: string;
  author_bio: string;
  category_id: string;
  tags: string;
  reading_time: number;
  featured: boolean;
  published: boolean;
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'poems' | 'blog' | 'users' | 'categories'>('dashboard');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [poems, setPoems] = useState<ContentItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [showCreatePoem, setShowCreatePoem] = useState(false);
  const [showCreateBlogPost, setShowCreateBlogPost] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const poemForm = useForm<PoemFormData>();
  const blogPostForm = useForm<BlogPostFormData>();

  // Check if user is admin
  if (!user?.is_admin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Access Denied</h1>
          <p className="text-slate-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadStats(),
        loadPoems(),
        loadBlogPosts(),
        loadUsers(),
        loadCategories()
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const [poemsResult, blogPostsResult, usersResult, categoriesResult] = await Promise.all([
        supabase.from('poems').select('published, featured'),
        supabase.from('blog_posts').select('published, featured'),
        supabase.from('profiles').select('id'),
        supabase.from('categories').select('id')
      ]);

      const poems = poemsResult.data || [];
      const blogPosts = blogPostsResult.data || [];
      const users = usersResult.data || [];
      const categories = categoriesResult.data || [];

      setStats({
        totalPoems: poems.length,
        totalBlogPosts: blogPosts.length,
        totalUsers: users.length,
        totalCategories: categories.length,
        publishedPoems: poems.filter(p => p.published).length,
        publishedBlogPosts: blogPosts.filter(p => p.published).length,
        featuredPoems: poems.filter(p => p.featured).length,
        featuredBlogPosts: blogPosts.filter(p => p.featured).length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadPoems = async () => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .select(`
          id,
          title,
          author_name,
          published,
          featured,
          likes_count,
          views_count,
          created_at,
          user_id,
          categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPoems(data || []);
    } catch (error) {
      console.error('Error loading poems:', error);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          author_name,
          published,
          featured,
          likes_count,
          views_count,
          created_at,
          user_id,
          categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, is_admin, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const createPoem = async (data: PoemFormData) => {
    setSubmitting(true);
    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('poems')
        .insert({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          author_name: data.author_name,
          author_bio: data.author_bio,
          category_id: data.category_id || null,
          tags: tagsArray,
          featured: data.featured,
          published: data.published,
          user_id: user.id
        });

      if (error) throw error;

      poemForm.reset();
      setShowCreatePoem(false);
      await loadPoems();
      await loadStats();
    } catch (error) {
      console.error('Error creating poem:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const createBlogPost = async (data: BlogPostFormData) => {
    setSubmitting(true);
    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          author_name: data.author_name,
          author_bio: data.author_bio,
          category_id: data.category_id || null,
          tags: tagsArray,
          reading_time: data.reading_time,
          featured: data.featured,
          published: data.published,
          user_id: user.id
        });

      if (error) throw error;

      blogPostForm.reset();
      setShowCreateBlogPost(false);
      await loadBlogPosts();
      await loadStats();
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (table: 'poems' | 'blog_posts', id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      if (table === 'poems') {
        setPoems(poems.map(p => p.id === id ? { ...p, published: !currentStatus } : p));
      } else {
        setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, published: !currentStatus } : p));
      }

      await loadStats();
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const toggleFeatured = async (table: 'poems' | 'blog_posts', id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      if (table === 'poems') {
        setPoems(poems.map(p => p.id === id ? { ...p, featured: !currentStatus } : p));
      } else {
        setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, featured: !currentStatus } : p));
      }

      await loadStats();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const deleteContent = async (table: 'poems' | 'blog_posts', id: string) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (table === 'poems') {
        setPoems(poems.filter(p => p.id !== id));
      } else {
        setBlogPosts(blogPosts.filter(p => p.id !== id));
      }

      await loadStats();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const toggleUserAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, is_admin: !currentStatus } : u));
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This will also delete all their content.')) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;

      setUsers(users.filter(u => u.id !== userId));
      await loadStats();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const createCategory = async () => {
    const name = prompt('Enter category name:');
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const description = prompt('Enter category description (optional):') || '';

    try {
      const { error } = await supabase
        .from('categories')
        .insert({ name, slug, description });

      if (error) throw error;
      await loadCategories();
      await loadStats();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? Content using this category will be uncategorized.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;
      await loadCategories();
      await loadStats();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const filterContent = (content: ContentItem[]) => {
    return content.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.author_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || 
                           (filterStatus === 'published' && item.published) ||
                           (filterStatus === 'draft' && !item.published);
      
      return matchesSearch && matchesFilter;
    });
  };

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = 
    ({ title, value, icon, color }) => (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </div>
    );

  const ContentTable: React.FC<{ 
    content: ContentItem[]; 
    type: 'poems' | 'blog_posts';
    onTogglePublished: (id: string, status: boolean) => void;
    onToggleFeatured: (id: string, status: boolean) => void;
    onDelete: (id: string) => void;
  }> = ({ content, type, onTogglePublished, onToggleFeatured, onDelete }) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {content.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{item.title}</div>
                  {item.category && (
                    <div className="text-sm text-slate-500">{item.category.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {item.author_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                    {item.featured && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gold-100 text-gold-800">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {item.likes_count}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views_count}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onTogglePublished(item.id, item.published)}
                      className={`p-1 rounded ${
                        item.published 
                          ? 'text-green-600 hover:text-green-800' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={item.published ? 'Unpublish' : 'Publish'}
                    >
                      {item.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => onToggleFeatured(item.id, item.featured)}
                      className={`p-1 rounded ${
                        item.featured 
                          ? 'text-gold-600 hover:text-gold-800' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={item.featured ? 'Unfeature' : 'Feature'}
                    >
                      {item.featured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 rounded text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600 mt-2">Manage content, users, and site settings</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-slate-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'poems', label: 'Poems', icon: BookOpen },
              { id: 'blog', label: 'Blog Posts', icon: FileText },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'categories', label: 'Categories', icon: Tag },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Poems"
                value={stats.totalPoems}
                icon={<BookOpen className="h-6 w-6 text-white" />}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Blog Posts"
                value={stats.totalBlogPosts}
                icon={<FileText className="h-6 w-6 text-white" />}
                color="bg-green-500"
              />
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<Users className="h-6 w-6 text-white" />}
                color="bg-purple-500"
              />
              <StatCard
                title="Categories"
                value={stats.totalCategories}
                icon={<Tag className="h-6 w-6 text-white" />}
                color="bg-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Published Poems"
                value={stats.publishedPoems}
                icon={<Eye className="h-6 w-6 text-white" />}
                color="bg-blue-600"
              />
              <StatCard
                title="Published Blog Posts"
                value={stats.publishedBlogPosts}
                icon={<Eye className="h-6 w-6 text-white" />}
                color="bg-green-600"
              />
              <StatCard
                title="Featured Poems"
                value={stats.featuredPoems}
                icon={<Star className="h-6 w-6 text-white" />}
                color="bg-gold-500"
              />
              <StatCard
                title="Featured Blog Posts"
                value={stats.featuredBlogPosts}
                icon={<Star className="h-6 w-6 text-white" />}
                color="bg-gold-600"
              />
            </div>
          </div>
        )}

        {/* Poems Tab */}
        {activeTab === 'poems' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search poems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <button
                onClick={() => setShowCreatePoem(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Poem
              </button>
            </div>

            {/* Create Poem Form */}
            {showCreatePoem && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Create New Poem</h3>
                  <button
                    onClick={() => setShowCreatePoem(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={poemForm.handleSubmit(createPoem)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Title *
                      </label>
                      <input
                        {...poemForm.register('title', { required: 'Title is required' })}
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter poem title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Author Name *
                      </label>
                      <input
                        {...poemForm.register('author_name', { required: 'Author name is required' })}
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter author name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      {...poemForm.register('content', { required: 'Content is required' })}
                      rows={8}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter the poem content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      {...poemForm.register('excerpt')}
                      rows={2}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief excerpt or preview..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                      </label>
                      <select
                        {...poemForm.register('category_id')}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        Tags (comma-separated)
                      </label>
                      <input
                        {...poemForm.register('tags')}
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="love, nature, hope"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Author Bio
                    </label>
                    <textarea
                      {...poemForm.register('author_bio')}
                      rows={2}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief author biography..."
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        {...poemForm.register('published')}
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">Published</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        {...poemForm.register('featured')}
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">Featured</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowCreatePoem(false)}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {submitting ? 'Creating...' : 'Create Poem'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <ContentTable
              content={filterContent(poems)}
              type="poems"
              onTogglePublished={(id, status) => togglePublished('poems', id, status)}
              onToggleFeatured={(id, status) => toggleFeatured('poems', id, status)}
              onDelete={(id) => deleteContent('poems', id)}
            />
          </div>
        )}

        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <button
                onClick={() => setShowCreateBlogPost(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Blog Post
              </button>
            </div>

            {/* Create Blog Post Form */}
            {showCreateBlogPost && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Create New Blog Post</h3>
                  <button
                    onClick={() => setShowCreateBlogPost(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={blogPostForm.handleSubmit(createBlogPost)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Title *
                      </label>
                      <input
                        {...blogPostForm.register('title', { required: 'Title is required' })}
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter blog post title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Author Name *
                      </label>
                      <input
                        {...blogPostForm.register('author_name', { required: 'Author name is required' })}
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter author name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      {...blogPostForm.register('content', { required: 'Content is required' })}
                      rows={10}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter the blog post content (supports Markdown)..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      {...blogPostForm.register('excerpt', { required: 'Excerpt is required' })}
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief excerpt or summary..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                      </label>
                      <select
                        {...blogPostForm.register('category_id')}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        Reading Time (minutes)
                      </label>
                      <input
                        {...blogPostForm.register('reading_time', { 
                          valueAsNumber: true,
                          min: 1,
                          max: 60
                        })}
                        type="number"
                        min="1"
                        max="60"
                        defaultValue={5}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Tags (comma-separated)
                      </label>
                      <input
                        {...blogPostForm.register('tags')}
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="writing, poetry, craft"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Author Bio
                    </label>
                    <textarea
                      {...blogPostForm.register('author_bio')}
                      rows={2}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief author biography..."
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        {...blogPostForm.register('published')}
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">Published</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        {...blogPostForm.register('featured')}
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">Featured</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateBlogPost(false)}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {submitting ? 'Creating...' : 'Create Blog Post'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <ContentTable
              content={filterContent(blogPosts)}
              type="blog_posts"
              onTogglePublished={(id, status) => togglePublished('blog_posts', id, status)}
              onToggleFeatured={(id, status) => toggleFeatured('blog_posts', id, status)}
              onDelete={(id) => deleteContent('blog_posts', id)}
            />
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {user.full_name || 'No name'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.is_admin 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {user.is_admin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleUserAdmin(user.id, user.is_admin)}
                              className="text-primary-600 hover:text-primary-800"
                              title={user.is_admin ? 'Remove admin' : 'Make admin'}
                            >
                              {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 ml-4"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
              <button
                onClick={createCategory}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {category.description || 'No description'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {category.slug}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDistanceToNow(new Date(category.created_at), { addSuffix: true })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete category"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;