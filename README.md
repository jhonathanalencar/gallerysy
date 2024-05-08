<h1 align="center">Gallerysy</h1>

[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project">Project</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#license">License</a>
    </li>
  </ol>
</details>

## Project

An application for upload images.

Work in progress...

### Todo

- [x] deploy (vercel)
- [x] Scaffold basic ui with mock data
- [x] Tidy up build process
- [x] Set up a database (vercel postgres)
- [x] Attach database to UI
- [x] Add authentication (w/ clerk)
- [ ] Add image upload
- [x] "taint" (server-only)
- [x] Use Next/Image component
- [ ] Error management (w/ Sentry)
- [ ] Routing/image page (parallel route)
- [ ] ShadUI (toasts)
- [ ] Update upload button to be less cringe
- [ ] Analytics (posthog)
- [ ] Delete button (w/ Server Actions)
- [ ] Rate limiting (upstash)
- [ ] Fix the page layout for images of different resolutions
- [ ] Selecting images on the gallery page (state management)
- [ ] Infinite scroll
- [ ] Folders/albums

## Built With

This project was built with the following technologies:

- [![Next][next.js]][next-url]
- [![TypeScript][typescript]][typescript-url]
- [![Tailwind CSS][tailwindcss]][tailwindcss-url]

## Getting Started

```sh
# Clone the repository
$ git clone https://github.com/jhonathanalencar/gallerysy.git

# Navigate to the project directory
$ cd gallerysy

# Install the dependencies
$ npm install

# Configure the environment variables:
# Rename the .env.example file in this directory to .env (which will be ignored by git)
# and add your own values for all the environment variables.
$ cp .env.example .env

# Run the project in development mode
$ npm run dev

# The application should be running on port 3000
```

Open <http://localhost:3000> to see the result.

## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more information.

---

<p align="center">
  <img src="https://user-images.githubusercontent.com/87830705/254344973-58fb1280-be15-4847-95bd-c99236abdb4b.png" alt="Jhonathan" width="48px" />
</p>

[issues-shield]: https://img.shields.io/github/issues/jhonathanalencar/gallerysy.svg?style=for-the-badge
[issues-url]: https://github.com/jhonathanalencar/gallerysy/issues
[license-shield]: https://img.shields.io/github/license/jhonathanalencar/gallerysy.svg?style=for-the-badge&labelColor=4b2428&color=ac7c59
[license-url]: https://github.com/jhonathanalencar/gallerysy/blob/main/LICENSE
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
