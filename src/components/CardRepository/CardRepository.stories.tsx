import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { CardRepository } from '.';
import { defaultRepository } from '../../__mocks__/repository-builder';

export default {
  title: 'Components/CardRepository',
  component: CardRepository,
} as ComponentMeta<typeof CardRepository>;

const Template: ComponentStory<typeof CardRepository> = args => (
  <BrowserRouter>
    <CardRepository {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  repository: defaultRepository,
};
