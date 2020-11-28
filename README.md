# Next page tester
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build status][ci-badge]][ci]
[![Test coverage report][coveralls-badge]][coveralls]
[![Npm version][npm-badge]][npm]

The missing DOM integration testing tool for [Next.js][next-github].

Given a Next.js route, this library will return an instance of the matching page component instantiated with the **properties** derived by Next.js' [**routing system**][next-docs-routing] and [**server side data fetching**][next-docs-data-fetching].

```js
import { render, screen, fireEvent } from '@testing-library/react';
import { getPage } from 'next-page-tester';

describe('Blog page', () => {
  it('renders blog page', async () => {
    const { page } = await getPage({
      route: '/blog/1',
    });

    render(page);
    expect(screen.getByText('Blog')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Link'));
    await screen.findByText('Linked page');
  });
});
```

## What

The idea behind this library is to enable DOM integration tests on Next.js pages along with [server side data fetching][next-docs-data-fetching] and [routing][next-docs-routing].

The testing approach suggested here consists of manually mocking external API's dependencies and get the component instance matching a given route.

Next page tester will take care of:

- **resolving** provided **routes** into matching page component
- calling **Next.js data fetching methods** (`getServerSideProps`, `getInitialProps` or `getStaticProps`) if the case
- set up a **mocked `next/router` provider** initialized with the expected values (to test `useRouter` and `withRouter`)
- wrapping page with custom `_app` component
- **instantiating** page component with **expected page props**
- Emulate client side navigation via `Link`, `router.push`, `router.replace`

## Options

| Property              | Description                                                                      | type               | Default         |
| --------------------- | -------------------------------------------------------------------------------- | ------------------ | --------------- |
| **route** (mandatory) | Next route (must start with `/`)                                                 | `string`           | -               |
| **req**               | Access default mocked [request object][req-docs]<br>(`getServerSideProps` only)  | `res => res`       | -               |
| **res**               | Access default mocked [response object][res-docs]<br>(`getServerSideProps` only) | `req => req`       | -               |
| **router**            | Access default mocked [Next router object][next-docs-router]                     | `router => router` | -               |
| **useCustomApp**      | Use [custom App component][next-docs-custom-app]                                 | `boolean`          | `true`          |
| **nextRoot**          | Absolute path to Next's root folder                                              | `string`           | _auto detected_ |

## Notes

- Data fetching methods' context `req` and `res` objects are mocked with [node-mocks-http][node-mocks-http]
- Next page tester can be used with any testing framework/library (not tied to Testing library)
- It might be necessary to install `@types/react-dom` and `@types/webpack` when using Typescript in `strict` mode due to [this bug][next-gh-strict-bug]

### Error: Not implemented: window.scrollTo

Next.js `Link` components invoke `window.scrollTo` on click which is not implemented in JSDOM environment. In order to fix the error you should provide [your own `window.scrollTo` mock](https://qiita.com/akameco/items/0edfdae02507204b24c8).

### Next.js versions support

`next-page-tester` focuses on supporting only the last major version of Next.js:

| next-page-tester | next.js |
| ---------------- | ------- |
| v0.1.0 - v0.7.0  | v9.X.X  |
| v0.8.0 +         | v10.X.X |

## Todo's

- Consider adding custom Document support
- Consider reusing Next.js code parts (not only types)
- Consider supporting Next.js `trailingSlash` option

[ci]: https://travis-ci.com/toomuchdesign/next-page-tester
[ci-badge]: https://travis-ci.com/toomuchdesign/next-page-tester.svg?branch=master
[npm]: https://www.npmjs.com/package/next-page-tester
[npm-badge]: https://img.shields.io/npm/v/next-page-tester.svg
[coveralls-badge]: https://coveralls.io/repos/github/toomuchdesign/next-page-tester/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/toomuchdesign/next-page-tester?branch=master
[next-github]: https://nextjs.org/
[req-docs]: https://nodejs.org/api/http.html#http_class_http_clientrequest
[res-docs]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[node-mocks-http]: https://www.npmjs.com/package/node-mocks-http
[next-docs-routing]: https://nextjs.org/docs/routing/introduction
[next-docs-data-fetching]: https://nextjs.org/docs/basic-features/data-fetching
[next-docs-router]: https://nextjs.org/docs/api-reference/next/router
[next-docs-custom-app]: https://nextjs.org/docs/advanced-features/custom-app
[next-gh-strict-bug]: https://github.com/vercel/next.js/issues/16219

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.andreacarraro.it"><img src="https://avatars3.githubusercontent.com/u/4573549?v=4" width="100px;" alt=""/><br /><sub><b>Andrea Carraro</b></sub></a><br /><a href="https://github.com/toomuchdesign/next-page-tester/commits?author=toomuchdesign" title="Code">💻</a> <a href="#infra-toomuchdesign" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/toomuchdesign/next-page-tester/commits?author=toomuchdesign" title="Tests">⚠️</a> <a href="#maintenance-toomuchdesign" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://www.matej.snuderl.si/"><img src="https://avatars3.githubusercontent.com/u/8524109?v=4" width="100px;" alt=""/><br /><sub><b>Matej Šnuderl</b></sub></a><br /><a href="https://github.com/toomuchdesign/next-page-tester/commits?author=Meemaw" title="Code">💻</a> <a href="#infra-Meemaw" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/toomuchdesign/next-page-tester/commits?author=Meemaw" title="Tests">⚠️</a> <a href="https://github.com/toomuchdesign/next-page-tester/pulls?q=is%3Apr+reviewed-by%3AMeemaw" title="Reviewed Pull Requests">👀</a> <a href="#ideas-Meemaw" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!