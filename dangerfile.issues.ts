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
  const { body, number } = danger.github.issue;
  const { name: repo, owner: { login: owner } } = danger.github.repository;
  const checkedBoxes = body.match(CHECKBOXES);

  await danger.github.api.issues.edit({
    owner,
    repo,
    number,
    state: !checkedBoxes ? 'closed' : 'open'
  })
  fail('This issue does not follow the issue template, please edit it before reopening it.')
})
