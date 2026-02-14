import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SciencePage } from './pages/SciencePage';
import { ExplorePage } from './pages/ExplorePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'features',
        Component: FeaturesPage,
      },
      {
        path: 'science',
        Component: SciencePage,
      },
      {
        path: 'explore',
        Component: ExplorePage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
