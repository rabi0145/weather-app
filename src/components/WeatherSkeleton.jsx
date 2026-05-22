/**
 * Skeleton loader component for weather data
 * Styled with gradient neon theme
 */
export const WeatherSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Current Weather Skeleton */}
      <div className="bg-gradient-to-br from-gray-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 space-y-4 border border-cyan-500/30">
        <div className="h-12 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-lg w-3/4"></div>
        <div className="h-20 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-lg w-1/2"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl"></div>
          <div className="h-24 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl"></div>
          <div className="h-24 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-xl"></div>
          <div className="h-24 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-xl"></div>
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gradient-to-r from-cyan-500/30 to-pink-500/30 rounded-lg w-1/4"></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-900/90 to-purple-900/90 backdrop-blur-xl rounded-xl p-4 space-y-3 border border-purple-500/30"
            >
              <div className="h-5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded"></div>
              <div className="h-12 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded mx-auto w-12"></div>
              <div className="h-5 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
