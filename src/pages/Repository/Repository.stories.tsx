import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Repository } from '.';

export default {
  title: 'Pages/Repository',
  component: Repository,
} as ComponentMeta<typeof Repository>;

const Template: ComponentStory<typeof Repository> = () => (
  <BrowserRouter>
    <Repository />
  </BrowserRouter>
);

export const Default = Template.bind({});
