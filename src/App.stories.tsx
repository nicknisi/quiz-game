import { Meta, StoryObj } from '@storybook/react';
import App from './App';
import { GameProvider } from './GameProvider';

export default {
  title: 'Game Board',
  args: {},
  component: App,
  decorators: [
    (Story) => (
      <GameProvider url="/assets/c2fo.json">
        <Story />
      </GameProvider>
    ),
  ],
  parameters: {
    xstate: true,
    xstateInspectOptions: {
      url: 'https://stately.ai/viz?inspect',
      serialize: null,
    },
  },
} as Meta;

export const Default: StoryObj<typeof App> = {
  args: {},
};
