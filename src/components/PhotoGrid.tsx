interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
  };
}

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export const PhotoGrid = ({ photos, onPhotoClick }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.small}
          alt={photo.alt_description}
          className="w-full h-60 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
};
