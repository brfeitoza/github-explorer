import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '.';

export default {
  title: 'Components/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const WithoutGoBackButton = Template.bind({});

export const WithGoBackButton = Template.bind({});
WithGoBackButton.args = {
  showGoBackButton: true,
};
