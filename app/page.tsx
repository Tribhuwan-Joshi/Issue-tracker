import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={20} currentPage={1} pageSize={5} />;
}
