import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../api/unsplash";
import { SearchBar } from "../components/SearchBar";
import { PhotoGrid } from "../components/PhotoGrid";
import { Pagination } from "../components/Pagination";
import "../App.css";
import Modal from "../components/PhotoModal";


interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
  };
}
function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useCallback(
    (value: string) => {
      setPage(1);
      setQuery(value);
    },
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos", query, page],
    queryFn: () => fetchPhotos(page, query),
    staleTime: 1000 * 60 * 5,
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Unsplash Gallery</h1>
 
      <SearchBar onSearch={handleSearch} initialValue={query} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}

      {data && (
        <PhotoGrid photos={data.results} onPhotoClick={handlePhotoClick} />
      )}
     <Pagination page={page} setPage={setPage} />
      {selectedPhoto && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={selectedPhoto.urls.full}
          alt={selectedPhoto.alt_description}
          description={selectedPhoto.alt_description || "No description"}
        />
      )}
    </div>

  );
}
export default Home;
