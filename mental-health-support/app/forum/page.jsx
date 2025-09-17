'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { cn } from '@/lib/utils';

// Mock forum data
const FORUM_CATEGORIES = [
  {
    id: 'academic',
    name: 'Academic Stress',
    description: 'Discuss challenges related to academic pressure, exams, and coursework.',
    icon: '📚',
    postCount: 24
  },
  {
    id: 'social',
    name: 'Social Connections',
    description: 'Share experiences about making friends, social anxiety, and campus life.',
    icon: '👥',
    postCount: 18
  },
  {
    id: 'wellness',
    name: 'Mental Wellness',
    description: 'General discussions about maintaining mental health and wellbeing.',
    icon: '🧠',
    postCount: 32
  },
  {
    id: 'future',
    name: 'Future Concerns',
    description: 'Talk about career anxiety, life after graduation, and planning ahead.',
    icon: '🔮',
    postCount: 15
  },
  {
    id: 'identity',
    name: 'Identity & Self',
    description: 'Explore questions about personal identity, self-worth, and growth.',
    icon: '🌱',
    postCount: 21
  },
  {
    id: 'support',
    name: 'Support Systems',
    description: 'Discuss family dynamics, relationships, and building support networks.',
    icon: '🤝',
    postCount: 19
  }
];

// Mock posts data
const MOCK_POSTS = {
  'academic': [
    {
      id: 'a1',
      title: 'Struggling with exam anxiety',
      content: 'I have finals coming up and I can\'t sleep. Every time I try to study, I freeze up. Has anyone found techniques that actually work for managing exam stress?',
      author: 'Anonymous Student',
      authorId: 'anon123',
      date: '2 days ago',
      likes: 15,
      replies: 8,
      isAnonymous: true
    },
    {
      id: 'a2',
      title: 'How to balance multiple assignments?',
      content: 'I\'m drowning in assignments from different courses all due in the same week. How do you all manage your time when everything seems to be due at once?',
      author: 'Anonymous Student',
      authorId: 'anon456',
      date: '5 days ago',
      likes: 23,
      replies: 12,
      isAnonymous: true
    },
    {
      id: 'a3',
      title: 'Feeling like an impostor in my program',
      content: 'Everyone in my classes seems so much smarter and more prepared than me. I constantly feel like I don\'t belong here and that I\'m going to be found out. Does anyone else experience this?',
      author: 'Anonymous Student',
      authorId: 'anon789',
      date: '1 week ago',
      likes: 42,
      replies: 19,
      isAnonymous: true
    }
  ],
  'social': [
    {
      id: 's1',
      title: 'Making friends as an introvert',
      content: 'I\'m in my second year and still haven\'t made any close friends. As an introvert, I find it really hard to connect with people in large group settings like classes or events. Any advice from fellow introverts who\'ve managed to build a social circle?',
      author: 'Anonymous Student',
      authorId: 'anon234',
      date: '3 days ago',
      likes: 28,
      replies: 14,
      isAnonymous: true
    },
    {
      id: 's2',
      title: 'Dealing with roommate conflicts',
      content: 'My roommate and I have completely different schedules and habits. It\'s creating a lot of tension in our shared space. How do you have difficult conversations about living arrangements without making things worse?',
      author: 'Anonymous Student',
      authorId: 'anon567',
      date: '6 days ago',
      likes: 19,
      replies: 11,
      isAnonymous: true
    }
  ],
  'wellness': [
    {
      id: 'w1',
      title: 'Morning routine for better mental health',
      content: 'I\'ve been struggling with my mental health lately, and I\'ve heard that having a solid morning routine can help. What are some morning habits that have helped improve your mental wellbeing?',
      author: 'Anonymous Student',
      authorId: 'anon345',
      date: '1 day ago',
      likes: 31,
      replies: 16,
      isAnonymous: true
    },
    {
      id: 'w2',
      title: 'How to explain mental health struggles to family',
      content: 'My family doesn\'t really understand mental health issues and thinks I should just "try harder" or "be more positive." Has anyone successfully explained their mental health challenges to family members who are skeptical?',
      author: 'Anonymous Student',
      authorId: 'anon678',
      date: '4 days ago',
      likes: 37,
      replies: 21,
      isAnonymous: true
    }
  ],
  'future': [
    {
      id: 'f1',
      title: 'Paralyzed by career decisions',
      content: 'I\'m about to graduate and I\'m completely overwhelmed by career choices. I\'m afraid of making the wrong decision and regretting it. How did you figure out what path to take after graduation?',
      author: 'Anonymous Student',
      authorId: 'anon456',
      date: '2 days ago',
      likes: 25,
      replies: 13,
      isAnonymous: true
    }
  ],
  'identity': [
    {
      id: 'i1',
      title: 'Finding my authentic self at university',
      content: 'I feel like I\'ve been playing a role my whole life to please others. Now at university, I have a chance to redefine myself, but I\'m not even sure who I really am. Has anyone else gone through this journey of self-discovery?',
      author: 'Anonymous Student',
      authorId: 'anon567',
      date: '3 days ago',
      likes: 33,
      replies: 17,
      isAnonymous: true
    }
  ],
  'support': [
    {
      id: 'su1',
      title: 'When friends don\'t understand your mental health',
      content: 'My friends are supportive in many ways, but they don\'t really get what I\'m going through with my anxiety. It makes me feel isolated even when I\'m with them. How do you bridge that gap of understanding?',
      author: 'Anonymous Student',
      authorId: 'anon678',
      date: '5 days ago',
      likes: 29,
      replies: 15,
      isAnonymous: true
    }
  ]
};

// Mock comments data
const MOCK_COMMENTS = {
  'a1': [
    {
      id: 'c1a1',
      content: 'I found that breaking my study sessions into 25-minute blocks with 5-minute breaks (Pomodoro technique) really helps with my anxiety. It makes the work feel more manageable.',
      author: 'Anonymous Student',
      authorId: 'anon234',
      date: '1 day ago',
      likes: 8,
      isAnonymous: true
    },
    {
      id: 'c2a1',
      content: 'Have you tried mindfulness meditation? There\'s a great app called Headspace with specific meditations for exam stress. It\'s helped me a lot.',
      author: 'Anonymous Student',
      authorId: 'anon345',
      date: '1 day ago',
      likes: 6,
      isAnonymous: true
    },
    {
      id: 'c3a1',
      content: 'I talk to my professor about my anxiety. Many of them are understanding and might offer accommodations or extra support. It\'s worth a try!',
      author: 'Anonymous Student',
      authorId: 'anon456',
      date: '2 days ago',
      likes: 12,
      isAnonymous: true
    }
  ],
  's1': [
    {
      id: 'c1s1',
      content: 'I\'m an introvert too! I found it easier to make friends through smaller clubs or interest groups rather than big social events. Look for activities you enjoy where you can meet people with similar interests.',
      author: 'Anonymous Student',
      authorId: 'anon567',
      date: '2 days ago',
      likes: 10,
      isAnonymous: true
    },
    {
      id: 'c2s1',
      content: 'Online study groups can be a good way to connect with classmates in a less overwhelming setting. You can start with text chat and move to voice/video as you get more comfortable.',
      author: 'Anonymous Student',
      authorId: 'anon678',
      date: '3 days ago',
      likes: 7,
      isAnonymous: true
    }
  ],
  'w1': [
    {
      id: 'c1w1',
      content: 'Starting my day with a 10-minute walk outside has been game-changing for my mental health. The combination of light exercise, fresh air, and a moment to clear my head sets a positive tone for the day.',
      author: 'Anonymous Student',
      authorId: 'anon789',
      date: '1 day ago',
      likes: 15,
      isAnonymous: true
    }
  ]
};

export default function ForumPage() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest } = useAuth();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  
  // Get text content from text.md
  const forumTitle = useText('peer_support.forum_title', 'Peer Support Forum');
  const forumSubtitle = useText('peer_support.forum_subtitle', 'Share experiences and support each other anonymously');
  const categoriesTitle = useText('peer_support.categories_title', 'Discussion Categories');
  const newPostButton = useText('peer_support.new_post_button', 'Start New Discussion');
  const backToCategoriesButton = useText('peer_support.back_to_categories', 'Back to Categories');
  const backToPostsButton = useText('peer_support.back_to_posts', 'Back to Discussions');
  const postTitlePlaceholder = useText('peer_support.post_title_placeholder', 'Discussion Title');
  const postContentPlaceholder = useText('peer_support.post_content_placeholder', 'Share your thoughts or questions...');
  const commentPlaceholder = useText('peer_support.comment_placeholder', 'Add a supportive comment...');
  const submitPostButton = useText('peer_support.submit_post_button', 'Post Discussion');
  const submitCommentButton = useText('peer_support.submit_comment_button', 'Post Comment');
  const anonymousToggleLabel = useText('peer_support.anonymous_toggle', 'Post Anonymously');
  const postsText = useText('peer_support.posts_text', 'discussions');
  const repliesText = useText('peer_support.replies_text', 'replies');
  const likesText = useText('peer_support.likes_text', 'likes');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [isAuthenticated, isGuest, router]);
  
  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !activeCategory) return;
    
    // In a real app, this would send the post data to a server
    // For now, we'll just clear the form and hide it
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostForm(false);
    
    // Simulate adding the new post to the current category
    const newPost = {
      id: `new-${Date.now()}`,
      title: newPostTitle,
      content: newPostContent,
      author: isAnonymous ? 'Anonymous Student' : user?.name || 'User',
      authorId: isAnonymous ? `anon-${Date.now()}` : user?.id || 'user-id',
      date: 'Just now',
      likes: 0,
      replies: 0,
      isAnonymous
    };
    
    // This would be handled by the server in a real app
    // For demo purposes, we're not actually modifying the mock data
    alert('Your discussion has been posted!');
  };
  
  // Handle adding a new comment
  const handleAddComment = () => {
    if (!newComment.trim() || !activePost) return;
    
    // In a real app, this would send the comment data to a server
    // For now, we'll just clear the input
    setNewComment('');
    
    // Simulate adding the new comment to the current post
    const newCommentObj = {
      id: `new-comment-${Date.now()}`,
      content: newComment,
      author: isAnonymous ? 'Anonymous Student' : user?.name || 'User',
      authorId: isAnonymous ? `anon-${Date.now()}` : user?.id || 'user-id',
      date: 'Just now',
      likes: 0,
      isAnonymous
    };
    
    // This would be handled by the server in a real app
    // For demo purposes, we're not actually modifying the mock data
    alert('Your comment has been posted!');
  };
  
  // If not authenticated and not guest, show nothing while redirecting
  if (!isAuthenticated && !isGuest) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              >
                Manoध्यान
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Forum Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <AnimatedText 
            text={forumTitle} 
            className="text-3xl font-bold text-gray-900 dark:text-white" 
            duration={0.5}
          />
          <AnimatedText 
            text={forumSubtitle} 
            className="mt-2 text-xl text-gray-600 dark:text-gray-300" 
            duration={0.5}
            delay={0.1}
          />
        </div>
        
        {/* Categories View */}
        {!activeCategory && !activePost && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{categoriesTitle}</h2>
                <button
                  onClick={() => setShowNewPostForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                  disabled={true} // Disabled until a category is selected
                >
                  {newPostButton}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FORUM_CATEGORIES.map((category) => (
                  <div 
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{category.postCount} {postsText}</span>
                      <button className="text-blue-600 dark:text-blue-400 hover:underline">
                        View Discussions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Posts View */}
        {activeCategory && !activePost && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="mr-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                  </button>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {FORUM_CATEGORIES.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                </div>
                <button
                  onClick={() => setShowNewPostForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  {newPostButton}
                </button>
              </div>
              
              {/* New Post Form */}
              {showNewPostForm && (
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Discussion</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder={postTitlePlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder={postContentPlaceholder}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        {anonymousToggleLabel}
                      </label>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowNewPostForm(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreatePost}
                        disabled={!newPostTitle.trim() || !newPostContent.trim()}
                        className={cn(
                          "px-4 py-2 rounded-lg text-white font-medium transition-colors",
                          !newPostTitle.trim() || !newPostContent.trim()
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        )}
                      >
                        {submitPostButton}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Posts List */}
              <div className="space-y-6">
                {MOCK_POSTS[activeCategory]?.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{post.content}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                        <span>{post.likes} {likesText}</span>
                        <span>{post.replies} {repliesText}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Single Post View */}
        {activePost && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setActivePost(null)}
                  className="mr-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{activePost.title}</h2>
              </div>
              
              {/* Post Content */}
              <div className="mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{activePost.content}</p>
                  <div className="flex justify-between items-center mt-6 text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <span>{activePost.author}</span>
                      <span className="mx-2">•</span>
                      <span>{activePost.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                        <span>{activePost.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <span>{activePost.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comments */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Comments</h3>
                <div className="space-y-4">
                  {MOCK_COMMENTS[activePost.id]?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <span>{comment.author}</span>
                          <span className="mx-2">•</span>
                          <span>{comment.date}</span>
                        </div>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                          </svg>
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* No comments message */}
                  {!MOCK_COMMENTS[activePost.id] && (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                      No comments yet. Be the first to add a supportive comment!
                    </div>
                  )}
                </div>
              </div>
              
              {/* Add Comment */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add a Comment</h3>
                <div className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={commentPlaceholder}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comment-anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="comment-anonymous" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        {anonymousToggleLabel}
                      </label>
                    </div>
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className={cn(
                        "px-4 py-2 rounded-lg text-white font-medium transition-colors",
                        !newComment.trim()
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      )}
                    >
                      {submitCommentButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}