import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

interface GitHubStatsProps {
  user: {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  repos: {
    name: string;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
  }[];
  githubGraphData: {
    dates: string[];
    commitsPerDay: number[];
  };
}

const CACHE_KEY = 'github_data';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

const GitHubStats: React.FC = () => {
  const [data, setData] = useState<GitHubStatsProps | null>(null);
  const [visibleRepos, setVisibleRepos] = useState<number>(10);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setData(data);
            return;
          }
        }

        const userResponse = await axios.get('https://api.github.com/users/vem882');
        const reposResponse = await axios.get('https://api.github.com/users/vem882/repos');
        const eventsResponse = await axios.get('https://api.github.com/users/vem882/events/public');

        const user = userResponse.data;
        let repos = reposResponse.data;
        repos.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        const events = eventsResponse.data;
        const githubGraphData = processGitHubEventsForGraph(events);

        const newData = { user, repos, githubGraphData };
        setData(newData);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: newData, timestamp: Date.now() }));
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchData();
  }, []);

  const processGitHubEventsForGraph = (events: any[]) => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    const commitsPerDay = dates.map(date => {
      const commits = events.filter(event => {
        return (
          event.type === 'PushEvent' &&
          event.created_at.startsWith(date)
        );
      }).reduce((total, event) => {
        return total + event.payload.commits.length;
      }, 0);
      return commits;
    });

    return { dates, commitsPerDay };
  };

  const loadMoreRepos = useCallback(() => {
    setVisibleRepos((prev) => prev + 10);
  }, []);

const lastRepoElementRef = useCallback((node: HTMLLIElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            loadMoreRepos();
        }
    });
    if (node) observer.current.observe(node);
}, [loadMoreRepos]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="github-stats">
      <div className="user-info">
        <img src={data.user.avatar_url} alt="Avatar" className="avatar-img" />
        <h2>{data.user.login}</h2>
        <ul>
          <li><p>Repositories: {data.user.public_repos}</p></li>
          <li><p>Followers: {data.user.followers}</p></li>
          <li><p>Following: {data.user.following}</p></li>
        </ul>
      </div>
      <div className="repos">
        <h3>Recent Repositories</h3>
        <ul>
          {data.repos.slice(0, visibleRepos).map((repo, index) => {
            if (index === visibleRepos - 1) {
              return (
                <li key={repo.name} ref={lastRepoElementRef}>
                  <a href={repo.html_url}>{repo.name}</a>
                  <span>⭐ {repo.stargazers_count}</span>
                </li>
              );
            } else {
              return (
                <li key={repo.name}>
                  <a href={repo.html_url}>{repo.name}</a>
                  <span>⭐ {repo.stargazers_count}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="activity">
        <h3>GitHub Activity</h3>
        <canvas id="githubActivityChart"></canvas>
      </div>
    </div>
  );
};

export default GitHubStats;