import { useState } from "react";

import AreaChartCard from "@/components/overView/AreaChartCard";
import BarChartCard from "@/components/overView/BarChartCard";
import RecentUsersTable from "@/components/shared/RecentUsersTable";
import { useGetOverview } from "@/services/hooks/useGetOverview";
import {

  SkeletonChartCard,
  SkeletonTable,
} from "@/components/Skeletons/OverviewSkeleton";

export default function OverViewPage() {
  const [totalYear, setTotalYear] = useState<number>(2026);
  const [premiumYear, setPremiumYear] = useState<number>(2026);

  const {
    isLoading,
    isChartFetching,
    totalUserChartData,
    premiumUserChartData,
    recentUsers,
  } = useGetOverview(totalYear, premiumYear);

  return (
    <div className="min-h-screen p-6 space-y-6" style={{ background: "#fff" }}>
      {/* ─── Stats ───────────────────────── */}


      {/* ─── Charts ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isLoading ? (
          <>
            <SkeletonChartCard />
            <SkeletonChartCard />
          </>
        ) : (
          <>
            {/* Charts stay mounted — year changes only update data inside */}
            <div
              className={`transition-opacity duration-200 ${isChartFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            >
              <AreaChartCard
                title="Monthly User Growth"
                data={totalUserChartData}
                strokeColor="#89957F"
                gradientFrom="#89957F"
                gradientTo="#B0BCA8"
                year={totalYear}
                onYearChange={setTotalYear}
              />
            </div>
            <div
              className={`transition-opacity duration-200 ${isChartFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            >
              <BarChartCard
                title="Yearly User Overview"
                data={premiumUserChartData}
                barColor="#89957F"
                barColorEnd="#A8B49E"
                year={premiumYear}
                onYearChange={setPremiumYear}
              />
            </div>
          </>
        )}
      </div>

      {/* ─── Recent Users ─────────────────── */}
      {isLoading ? <SkeletonTable /> : <RecentUsersTable data={recentUsers} />}
    </div>
  );
}
