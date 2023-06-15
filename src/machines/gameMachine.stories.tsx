import { RenderMachine } from 'storybook-xstate-addon/RenderMachine';
import { gameMachine } from './gameMachine';

export default {
  title: 'Game Machine',
  // parameters: {
  //   xstate: true,
  //   xstateInspectOptions: {
  //     url: 'https://stately.ai/viz?inspect',
  //     serialize: null,
  //   },
  // },
};

export const Default = () => (
  <RenderMachine
    machine={gameMachine.withContext({
      ...gameMachine.context,
      url: '/assets/c2fo.json',
    })}
  />
);
