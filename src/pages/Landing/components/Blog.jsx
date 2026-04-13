import React from 'react';

export default function Blog() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span> Publications
          </p>
          <h2 className="text-4xl font-medium">Latest insights and trends</h2>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">←</button>
          <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center">→</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-4">
            <img 
              src={`https://placehold.co/400x300/e2e8f0/64748b?text=Article+${item}`} 
              alt="Blog post" 
              className="w-full h-64 object-cover rounded-2xl"
            />
            <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full mt-2">Article</span>
            <h3 className="text-xl font-medium">Unlocking Business Value With Data Analytics</h3>
            <p className="text-gray-500 text-sm">Discover insights on integrating data analytics to drive business growth effectively.</p>
          </div>
        ))}
      </div>
    </section>
  );
}