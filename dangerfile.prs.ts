import { schedule, danger } from 'danger';
import labels from 'danger-plugin-labels';
// import flow from 'danger-plugin-flow';

// Add automatic labels to the PR
schedule(
  labels({
    rules: [{
      match: /WIP/i,
      label: 'WIP: Building'
    }, {
      match: /needs testing/i,
      label: 'WIP: Needs Testing'
    },
    'Ready for Review']
  })
);

// Make sure all new files are flowtyped
schedule(
  flow({
    // Fail on newly created untyped files
    created: 'fail',
    // Warn on modified untyped files
    modified: 'warn',
    blacklist: [
      'flow-typed/**/*.js',
      'public/**/*.js',
      'api/migrations/**/*.js',
      'cypress/**/*.js'
    ]
  })
);
