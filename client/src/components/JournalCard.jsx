import ItemsCard from "./ItemsCard";

export function JournalCard({ journal, onDelete }) {
  if (!journal) return null; 

  return (
    <ItemsCard items={journal} onDelete={onDelete} type="journal">
      <p><strong>หมายเลข ISSN:</strong> {journal.issn}</p>
      <p><strong>เล่มที่:</strong> {journal.volume}</p>
      <p><strong>ฉบับที่:</strong> {journal.issue}</p>
      <p><strong>ความถี่ในการออก:</strong> {journal.publicationFrequency}</p>
    </ItemsCard>
  );
}

export default JournalCard;
