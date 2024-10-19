import React from 'react';
import {RedirectStatus, RedirectResult} from "@/lib/types";

interface StatFilterProps {
    results: RedirectResult[];
    activeFilter: 'all' | RedirectStatus;
    setActiveFilter: (filter: 'all' | RedirectStatus) => void;
}

export default function StatFilter({ results, activeFilter, setActiveFilter }: StatFilterProps) {
    const totalCount = results.length;
    const successCount = results.filter(result => result.status === RedirectStatus.SUCCESS).length;
    const failureCount = results.filter(result => result.status === RedirectStatus.FAILURE).length;
    const warningCount = results.filter(result => result.status === RedirectStatus.WARNING).length;
    return (
        <div className="flex flex-wrap gap-4 justify-start items-center mb-4">
            <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium ${activeFilter === 'all' ? 'bg-gray-200 text-gray-800' : 'bg-white text-black'}`}
            >
                All ({totalCount})
            </button>
            <button
                onClick={() => setActiveFilter(RedirectStatus.SUCCESS)}
                className={`px-3 py-1 rounded-lg font-medium ${activeFilter === RedirectStatus.SUCCESS ? 'bg-emerald-200 text-emerald-600' : 'bg-white text-black'}`}
                disabled={successCount === 0}
            >
                Success ({successCount})
            </button>
            <button
                onClick={() => setActiveFilter(RedirectStatus.FAILURE)}
                className={`px-3 py-1 rounded-lg font-medium ${activeFilter === RedirectStatus.FAILURE ? 'bg-red-200 text-red-600' : 'bg-white text-black'}`}
                disabled={failureCount === 0}
            >
                Failure ({failureCount})
            </button>
            <button
                onClick={() => setActiveFilter(RedirectStatus.WARNING)}
                className={`px-3 py-1 rounded-lg font-medium ${activeFilter === RedirectStatus.WARNING ? 'bg-yellow-200 text-yellow-800' : 'bg-white text-black'}`}
                disabled={warningCount === 0}
            >
                Warning ({warningCount})
            </button>
        </div>
    )
}