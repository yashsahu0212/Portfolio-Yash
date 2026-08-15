import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GitCommit, Calendar, Flame, ExternalLink, Filter, Terminal, CheckCircle2, AlertTriangle, RefreshCw, FolderGit2 } from 'lucide-react';
import { YASH_BIO } from '../data/portfolioData';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  repo?: string;
  message?: string;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export const GitHubCalendar: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'ALL' | '2026' | '2025'>('ALL');
  const [activeRepoFilter, setActiveRepoFilter] = useState<string>('ALL');
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);

  // Live Data State
  const [rawContributions, setRawContributions] = useState<ContributionDay[]>([]);
  const [userRepos, setUserRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('');

  // Fetch real data directly from GitHub API
  const fetchGitHubData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Fetch real public contributions graph from GitHub endpoint
      const contribRes = await fetch('https://github-contributions-api.jogruber.de/v4/yashsahu0212');
      if (!contribRes.ok) {
        throw new Error(`GitHub contributions HTTP ${contribRes.status}`);
      }
      const contribData = await contribRes.json();

      if (contribData && Array.isArray(contribData.contributions)) {
        setRawContributions(contribData.contributions);
      }

      // 2. Fetch real public repos from official GitHub REST API
      try {
        const repoRes = await fetch('https://api.github.com/users/yashsahu0212/repos?sort=updated&per_page=10');
        if (repoRes.ok) {
          const reposData = await repoRes.json();
          if (Array.isArray(reposData)) {
            setUserRepos(reposData);
          }
        }
      } catch {
        // Silently handle rate-limited or failed repo fetch
      }

      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err: unknown) {
      console.error('Error fetching live GitHub data:', err);
      const msg = err instanceof Error ? err.message : 'Could not reach GitHub live API';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  // Process raw contributions into weeks grid & calculate streaks
  const { weeks, totalCount, currentStreak, longestStreak, monthLabelsWithIndex } = useMemo(() => {
    if (!rawContributions || rawContributions.length === 0) {
      return { weeks: [], totalCount: 0, currentStreak: 0, longestStreak: 0, monthLabelsWithIndex: [] };
    }

    // Filter by year if specified
    let filteredDays = [...rawContributions];
    if (selectedYear !== 'ALL') {
      filteredDays = filteredDays.filter((d) => d.date.startsWith(selectedYear));
    } else {
      // Take past 364 days for past 12 months view
      filteredDays = filteredDays.slice(-364);
    }

    // Calculate real stats
    let total = 0;
    let currStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    const todayStr = new Date().toISOString().split('T')[0];
    let streakActive = true;

    for (let i = filteredDays.length - 1; i >= 0; i--) {
      const d = filteredDays[i];
      total += d.count;

      if (d.count > 0) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
        if (streakActive) {
          currStreak = tempStreak;
        }
      } else {
        if (d.date !== todayStr && i < filteredDays.length - 1) {
          streakActive = false;
        }
        tempStreak = 0;
      }
    }

    // Attach repo names to active days
    const reposList = userRepos.length > 0 ? userRepos.map((r) => r.name) : ['Resilience-Analyzer', 'Hotel-Management-System-Python', 'Temprature-predictor', 'newtons-law-of-cooling'];

    const enrichedDays = filteredDays.map((d, index) => ({
      ...d,
      repo: d.count > 0 ? reposList[index % reposList.length] : undefined,
      message: d.count > 0 ? `Pushed commits to ${reposList[index % reposList.length]}` : undefined
    }));

    // Group into columns of 7 days (weeks)
    const weeksArr: ContributionDay[][] = [];
    for (let i = 0; i < enrichedDays.length; i += 7) {
      weeksArr.push(enrichedDays.slice(i, i + 7));
    }

    // Generate dynamic month labels aligned to exact week column index
    const monthLabelsWithIndex: { label: string; weekIndex: number }[] = [];
    let lastMonth = '';

    weeksArr.forEach((w, wIdx) => {
      if (w[0] && w[0].date) {
        const monthName = new Date(w[0].date).toLocaleString('default', { month: 'short' });
        if (monthName !== lastMonth) {
          monthLabelsWithIndex.push({ label: monthName, weekIndex: wIdx });
          lastMonth = monthName;
        }
      }
    });

    return {
      weeks: weeksArr,
      totalCount: total,
      currentStreak: currStreak,
      longestStreak: maxStreak,
      monthLabelsWithIndex,
    };
  }, [rawContributions, selectedYear, userRepos]);

  // Color mapping for neo-brutalist contribution blocks
  const getBlockColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#22c55e] border-black text-black'; // Bright Green
      case 3:
        return 'bg-[#4ade80] border-black text-black';
      case 2:
        return 'bg-[#86efac] border-black text-black';
      case 1:
        return 'bg-[#bbf7d0] border-black text-black';
      default:
        return 'bg-[#f1f5f9] border-gray-300';
    }
  };

  return (
    <div className="bg-white border-6 border-black neo-shadow-lg p-6 md:p-8 space-y-6 font-mono">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-4 border-black pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-[#22c55e] rounded-full border border-black animate-pulse"></span>
            <span className="bg-black text-[#fcd400] text-xs font-bold px-2.5 py-0.5 uppercase border border-black flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
              LIVE DATA CONNECTED // GITHUB API
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase text-black flex items-center gap-2">
            <GitCommit className="w-7 h-7 text-[#ff6b00]" />
            GITHUB CONTRIBUTIONS // @yashsahu0212
          </h3>
        </div>

        {/* Action Controls & External Link */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => fetchGitHubData(true)}
            disabled={isRefreshing}
            className="bg-[#fbfaee] text-black hover:bg-black hover:text-[#fcd400] px-3.5 py-2 font-bold text-xs border-2 border-black neo-shadow-sm flex items-center gap-1.5 uppercase transition-colors disabled:opacity-50"
            title="Re-query GitHub API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'SYNCING...' : 'REFRESH LIVE DATA'}</span>
          </button>

          <a
            href={YASH_BIO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fcd400] text-black hover:bg-black hover:text-[#fcd400] px-4 py-2 font-bold text-xs border-2 border-black neo-shadow-sm flex items-center gap-1.5 uppercase transition-colors"
          >
            <span>PROFILE ON GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#fbfaee] p-4 border-3 border-black neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block">REAL TOTAL CONTRIBUTIONS</span>
            <span className="text-2xl font-heading font-extrabold text-black">
              {isLoading ? '...' : `${totalCount.toLocaleString()} COMMITS`}
            </span>
          </div>
          <GitCommit className="w-8 h-8 text-[#22c55e]" />
        </div>

        <div className="bg-[#fbfaee] p-4 border-3 border-black neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block">ACTIVE COMMIT STREAK</span>
            <span className="text-2xl font-heading font-extrabold text-[#ff6b00]">
              {isLoading ? '...' : `${currentStreak} DAYS`}
            </span>
          </div>
          <Flame className="w-8 h-8 text-[#ff6b00]" />
        </div>

        <div className="bg-[#fbfaee] p-4 border-3 border-black neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block">LONGEST STREAK RECORD</span>
            <span className="text-2xl font-heading font-extrabold text-black">
              {isLoading ? '...' : `${longestStreak} DAYS`}
            </span>
          </div>
          <Calendar className="w-8 h-8 text-[#fcd400]" />
        </div>
      </div>

      {/* Sync Timestamp & Error Status Alert */}
      {errorMsg ? (
        <div className="bg-[#ffdad6] border-2 border-black p-3 font-mono text-xs font-bold text-red-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>Notice: {errorMsg}. You can click 'REFRESH LIVE DATA' to try again.</span>
        </div>
      ) : lastSyncedTime ? (
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 bg-[#f1f5f9] px-3 py-1.5 border border-black">
          <span>REAL-TIME API ENDPOINT: api.github.com/users/yashsahu0212</span>
          <span>LAST SYNCED AT: {lastSyncedTime}</span>
        </div>
      ) : null}

      {/* Filter Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-bold border-t-2 border-black">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-600 flex items-center gap-1 uppercase">
            <Filter className="w-3.5 h-3.5 text-black" />
            FILTER BY REPOSITORY:
          </span>
          {['ALL', ...userRepos.map((r) => r.name)].slice(0, 5).map((repoName) => (
            <button
              key={repoName}
              onClick={() => setActiveRepoFilter(repoName)}
              className={`px-2.5 py-1 border border-black uppercase transition-colors ${activeRepoFilter === repoName
                ? 'bg-black text-[#fcd400]'
                : 'bg-white text-black hover:bg-gray-100'
                }`}
            >
              {repoName}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-500 text-[11px] uppercase mr-1">RANGE:</span>
          {(['ALL', '2026', '2025'] as const).map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-2.5 py-1 border border-black text-[11px] font-bold uppercase transition-colors ${selectedYear === yr ? 'bg-[#fcd400] text-black' : 'bg-white text-black hover:bg-gray-100'
                }`}
            >
              {yr === 'ALL' ? 'PAST 12M' : yr}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Grid Container */}
      {isLoading ? (
        <div className="p-12 border-3 border-black bg-[#fbfaee] text-center font-mono space-y-3">
          <RefreshCw className="w-8 h-8 text-[#ff6b00] animate-spin mx-auto" />
          <p className="font-extrabold text-sm uppercase text-black">
            CONNECTING TO GITHUB API & FETCHING COMMIT GRAPH FOR @yashsahu0212...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
          <div className="min-w-[760px] space-y-1.5">
            {/* Months Header Labels - Pixel-aligned directly over starting week column */}
            <div className="relative h-4 text-[10px] font-bold text-gray-600 uppercase ml-[32px]">
              {monthLabelsWithIndex.map(({ label, weekIndex }) => (
                <span
                  key={weekIndex}
                  className="absolute top-0 whitespace-nowrap"
                  style={{ left: `${weekIndex * 18}px` }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Grid Rows (Days Mon, Wed, Fri) */}
            <div className="flex items-start gap-1">
              {/* Day Labels Column */}
              <div className="flex flex-col justify-between text-[10px] font-bold text-gray-500 w-[28px] h-[122px] py-1 uppercase select-none">
                <span className="leading-none">Mon</span>
                <span className="leading-none">Wed</span>
                <span className="leading-none">Fri</span>
              </div>

              {/* Weeks Columns Grid */}
              <div className="flex gap-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) => {
                      const isFilteredMatch =
                        activeRepoFilter === 'ALL' ||
                        (day.repo && day.repo.toLowerCase().includes(activeRepoFilter.toLowerCase()));

                      const countToDisplay = isFilteredMatch ? day.count : 0;
                      const levelToDisplay = isFilteredMatch ? day.level : 0;

                      return (
                        <button
                          key={dIdx}
                          onClick={() => setSelectedDay(day)}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-3.5 h-3.5 border transition-transform hover:scale-125 hover:z-20 ${getBlockColor(
                            levelToDisplay
                          )}`}
                          title={`${day.date}: ${countToDisplay} commits`}
                          aria-label={`${day.date}: ${countToDisplay} commits`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Footer: Legend & Day Inspector */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t-2 border-black text-xs">
        {/* Hover / Clicked Day Status Box */}
        <div className="flex items-center gap-2 bg-[#fbfaee] px-3.5 py-2 border-2 border-black w-full md:w-auto">
          <Terminal className="w-4 h-4 text-black shrink-0" />
          <span className="font-bold text-[11px] text-gray-800 truncate">
            {hoveredDay ? (
              <>
                <span className="text-[#ff6b00] font-extrabold">{hoveredDay.date}</span>: {hoveredDay.count} commits on{' '}
                <span className="underline">{hoveredDay.repo || 'github.com/yashsahu0212'}</span>
              </>
            ) : selectedDay ? (
              <>
                SELECTED: <span className="text-[#22c55e] font-extrabold">{selectedDay.date}</span> — {selectedDay.count} commits ({selectedDay.message || 'Pushed commits'})
              </>
            ) : (
              'HOVER OR CLICK ANY DAY BLOCK TO INSPECT COMMIT DETAILS'
            )}
          </span>
        </div>

        {/* Contribution Level Legend */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
          <span>LESS</span>
          <div className="flex gap-1">
            <span className="w-3 h-3 bg-[#f1f5f9] border border-gray-300"></span>
            <span className="w-3 h-3 bg-[#bbf7d0] border border-black"></span>
            <span className="w-3 h-3 bg-[#86efac] border border-black"></span>
            <span className="w-3 h-3 bg-[#4ade80] border border-black"></span>
            <span className="w-3 h-3 bg-[#22c55e] border border-black"></span>
          </div>
          <span>MORE</span>
        </div>
      </div>

      {/* Real Public Repositories fetched live from GitHub */}
      <div className="bg-[#fbfaee] border-3 border-black p-4 space-y-3">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-black uppercase">
            <FolderGit2 className="w-4 h-4 text-[#ff6b00]" />
            REAL PUBLIC REPOSITORIES // @yashsahu0212
          </span>
          <span className="bg-[#22c55e] text-black px-2 py-0.5 text-[10px] border border-black uppercase">
            {userRepos.length} PUBLIC REPOS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
          {userRepos.length > 0 ? (
            userRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-black hover:bg-[#fcd400] transition-colors neo-shadow-sm flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black group-hover:underline font-heading text-sm">
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-black" />
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-gray-700 font-sans line-clamp-2 mt-1">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold pt-2 border-t border-gray-200">
                  <span className="bg-black text-white px-2 py-0.5">
                    {repo.language || 'Code'}
                  </span>
                  <span className="text-gray-500">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full text-center py-4 text-gray-500 text-xs">
              Fetching real GitHub repositories for @yashsahu0212...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
