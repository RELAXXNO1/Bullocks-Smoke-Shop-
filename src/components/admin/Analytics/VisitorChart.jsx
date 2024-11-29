import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { commonOptions } from './ChartConfig';

export default function VisitorChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Overview</h3>
      <div className="h-80">
        <Line 
          ref={chartRef}
          data={data} 
          options={options}
          redraw={false}
        />
      </div>
    </motion.div>
  );
}