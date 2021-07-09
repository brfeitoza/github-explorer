import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Logo } from '.';

export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = () => (
  <BrowserRouter>
    <Logo />
  </BrowserRouter>
);

export const Default = Template.bind({});
