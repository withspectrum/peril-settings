import { schedule, danger, fail } from 'danger';
import labels from 'danger-plugin-labels';

schedule(
  labels({
    rules: [{
      match: /bug\sreport/i,
      label: 'Bug'
    }, {
      match: /feature(\sidea)?/i,
      label: 'Feature'
    }, {
      match: /technical\sdiscussion/i,
      label: 'TBD: Tech Debt'
    }, {
      match: /^question/i,
      label: 'Question'
    }],
    validate: async (labels) => {
      if (labels.includes('Question')) {
        fail('Please direct questions to https://spectrum.chat/spectrum/open, thank you!');
        return false;
      }
      if (labels.length !== 1) {
        fail('Please check one label in the issue template.');
        return false;
      }

      return true;
    }
  })
);
