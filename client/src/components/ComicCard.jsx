import ItemsCard from "./ItemsCard";

export function ComicCard({ comic,  onDelete }) {
  if (!comic) return null; 

  return (
    <ItemsCard items={comic} onDelete={onDelete} type="comic"> 
        <p><strong>ชื่อซีรีส์:</strong> {comic.series}</p>
      <p><strong>เล่มที่:</strong> {comic.volumeNumber}</p>
      <p><strong>ผู้วาดภาพ:</strong> {comic.illustrator}</p>
      <p><strong>ประเภทสี:</strong> {comic.colorType}</p>
      <p><strong>กลุ่มอายุ:</strong> {comic.targetAge}</p>
    </ItemsCard>
  );
}

export default ComicCard;
