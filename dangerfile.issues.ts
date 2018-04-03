import { schedule, danger, fail } from 'danger';
import labels from 'danger-plugin-labels';

schedule(
  labels({
    labels: {
      'bug report': 'Bug',
      'feature idea': 'Feature',
      'technical discussion': 'TBD: Tech Debt',
    },
  })
);

const CHECKBOXES = /^[\t ]*-[\t ]*\[x\][\t ]*(.+?)$/gim
schedule(async () => {
  const { body, number, state } = danger.github.issue;
  const { name: repo, owner: { login: owner } } = danger.github.repository;
  const checkedBoxes = body.match(CHECKBOXES);

  const newState = checkedBoxes ? 'open' : 'closed';

  if (state === 'open' && newState !== state) {
    await danger.github.api.issues.edit({
      owner,
      repo,
      number,
      state: newState
    })
    if (newState === 'closed') fail('This issue does not follow the issue template, so it will be closed automatically. Please open a new one!')
  }
})
