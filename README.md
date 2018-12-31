# Product Manager Client

This server renders the accessed views and hands them to the end user. It consumes the [product manager api](https://github.com/mouchabeurre/product-manager-server).

## SSR

The rendering capabilities of the client application rely on [nextjs](https://github.com/zeit/next.js), a [react](https://reactjs.org/) framework for **server side rendering**.

**Nextjs** initial setup is _non-existent_: the framework lets us create our views under the _pages_ directory, which are then compiled and directly served when accessing the url named after our view filename. It's a _file-system routing_.

These views are compiled from **react** _components_ into fully rendered static web pages.
A page also ships with its corresponding **react application**, making our application an **SPA** after the first access.

Pages with **query parameters** must be routed manually as they are by definition non-static and can't live under a file path. To do so, we wrap the _nextjs_ server with a simple _express_ [server](https://github.com/mouchabeurre/product-manager-client/blob/master/server.js) which will listen for the query exclusive routes and accordingly initiate the render.

## Structure

The _pages_ directory holds the application views:

- _index_: page rendered on the **root** access of our app. Lists the API _products_.
- _product_: rendered on `/product/:id` access. Overview of a _product_.
- _edit_: rendered on `/product/:id/edit` access. Allows for _product_ edition.
- _add_: rendered on `/product/:id/add` access. _product_ creation form.

Each page may `import` a component relevant for the view from the _components_ directory.
Same goes with the layouts, which are the top most components in the rendering chain.
