import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { fetchPhotos } from "../api/unsplash";
import Modal from "../components/PhotoModal";
import "../App.css";

interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
  };
}

function Home() {
  const [query, setQuery] = useState("nature");
  const [search, setSearch] = useState("nature");
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      setQuery(value.trim() || "nature");
    }, 500),
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos", query, page],
    queryFn: () => fetchPhotos(page, query),
    staleTime: 1000 * 60 * 5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Unsplash Gallery</h1>

      <input
        type="text"
        placeholder="Search photos..."
        value={search}
        onChange={handleInputChange}
        className="border p-2 mb-4 w-full rounded"
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.results.map((photo: Photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
            className="w-full h-60 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {selectedPhoto && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={selectedPhoto.urls.full}
          alt={selectedPhoto.alt_description}
          description={selectedPhoto.alt_description}
        />
      )}
    </div>
  );
}

export default Home;
