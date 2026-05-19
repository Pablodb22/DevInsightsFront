export interface RepoCard {
  name:        string;
  fullName:    string;
  description: string;
  language:    string;
  langColor:   string;
  stars:       number;
  forks:       number;
  lastCommit:  string;
  url:         string;
}

export interface MetricCard {
  label:  string;
  value:  string | number;
  icon:   string;
  suffix?: string;
}

export interface BarData {
  label: string;
  value: number;
  max:   number;
}
