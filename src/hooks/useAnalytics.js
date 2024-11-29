import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analytics.service';

export const useAnalytics = (timeRange = 'week') => {
  const [data, setData] = useState({
    stats: null,
    visitorData: null,
    categoryData: null,
    popularProducts: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        const analyticsData = await analyticsService.getVisitorStats(timeRange);
        
        setData({
          ...analyticsData,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load analytics data. Please try again later.'
        }));
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  return data;
};