// src/components/AdminContentManagement.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './AdminContentManagement.css';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  category: 'biosecurity' | 'animal_health' | 'feeding' | 'management' | 'vaccination' | 'emergency';
  targetAudience: ('farmer' | 'veterinarian')[];
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  fileSize: string;
  uploadDate: string;
  views: number;
  likes: number;
  status: 'published' | 'draft' | 'archived';
  tags: string[];
  language: string;
  expertName?: string;
  expertTitle?: string;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

const AdminContentManagement: React.FC = () => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoContent[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterAudience, setFilterAudience] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // New video form state
  const [newVideo, setNewVideo] = useState<Partial<VideoContent>>({
    title: '',
    description: '',
    category: 'biosecurity',
    targetAudience: ['farmer'],
    status: 'draft',
    tags: [],
    language: 'en',
    expertName: '',
    expertTitle: ''
  });

  // Mock data for existing videos
  const mockVideos: VideoContent[] = [
    {
      id: 'VID_001',
      title: 'Biosecurity Measures for Poultry Farms',
      description: 'Complete guide to implementing effective biosecurity protocols in poultry farming to prevent disease outbreaks.',
      category: 'biosecurity',
      targetAudience: ['farmer', 'veterinarian'],
      videoUrl: '/videos/biosecurity-poultry.mp4',
      thumbnailUrl: '/thumbnails/biosecurity-poultry.jpg',
      duration: '15:30',
      fileSize: '45.2 MB',
      uploadDate: '2024-02-10',
      views: 1245,
      likes: 89,
      status: 'published',
      tags: ['biosecurity', 'poultry', 'disease prevention', 'farm management'],
      language: 'en',
      expertName: 'Dr. Priya Sharma',
      expertTitle: 'Poultry Health Specialist'
    },
    {
      id: 'VID_002',
      title: 'Swine Fever Prevention and Control',
      description: 'Advanced techniques for preventing and controlling African Swine Fever in pig farms.',
      category: 'animal_health',
      targetAudience: ['veterinarian'],
      videoUrl: '/videos/swine-fever-control.mp4',
      thumbnailUrl: '/thumbnails/swine-fever.jpg',
      duration: '22:15',
      fileSize: '68.7 MB',
      uploadDate: '2024-02-08',
      views: 867,
      likes: 45,
      status: 'published',
      tags: ['swine fever', 'disease control', 'pigs', 'veterinary'],
      language: 'en',
      expertName: 'Dr. Rajesh Kumar',
      expertTitle: 'Swine Disease Expert'
    },
    {
      id: 'VID_003',
      title: 'Proper Feeding Techniques for Broiler Chickens',
      description: 'Learn optimal feeding practices to maximize growth and health in broiler chickens.',
      category: 'feeding',
      targetAudience: ['farmer'],
      videoUrl: '/videos/broiler-feeding.mp4',
      thumbnailUrl: '/thumbnails/broiler-feeding.jpg',
      duration: '12:45',
      fileSize: '38.9 MB',
      uploadDate: '2024-02-05',
      views: 1567,
      likes: 112,
      status: 'published',
      tags: ['feeding', 'broiler', 'nutrition', 'poultry'],
      language: 'hi',
      expertName: 'Dr. Amit Patel',
      expertTitle: 'Animal Nutritionist'
    },
    {
      id: 'VID_004',
      title: 'Emergency Response for Animal Disease Outbreaks',
      description: 'Protocols and immediate actions to take during disease outbreaks in livestock.',
      category: 'emergency',
      targetAudience: ['farmer', 'veterinarian'],
      videoUrl: '/videos/emergency-response.mp4',
      thumbnailUrl: '/thumbnails/emergency-response.jpg',
      duration: '18:20',
      fileSize: '55.1 MB',
      uploadDate: '2024-02-01',
      views: 934,
      likes: 67,
      status: 'published',
      tags: ['emergency', 'outbreak', 'response', 'livestock'],
      language: 'en',
      expertName: 'Dr. Sanjay Mehta',
      expertTitle: 'Emergency Response Coordinator'
    },
    {
      id: 'VID_005',
      title: 'Vaccination Schedule for Poultry',
      description: 'Complete vaccination timeline and administration techniques for poultry farms.',
      category: 'vaccination',
      targetAudience: ['farmer'],
      videoUrl: '/videos/poultry-vaccination.mp4',
      thumbnailUrl: '/thumbnails/poultry-vaccination.jpg',
      duration: '14:50',
      fileSize: '42.3 MB',
      uploadDate: '2024-01-28',
      views: 2034,
      likes: 156,
      status: 'published',
      tags: ['vaccination', 'poultry', 'schedule', 'prevention'],
      language: 'hi'
    }
  ];

  useEffect(() => {
    setVideos(mockVideos);
    setFilteredVideos(mockVideos);
  }, []);

  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(video => video.category === filterCategory);
    }

    if (filterAudience !== 'all') {
      filtered = filtered.filter(video => video.targetAudience.includes(filterAudience as 'farmer' | 'veterinarian'));
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(video => video.status === filterStatus);
    }

    setFilteredVideos(filtered);
  }, [searchTerm, filterCategory, filterAudience, filterStatus, videos]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'biosecurity': return '🛡️';
      case 'animal_health': return '🏥';
      case 'feeding': return '🍽️';
      case 'management': return '⚙️';
      case 'vaccination': return '💉';
      case 'emergency': return '🚨';
      default: return '📹';
    }
  };

  const getCategoryName = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getAudienceIcon = (audience: string) => {
    return audience === 'farmer' ? '👨‍🌾' : '👨‍⚕️';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'status-published';
      case 'draft': return 'status-draft';
      case 'archived': return 'status-archived';
      default: return 'status-default';
    }
  };

  const getLanguageName = (code: string) => {
    return code === 'en' ? 'English' : 'Hindi';
  };

  const simulateVideoUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress({
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    });

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (!prev) return prev;
        
        const newProgress = prev.progress + Math.random() * 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Add the new video to the list
          const newVideoContent: VideoContent = {
            id: `VID_${Date.now()}`,
            title: newVideo.title || file.name.replace(/\.[^/.]+$/, ""),
            description: newVideo.description || 'No description provided',
            category: newVideo.category || 'biosecurity',
            targetAudience: newVideo.targetAudience || ['farmer'],
            videoUrl: URL.createObjectURL(file),
            thumbnailUrl: '/thumbnails/default.jpg',
            duration: '00:00',
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            uploadDate: new Date().toISOString().split('T')[0],
            views: 0,
            likes: 0,
            status: newVideo.status || 'draft',
            tags: newVideo.tags || [],
            language: newVideo.language || 'en',
            expertName: newVideo.expertName,
            expertTitle: newVideo.expertTitle
          };

          setVideos(prev => [newVideoContent, ...prev]);
          setIsUploading(false);
          setShowUploadForm(false);
          setNewVideo({
            title: '',
            description: '',
            category: 'biosecurity',
            targetAudience: ['farmer'],
            status: 'draft',
            tags: [],
            language: 'en'
          });

          return {
            ...prev,
            progress: 100,
            status: 'completed'
          };
        }

        return {
          ...prev,
          progress: newProgress
        };
      });
    }, 200);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      simulateVideoUpload(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !newVideo.tags?.includes(tag)) {
      setNewVideo(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewVideo(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const updateVideoStatus = (videoId: string, status: VideoContent['status']) => {
    setVideos(prev => prev.map(video =>
      video.id === videoId ? { ...video, status } : video
    ));
  };

  const deleteVideo = (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideos(prev => prev.filter(video => video.id !== videoId));
      if (selectedVideo?.id === videoId) {
        setSelectedVideo(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="admin-content-management">
      <div className="content-header">
        <h1>Educational Content Management</h1>
        <p>Upload and manage educational videos for farmers and veterinarians</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📹</div>
          <div className="stat-content">
            <div className="stat-number">{videos.length}</div>
            <div className="stat-label">Total Videos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-number">{videos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}</div>
            <div className="stat-label">Total Views</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🌾</div>
          <div className="stat-content">
            <div className="stat-number">{videos.filter(v => v.targetAudience.includes('farmer')).length}</div>
            <div className="stat-label">Farmer Videos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <div className="stat-number">{videos.filter(v => v.targetAudience.includes('veterinarian')).length}</div>
            <div className="stat-label">Veterinarian Videos</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search videos by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="biosecurity">Biosecurity</option>
            <option value="animal_health">Animal Health</option>
            <option value="feeding">Feeding</option>
            <option value="management">Management</option>
            <option value="vaccination">Vaccination</option>
            <option value="emergency">Emergency</option>
          </select>
          <select
            value={filterAudience}
            onChange={(e) => setFilterAudience(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Audience</option>
            <option value="farmer">Farmers</option>
            <option value="veterinarian">Veterinarians</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowUploadForm(true)}
          disabled={isUploading}
        >
          + Upload New Video
        </button>
      </div>

      <div className="content-layout">
        {/* Videos List */}
        <div className="videos-section">
          <h2>Video Library ({filteredVideos.length})</h2>
          <div className="videos-grid">
            {filteredVideos.length === 0 ? (
              <div className="empty-state">
                No videos found matching your criteria.
              </div>
            ) : (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className={`video-card ${selectedVideo?.id === video.id ? 'selected' : ''}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="video-thumbnail">
                    <div className="thumbnail-placeholder">
                      <span className="play-icon">▶</span>
                    </div>
                    <div className="video-overlay">
                      <span className="duration">{video.duration}</span>
                      <span className={`status-badge ${getStatusColor(video.status)}`}>
                        {video.status}
                      </span>
                    </div>
                  </div>

                  <div className="video-content">
                    <div className="video-header">
                      <h3>{video.title}</h3>
                      <div className="video-meta">
                        <span className="category-tag">
                          {getCategoryIcon(video.category)} {getCategoryName(video.category)}
                        </span>
                      </div>
                    </div>

                    <p className="video-description">{video.description}</p>

                    <div className="video-details">
                      <div className="audience-tags">
                        {video.targetAudience.map(audience => (
                          <span key={audience} className="audience-tag">
                            {getAudienceIcon(audience)} {audience}
                          </span>
                        ))}
                      </div>
                      
                      <div className="video-stats">
                        <span>👁️ {formatViews(video.views)}</span>
                        <span>❤️ {video.likes}</span>
                        <span>🗓️ {formatDate(video.uploadDate)}</span>
                      </div>

                      <div className="video-tags">
                        {video.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                        {video.tags.length > 3 && (
                          <span className="tag-more">+{video.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="video-actions">
                    <button 
                      className="action-btn edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewVideo(video);
                        setShowUploadForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVideo(video.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Video Details / Preview */}
        <div className="video-details-section">
          {selectedVideo ? (
            <div className="video-detail-card">
              <div className="detail-header">
                <h2>{selectedVideo.title}</h2>
                <div className="header-actions">
                  <select
                    value={selectedVideo.status}
                    onChange={(e) => updateVideoStatus(selectedVideo.id, e.target.value as VideoContent['status'])}
                    className="status-select"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="video-player">
                <div className="player-placeholder">
                  <span className="play-icon-large">▶</span>
                  <p>Video Player Preview</p>
                </div>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <h3>Video Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Description:</label>
                      <p>{selectedVideo.description}</p>
                    </div>
                    <div className="info-item">
                      <label>Category:</label>
                      <span className="category-tag">
                        {getCategoryIcon(selectedVideo.category)} {getCategoryName(selectedVideo.category)}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Target Audience:</label>
                      <div className="audience-tags">
                        {selectedVideo.targetAudience.map(audience => (
                          <span key={audience} className="audience-tag">
                            {getAudienceIcon(audience)} {audience}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="info-item">
                      <label>Language:</label>
                      <span>{getLanguageName(selectedVideo.language)}</span>
                    </div>
                    {selectedVideo.expertName && (
                      <div className="info-item">
                        <label>Expert:</label>
                        <span>{selectedVideo.expertName} {selectedVideo.expertTitle && `- ${selectedVideo.expertTitle}`}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Video Statistics</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <label>Views:</label>
                      <span>{selectedVideo.views.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                      <label>Likes:</label>
                      <span>{selectedVideo.likes}</span>
                    </div>
                    <div className="stat-item">
                      <label>Upload Date:</label>
                      <span>{formatDate(selectedVideo.uploadDate)}</span>
                    </div>
                    <div className="stat-item">
                      <label>Duration:</label>
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <div className="stat-item">
                      <label>File Size:</label>
                      <span>{selectedVideo.fileSize}</span>
                    </div>
                    <div className="stat-item">
                      <label>Status:</label>
                      <span className={`status-badge ${getStatusColor(selectedVideo.status)}`}>
                        {selectedVideo.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Tags & Keywords</h3>
                  <div className="tags-container">
                    {selectedVideo.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-video-selected">
              <div className="placeholder-icon">📹</div>
              <h3>Select a Video</h3>
              <p>Choose a video from the library to view details and manage content</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>Upload New Video</h2>
              <button 
                className="close-btn"
                onClick={() => setShowUploadForm(false)}
                disabled={isUploading}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {isUploading && uploadProgress ? (
                <div className="upload-progress">
                  <h3>Uploading Video</h3>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${uploadProgress.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {uploadProgress.fileName} - {Math.round(uploadProgress.progress)}%
                    </span>
                  </div>
                </div>
              ) : (
                <div className="upload-form">
                  <div className="form-section">
                    <h3>Video File</h3>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        id="video-upload"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="file-input"
                      />
                      <label htmlFor="video-upload" className="upload-label">
                        <div className="upload-icon">📁</div>
                        <p>Click to select video file</p>
                        <span className="upload-hint">MP4, MOV, AVI up to 500MB</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Video Details</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Title *</label>
                        <input
                          type="text"
                          value={newVideo.title || ''}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter video title"
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={newVideo.description || ''}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter video description"
                          rows={3}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={newVideo.category}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, category: e.target.value as VideoContent['category'] }))}
                        >
                          <option value="biosecurity">Biosecurity</option>
                          <option value="animal_health">Animal Health</option>
                          <option value="feeding">Feeding</option>
                          <option value="management">Management</option>
                          <option value="vaccination">Vaccination</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Target Audience *</label>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={newVideo.targetAudience?.includes('farmer')}
                              onChange={(e) => {
                                const audience = newVideo.targetAudience || [];
                                if (e.target.checked) {
                                  setNewVideo(prev => ({ 
                                    ...prev, 
                                    targetAudience: [...audience, 'farmer'] 
                                  }));
                                } else {
                                  setNewVideo(prev => ({ 
                                    ...prev, 
                                    targetAudience: audience.filter(a => a !== 'farmer') 
                                  }));
                                }
                              }}
                            />
                            <span className="checkmark"></span>
                            👨‍🌾 Farmers
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={newVideo.targetAudience?.includes('veterinarian')}
                              onChange={(e) => {
                                const audience = newVideo.targetAudience || [];
                                if (e.target.checked) {
                                  setNewVideo(prev => ({ 
                                    ...prev, 
                                    targetAudience: [...audience, 'veterinarian'] 
                                  }));
                                } else {
                                  setNewVideo(prev => ({ 
                                    ...prev, 
                                    targetAudience: audience.filter(a => a !== 'veterinarian') 
                                  }));
                                }
                              }}
                            />
                            <span className="checkmark"></span>
                            👨‍⚕️ Veterinarians
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Language</label>
                        <select
                          value={newVideo.language}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, language: e.target.value }))}
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          value={newVideo.status}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, status: e.target.value as VideoContent['status'] }))}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Expert Information (Optional)</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Expert Name</label>
                        <input
                          type="text"
                          value={newVideo.expertName || ''}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, expertName: e.target.value }))}
                          placeholder="Enter expert name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Expert Title</label>
                        <input
                          type="text"
                          value={newVideo.expertTitle || ''}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, expertTitle: e.target.value }))}
                          placeholder="Enter expert title/position"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Tags</h3>
                    <div className="tags-input-container">
                      <div className="tags-display">
                        {newVideo.tags?.map(tag => (
                          <span key={tag} className="tag">
                            {tag}
                            <button 
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="tag-remove"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add tags (press Enter)"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            handleAddTag(e.currentTarget.value.trim());
                            e.currentTarget.value = '';
                            e.preventDefault();
                          }
                        }}
                        className="tags-input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!isUploading && (
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => document.getElementById('video-upload')?.click()}
                  disabled={!newVideo.title || !newVideo.targetAudience?.length}
                >
                  Upload Video
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContentManagement;