export const PhotoGrid = ({ photos, onPhotoClick }: { photos: any[]; onPhotoClick: (photo: any) => void }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.thumb}
          alt={photo.alt_description}
          className="cursor-pointer rounded shadow hover:scale-105 transition"
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
};