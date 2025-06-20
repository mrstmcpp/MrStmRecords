
import { useState } from "react";
import {toast} from "react-toastify"

export const Pagination = ({ page, setPage, totalPages }) => {
    const [inputPage, setInputPage] = useState("");

    const handleJump = () => {
        const num = parseInt(inputPage);
        if (!isNaN(num) && num >= 1 && num <= totalPages) {
            setPage(num);
            setInputPage("");
        }else{
            toast.warn("Please enter a valid page number.")
            
        }
    };
    return (
        <div className="flex flex-col justify-center place-items-center m-4 p-4">
            <div className="flex flex-row justify-items-stretch font-semibold">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-orange-800 rounded-md m-2 p-1 disabled:bg-gray-800"
                >
                    Prev
                </button>
                <span className="text-white bg-slate-800 rounded-md m-2 p-1">Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="bg-orange-800 rounded-md m-2 p-1 disabled:bg-gray-800"
                >
                    Next
                </button>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
                <input
                    type="number"
                    value={inputPage}
                    onChange={(e) => setInputPage(e.target.value)}
                    placeholder="Jump to..."
                    className="bg-gray-900 border border-gray-600 rounded px-2 py-1 w-20 text-white"
                />
                <button
                    onClick={handleJump}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                    Go
                </button>
            </div>
        </div>
    )
}