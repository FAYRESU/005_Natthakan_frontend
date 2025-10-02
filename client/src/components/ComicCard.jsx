// ComicCard.jsx
const ComicCard = ({ comic, onDelete }) => (
  <div className="card bg-white shadow-md rounded-lg">
    <img src={comic.coverImage} alt={comic.title} className="h-60 w-full object-cover"/>
    <div className="p-4">
      <h2 className="font-bold text-lg">{comic.title}</h2>
      <p>Series: {comic.series}</p>
      <p>Volume: {comic.volumeNumber}</p>
      <p>Illustrator: {comic.illustrator}</p>
      <button className="btn btn-sm btn-error mt-2" onClick={onDelete}>Delete</button>
    </div>
  </div>
);

export default ComicCard; 