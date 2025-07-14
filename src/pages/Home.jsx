import React, { useState, useEffect, useRef, useCallback } from 'react';
import VideoCard from '../components/VideoCard';
import SkeletonCard from '../components/SkeletonCard';
import AgeGate from '../components/AgeGate';
import SearchSortBar from '../components/SearchSortBar';

const PAGE_SIZE = 6;

export default function Home() {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(localStorage.getItem('is18plus') === 'true');

  const observerRef = useRef();

  // ✅ Fetch video list from API or cache
  useEffect(() => {
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const cached = localStorage.getItem('video_cache');
  const cacheTime = localStorage.getItem('video_cache_time');
  const expired = !cacheTime || Date.now() - cacheTime > 60000;

  if (!cached || expired) {
    fetch('https://adult-aurahub.onrender.com/api/files')
      .then((res) => res.json())
      .then((data) => {
        const files = data.result?.files || [];
        const shuffled = shuffleArray(files);
        setAllVideos(shuffled);
        localStorage.setItem('video_cache', JSON.stringify(shuffled));
        localStorage.setItem('video_cache_time', Date.now().toString());
      })
      .catch((e) => console.error('Error fetching files:', e))
      .finally(() => setLoading(false));
  } else {
    const parsed = JSON.parse(cached);
    setAllVideos(shuffleArray(parsed));
    setLoading(false);
  }
}, []);


  // ✅ Sorting logic
  const sortVideos = useCallback((videos) => {
    const sorted = [...videos];
    switch (sort) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case '-name':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'size':
        return sorted.sort((a, b) => a.size - b.size);
      case '-size':
        return sorted.sort((a, b) => b.size - a.size);
      case 'date':
        return sorted.sort((a, b) => b.created_at - a.created_at);
      case '-date':
        return sorted.sort((a, b) => a.created_at - b.created_at);
      default:
        return sorted;
    }
  }, [sort]);

  // ✅ Filter and set visible videos when data/search/sort changes
  useEffect(() => {
    const filtered = allVideos.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortVideos(filtered);
    setDisplayedVideos(sorted.slice(0, PAGE_SIZE));
    setPage(1);
  }, [allVideos, search, sort, sortVideos]);

  // ✅ Load more videos
  const loadMore = useCallback(() => {
    const filtered = allVideos.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortVideos(filtered);
    const nextPage = page + 1;
    const nextVideos = sorted.slice(0, nextPage * PAGE_SIZE);
    setDisplayedVideos(nextVideos);
    setPage(nextPage);
  }, [allVideos, search, sortVideos, page]);

  // ✅ Infinite Scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && displayedVideos.length < allVideos.length) {
        loadMore();
      }
    }, {
      rootMargin: '100px',
    });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [observerRef, loadMore, loading, displayedVideos.length, allVideos.length]);

  // ✅ Age confirmation
  if (!ageConfirmed) {
    return <AgeGate onConfirm={() => setAgeConfirmed(true)} />;
  }

  return (
    <div className="p-4">
      <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVideos.map((video) => (
          <VideoCard key={video.linkid} video={video} />
        ))}

        {loading && Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {/* Infinite Scroll Trigger Element */}
      {!loading && displayedVideos.length < allVideos.length && (
        <div ref={observerRef} className="text-center py-4 text-gray-500">
          Loading more videos...
        </div>
      )}
    </div>
  );
}
