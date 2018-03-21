import { schedule } from 'danger';
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
