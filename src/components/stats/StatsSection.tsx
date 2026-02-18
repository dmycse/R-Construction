import type { StatsDataSchema } from "@/content/config";
import { useStatsCounter } from "@/hooks/useStatsCounter";

type StatsType = Pick<StatsDataSchema, "sectionId" | "statsData"> ;

export default function StatsSection({ sectionId, statsData }: StatsType) {
  const sectionRef = useStatsCounter({ duration: 5000 });

  return (
    <section 
      id={sectionId}
      ref={sectionRef} 
      class="w-full py-10 xl:py-24 bg-primary"
    >
      <div class="page-container h-full">
        <ul class="w-full flex flex-col lg:grid lg:grid-cols-4 lg:place-items-center gap-10 text-slate-50">
          {statsData.map(statElem => (
            <li class="flex flex-col items-center justify-between">
              <div class="flex items-center gap-0 text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold">
                <span data-count={statElem.countNum}>0</span>
                <span>{statElem.countText}</span>
              </div>
              <p class="text-xl md:text-2xl">{statElem.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}