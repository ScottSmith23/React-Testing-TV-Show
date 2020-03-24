import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

// mock the async function!
jest.mock("./api/fetchShow");

const episodesData = {
  data: 
      {
    id: 2993,
    url: 'http://www.tvmaze.com/shows/2993/stranger-things',
    name: 'Stranger Things',
    type: 'Scripted',
    language: 'English',
    genres: [
      'Drama',
      'Fantasy',
      'Science-Fiction'
    ],
    status: 'Running',
    runtime: 60,
    premiered: '2016-07-15',
    officialSite: 'https://www.netflix.com/title/80057281',
    schedule: {
      time: '',
      days: [
        'Thursday'
      ]
    },
    rating: {
      average: 8.7
    },
    weight: 98,
    network: null,
    webChannel: {
      id: 1,
      name: 'Netflix',
      country: null
    },
    externals: {
      tvrage: 48493,
      thetvdb: 305288,
      imdb: 'tt4574334'
    },
    image: {
      medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg',
      original: 'http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg'
    },
    summary: '<p>A love letter to the \'80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>',
    updated: 1582785474,
    _links: {
      self: {
        href: 'http://api.tvmaze.com/shows/2993'
      },
      previousepisode: {
        href: 'http://api.tvmaze.com/episodes/1576476'
      }
    },
    _embedded: {
      episodes: [
        {
          id: 553946,
          url: 'http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers',
          name: 'Chapter One: The Vanishing of Will Byers',
          season: 1,
          number: 1,
          airdate: '2016-07-15',
          airtime: '',
          airstamp: '2016-07-15T12:00:00+00:00',
          runtime: 60,
          image: {
            medium: 'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg',
            original: 'http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg'
          },
          summary: '<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy\'s friends conduct their own search, and meet a mysterious girl in the forest.</p>',
          _links: {
            self: {
              href: 'http://api.tvmaze.com/episodes/553946'
            }
          }
        },
        {
          id: 909340,
          url: 'http://www.tvmaze.com/episodes/909340/stranger-things-2x01-chapter-one-madmax',
          name: 'Chapter One: MADMAX',
          season: 2,
          number: 1,
          airdate: '2017-10-27',
          airtime: '',
          airstamp: '2017-10-27T12:00:00+00:00',
          runtime: 60,
          image: {
            medium: 'http://static.tvmaze.com/uploads/images/medium_landscape/132/331976.jpg',
            original: 'http://static.tvmaze.com/uploads/images/original_untouched/132/331976.jpg'
          },
          summary: '<p>One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there\'s a new player in town, and Jim pays a visit to El.</p>',
          _links: {
            self: {
              href: 'http://api.tvmaze.com/episodes/909340'
            }
          }
        },
        {
          id: 1576469,
          url: 'http://www.tvmaze.com/episodes/1576469/stranger-things-3x01-chapter-one-suzie-do-you-copy',
          name: 'Chapter One: Suzie, Do You Copy?',
          season: 3,
          number: 1,
          airdate: '2019-07-04',
          airtime: '',
          airstamp: '2019-07-04T12:00:00+00:00',
          runtime: 51,
          image: {
            medium: 'http://static.tvmaze.com/uploads/images/medium_landscape/204/510098.jpg',
            original: 'http://static.tvmaze.com/uploads/images/original_untouched/204/510098.jpg'
          },
          summary: '<p>Things change over the summer: Jonathan, Nancy, Steve, and Billy get jobs; Dustin goes to science camp; El and Mike become an item; Lucas and Max almost become an item. Meanwhile, mysterious power outages plague Hawkins and rats start exploding.</p>',
          _links: {
            self: {
              href: 'http://api.tvmaze.com/episodes/1576469'
            }
          }
        },
        {
          id: 1752754,
          url: 'http://www.tvmaze.com/episodes/1752754/stranger-things-4x01-chapter-one-the-hellfire-club',
          name: 'Chapter One: The Hellfire Club',
          season: 4,
          number: 1,
          airdate: '',
          airtime: '',
          airstamp: null,
          runtime: 60,
          image: null,
          summary: null,
          _links: {
            self: {
              href: 'http://api.tvmaze.com/episodes/1752754'
            }
          }
        }
      ]
    }
  }
}

// javascript feature called async/await
test("clicking on the button fetches data and renders it to the DOM", async () => {
  // mock the resolved data
  mockFetchShow.mockResolvedValueOnce(episodesData);
  // render the component
  const { getByText, getAllByText, queryAllByTestId } = render(<App />);

  // await for the data to be fetched
  await waitFor(() => {
    getByText(/select a season/i);
  });
  userEvent.click(getByText(/select a season/i));
  expect(getAllByText(/season /i)).toHaveLength(4);
  expect(mockFetchShow).toHaveBeenCalledTimes(1);
});
