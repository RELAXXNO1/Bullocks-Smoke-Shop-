import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const skeletons = {
    card: (
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
        <Skeleton height={16} width="75%" />
        <div className="space-y-2">
          <Skeleton height={12} />
          <Skeleton height={12} width="83%" />
        </div>
      </div>
    ),
    table: (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-3">
          <Skeleton height={32} />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height={24} />
            ))}
          </div>
        </div>
      </div>
    ),
    product: (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Skeleton height={192} />
        <div className="p-4 space-y-3">
          <Skeleton height={16} width="75%" />
          <Skeleton height={12} width="50%" />
          <Skeleton height={32} width="25%" />
        </div>
      </div>
    ),
    content: (
      <div className="space-y-4">
        <Skeleton height={32} width="50%" />
        <Skeleton count={3} />
        <div className="space-y-2">
          <Skeleton height={24} width="35%" />
          <Skeleton count={2} />
        </div>
        <Skeleton count={3} />
      </div>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {[...Array(count)].map((_, i) => (
        <div key={i}>{skeletons[type]}</div>
      ))}
    </motion.div>
  );
}