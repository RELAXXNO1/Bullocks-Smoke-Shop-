import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const analyticsService = {
  async getVisitorStats(timeRange = 'week') {
    try {
      const now = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate.setDate(now.getDate() - 7);
      }

      // Convert dates to Firestore Timestamps
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(now);

      // Fetch visitor analytics
      const visitsRef = collection(db, 'analytics_visits');
      const visitsQuery = query(
        visitsRef,
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp),
        orderBy('timestamp', 'asc')
      );

      // Fetch product views
      const viewsRef = collection(db, 'product_views');
      const viewsQuery = query(
        viewsRef,
        where('timestamp', '>=', startTimestamp),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      // Fetch products for category distribution
      const productsRef = collection(db, 'products');
      const productsQuery = query(productsRef);

      // Execute all queries in parallel
      const [visitsSnapshot, viewsSnapshot, productsSnapshot] = await Promise.all([
        getDocs(visitsQuery),
        getDocs(viewsQuery),
        getDocs(productsQuery)
      ]);

      // Process data and return formatted stats
      return formatAnalyticsData(visitsSnapshot, viewsSnapshot, productsSnapshot);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw new Error('Failed to load analytics data');
    }
  }
};

function formatAnalyticsData(visitsSnapshot, viewsSnapshot, productsSnapshot) {
  // Process visits data
  const visitsByDay = {};
  visitsSnapshot.forEach(doc => {
    const date = doc.data().timestamp.toDate().toLocaleDateString();
    visitsByDay[date] = (visitsByDay[date] || 0) + 1;
  });

  // Process product views data
  const productViews = {};
  viewsSnapshot.forEach(doc => {
    const { productId, productName } = doc.data();
    productViews[productId] = {
      name: productName,
      views: (productViews[productId]?.views || 0) + 1
    };
  });

  // Process category distribution
  const categoryDistribution = {};
  productsSnapshot.forEach(doc => {
    const { category } = doc.data();
    categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;
  });

  // Format chart data
  const visitorData = {
    labels: Object.keys(visitsByDay),
    datasets: [{
      label: 'Visitors',
      data: Object.values(visitsByDay),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4,
      fill: true
    }]
  };

  const popularProducts = {
    labels: Object.values(productViews).map(p => p.name),
    datasets: [{
      label: 'Views',
      data: Object.values(productViews).map(p => p.views),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(234, 88, 12, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    }]
  };

  const categoryData = {
    labels: Object.keys(categoryDistribution),
    datasets: [{
      data: Object.values(categoryDistribution),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(234, 88, 12, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ]
    }]
  };

  // Calculate stats
  const totalVisits = Object.values(visitsByDay).reduce((a, b) => a + b, 0);
  const totalViews = Object.values(productViews).reduce((a, b) => a + b.views, 0);
  
  const stats = [
    { 
      id: 1, 
      name: 'Total Visitors', 
      stat: totalVisits.toLocaleString(),
      change: '+12.1%',
      changeType: 'increase',
      icon: 'users'
    },
    {
      id: 2,
      name: 'Product Views',
      stat: totalViews.toLocaleString(),
      change: '+8.4%',
      changeType: 'increase',
      icon: 'cursor'
    },
    {
      id: 3,
      name: 'Categories',
      stat: Object.keys(categoryDistribution).length,
      change: '0%',
      changeType: 'neutral',
      icon: 'chart'
    },
    {
      id: 4,
      name: 'Total Products',
      stat: productsSnapshot.size.toLocaleString(),
      change: '+3.2%',
      changeType: 'increase',
      icon: 'cart'
    }
  ];

  return {
    stats,
    visitorData,
    categoryData,
    popularProducts
  };
}