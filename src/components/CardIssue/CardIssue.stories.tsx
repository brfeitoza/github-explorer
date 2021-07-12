import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { CardIssue } from '.';
import { defaultIssueList } from '../../__mocks__/issue-list-builder';

export default {
  title: 'Components/CardIssue',
  component: CardIssue,
} as ComponentMeta<typeof CardIssue>;

const Template: ComponentStory<typeof CardIssue> = args => (
  <BrowserRouter>
    <CardIssue {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  issue: defaultIssueList[0],
};
