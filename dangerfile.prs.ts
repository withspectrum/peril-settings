import { schedule } from 'danger';
import labels from 'danger-plugin-labels';

// Add automatic labels to the PR
schedule(
  labels({
    labels: {
      wip: 'WIP: Building',
      'needs testing': 'WIP: Needs Testing',
      'ready for review': 'Ready for Review',
    },
  })
);
