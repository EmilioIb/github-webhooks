import { GithubIssuePayload, GithubStarPayload } from '../../interfaces';

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    const { action, sender, repository } = payload;
    return `${sender.login} ${action} star on ${repository.full_name}`;
  }

  onIssue(payload: GithubIssuePayload): string {
    const { action, issue } = payload;

    if (action === 'opened') return `An issue was opened with this title ${issue.title} by ${issue.user.login}`;
    if (action === 'closed') return `The issue ${issue.title} was close by ${issue.user.login}`;
    if (action === 'reopened') return `The issue ${issue.title} was reopened by ${issue.user.login}`;

    return `Unhandlec action for the issue event ${action}`;
  }
}
