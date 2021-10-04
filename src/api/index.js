const mixPostBody = (data, method = 'post') => ({
  method,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json;charset=utf8' },
});

const prepareParams = (dataObj) =>
  Object.entries(dataObj).reduce((total, [key, value]) => (total += `&${key}=${value}`), '');

class MovieService {
  apiKey = '92833f8c8276d48797d54caa06e86881';

  paths = {
    root: 'https://api.themoviedb.org/3',
    createSession: '/authentication/guest_session/new',
    getGenres: '/genre/movie/list',
    search: '/search/movie',
    rate: '/movie/{movie_id}/rating',
    getPopular: '/movie/popular',
  };

  fromRoot(path, params = {}) {
    return `${this.paths.root}${path}?api_key=${this.apiKey}${prepareParams(params)}`;
  }

  async createSession() {
    const url = this.fromRoot(this.paths.createSession);
    const { guest_session_id: guestSessionId, expires_at: expiresAt } = await fetch(url).then((sessionData) =>
      sessionData.json()
    );

    return {
      guestSessionId,
      expiresAt,
    };
  }

  async getGenres() {
    const url = this.fromRoot(this.paths.getGenres);
    const { genres } = await fetch(url).then((data) => data.json());

    return genres;
  }

  async getRated(guestSessionId) {
    const url = this.fromRoot(`/guest_session/${guestSessionId}/rated/movies`);
    return fetch(url).then((data) => data.json());
  }

  async search(query, page = 1) {
    const url = this.fromRoot(this.paths.search, {
      query,
      page,
    });

    return fetch(url).then((data) => data.json());
  }

  async rate(guestSessionId, movieId, rateValue) {
    const url = this.fromRoot(`/movie/${movieId}/rating`, {
      guest_session_id: guestSessionId,
    });

    return fetch(url, mixPostBody({ value: rateValue })).then((response) => response.json());
  }

  async getPopular(page = 1) {
    const url = this.fromRoot(this.paths.getPopular, { page });
    const data = await fetch(url).then((response) => response.json());
    return data;
  }
}

const service = new MovieService();
export default service;
