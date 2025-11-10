export default function CommunicationBasicsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Score card skeleton */}
      <div className="bg-gray-100 rounded-2xl h-64" />

      {/* Section skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-100 rounded-xl h-48" />
      ))}
    </div>
  );
}
