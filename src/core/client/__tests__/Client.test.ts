import { EventEmitter } from 'events';
import { StoryWithOptions } from '../../../models/story';
import { Channel, Group } from '../../../models/storybook';
import { EventTypes, PhaseTypes } from '../../constants';
import { Client } from '../Client';
import { Env } from '../Env';
/* tslint:disable */

describe('Client', () => {
  describe('prepare', () => {
    it('works', async () => {
      // tslint:disable:prefer-type-cast
      const gatewayMock = {
        setStories: jest.fn()
      };
      const channelMock = new EventEmitter() as Channel;
      const apiMock = {
        selectStory(kind: string, story: string) {
          channelMock.emit(EventTypes.COMPONENT_INIT, { story, kind });
          channelMock.emit(EventTypes.COMPONENT_MOUNT, { story, kind });
        }
      };
      const client = new Client(
        new Env('react', `?chrome-screenshot=${PhaseTypes.PREPARE}`),
        gatewayMock as any,
        channelMock,
        apiMock
      );

      const wrapped1: StoryWithOptions = {
        kind: 'kind of story a',
        story: 'story 1'
      } as StoryWithOptions;
      const wrapped: StoryWithOptions[] = [wrapped1];
      const searchScreenshotWrappersByStory = jest.fn().mockResolvedValue(wrapped);

      (client as any).searchScreenshotWrappersByStory = searchScreenshotWrappersByStory;

      const promise = (client as any).searchTargetStories(0, 1);

      const stories: Group[] = [{ kind: 'kind of story a', stories: ['story 1'] }];
      channelMock.emit('setStories', { stories });

      const actual = await promise;

      const expectedResult: StoryWithOptions[] = [wrapped1];
      expect(actual).toStrictEqual(expectedResult);
      expect(searchScreenshotWrappersByStory.mock.calls.length).toBe(1);
      // expect(searchScreenshotWrappersByStory.mock.calls[0]).toBe([]);
    });
  });
});
