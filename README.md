# frontend-check
Testing frontend capabilities

## Docker image
Clone the repository to your local machine, using your favorite Git client or the command line:
```bash
git clone https://github.com/woodyrew/frontend-check
cd frontend-check
```

- Download and install Docker (https://www.docker.com/community-edition)
- run script `./docker_run.sh` &mdash; it will build the image and run the application
- Open your browser to http://localhost:3000
- For debugging nuxeo specific modules and error messages you may pass `debug` as a parameter
```bash
./docker_run.sh debug
```

**Or**

## Requirements
- [git](https://git-scm.com/) &mdash; make sure your Privacy & Security settings allow to download applications from anywhere
- [Node.js](https://github.com/creationix/nvm#install-script) &mdash; Stable: See [Release schedule](https://github.com/nodejs/LTS#lts_schedule)(version >= v6.9)
    - `nvm install lts/boron` will get the latest v6 (LTS Boron) version
    - Test with `node --version`
    - _Remember:_ Run `nvm use` at the start of your session.
- [libsass](http://sass-lang.com/libsass) &mdash; Might not be necessary.
- A decent code editor (https://atom.io/ or https://www.sublimetext.com/ for example) with ideally the following:
  - [EditorConfig plugin](http://editorconfig.org/#download).
  - [ESLint](https://atom.io/packages/linter-eslint)
  - [Sass-Lint](https://atom.io/packages/linter-sass-lint)

**To install on mac:**
- install homebrew (http://brew.sh/)
- run ```brew update```
- use brew to install (or use upgrade if you have already some installed):
```bash
brew install git nodejs libsass
```

## Installation
Clone the repository to your local machine, using your favorite Git client or the command line:
```bash
git clone https://github.com/woodyrew/frontend-check
cd frontend-check
```

## Run Locally
```bash
npm run dev
```

This should open Firefox at http://localhost:3000

If not just browse to that location with your favourite browser.

### Change browser
The broswer defaults to `firefox` but can be changed with the following command and then locally as usual.
```bash
npm config set Nuxeo-website:browser chromium-browser
```

### Debugging
Metalsmith and most of its plugins use [debug](https://github.com/visionmedia/debug). By default it displays any errors that have occurred during the build but you can debug a specific plugin if required.

The following displays debug messages from nuxeo specific modules and error messages (see `modules/handlebars/truncates.js` for logging example).
```bash
DEBUG=nuxeo\-*,*:error npm run dev
```

You can also run `npm run debug`.

## Project Structure
### `assets`
Any files in this directory will be copied to `site/assets` and can be referenced in html and templates. e.g. An image called `your_img.png` could be referenced by the following:
```html
<img src="/assets/your_img.png" alt="">
```

### `client`
Client side styles (SCSS).

### `layout`
Templates and partials.

### `modules`
Nuxeo specific modules. e.g. Handlebars helpers.

### `site`
Generated output of the site. This is what will be served in production.

### `src`
Source Markdown and HTML files for content.

#### Mandatory frontmatter
All `.md` (Markdown) content files should have a YAML frontmatter defined at the top of the file. e.g.

```md
---
layout: default.hbs
title: Title of the page
featured_image: Featured image of the page (defaults to Nuxeo logo)
description: A description for search engines and social media to consume.

---

Content of page goes here.
```

#### Optional frontmatter
##### `style`
Define a page specific style sheet. Defined in `client/scss/`. e.g. To use `client/scss/home.scss`, the front-matter would be:
```md
---
...
style: home
...
---
Page content here.
```

### `build.js`
The main build script for generating the output for `site`.

### `config.yml`
Site configurations, ability to have production or development specific values.

### `package.json`
Build processes are defined here. Should be relatively self explanatory but anything special will be explained here.


# Trouble shooting
## Invalid front-matter
Error: `Error: Invalid frontmatter in file: {filepath}`

### Solution
Run YAML linter to locate the issue with:

`npm run yaml_lint {filepath}`
