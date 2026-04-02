import { summaryData } from "../../data/mockData";
import SummaryCard from "./SummaryCard";

export default function SummaryCardsRow() {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {summaryData.map((item) => (
        <SummaryCard key={item.id} data={item} />
      ))}
    </section>
  );
}
