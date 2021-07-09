import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Dashboard } from '.';

export default {
  title: 'Pages/Dashboard',
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
);

export const Default = Template.bind({});
