import { _routes } from '../constants/route.js';

export const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(`/api/v1${url}`, router);
  });
};
