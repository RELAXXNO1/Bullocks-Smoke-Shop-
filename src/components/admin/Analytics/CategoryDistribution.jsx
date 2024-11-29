import { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { commonOptions } from './ChartConfig';

export default function CategoryDistribution({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    cutout: '65%',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
      <div className="h-80">
        <Doughnut 
          ref={chartRef}
          data={data} 
          options={options}
          redraw={false}
        />
      </div>
    </motion.div>
  );
}