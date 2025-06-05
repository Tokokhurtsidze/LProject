export const Pagination = ({ page, setPage }: { page: number; setPage: (page: number) => void }) => {
  return (
    <div className="flex justify-center mt-4 gap-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-600" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600" onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};