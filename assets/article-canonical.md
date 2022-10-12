# Remix (React) with canonical URLs

Remix, a react framework, comes packaged only with the essential basics.
To add canonical URLs to your pages, which are important for search engine optimization (SEO),
only a few lines need to be added as shown below thanks to matchers.

## Why are canonical URLs important?

An important aspect for basic search engine optimization (SEO) is the 
[canonical URL](https://ahrefs.com/seo/glossary/canonical-url) of each page.
Search engines typical only index the canonical URLs of a website.
If the search engines realize that you are publishing the same content at different
pages with differen canonical URLs, they might penalize you for this and lower your ranking.
So, if you want your site to be found through a search engine, make sure that your canonical URLs are correct.

To add a canonical URL, use a canonical tag with the correct link and add it to the header of your site
```
<html>
  <head>
    <link rel="canonical" href="https://www.example.com/my-page" />
    ...
  </head>
  ...
</html>
```

If the pages of your website would be accessible through only one URL, 
most search engine would be clever enough and 
would not require a dedicated canonical URL.

However, it can happen promptly that you end up with several URLs for the same page:
 - Your website is reachable under the plain hostname as well as under the `www` subdomain like
   `example.com` and `www.example.com`
 - Your website is reachable through `http` as well as `https`: `http://example.com` and `https://example.com`
 - Your website uses search/query paramters, either for tracking or for interaction:
   `example.com?lang=en`, `example.com?lang=de`, `example.com?utm_source=linkedin.com` are all the same to a search engine.
 - You might have somewhere a devlopment deployment with almost identical content.


## How to create canonical URLs for Remix

Remix uses a lot of conventions to do the plumbing of your site.
One easy but repetitive way of creating the canconical URLs, is to simply add 
the it straight to your final route files.

Assuming, we want to add a canonical URL to `example.com/my-page`, add the following
to `app/routes/my-page.jsx`:
```
export const links = () => [{
  rel: 'canonical',
  href: 'https://example.com/my-page'
}]
```
However, this is a) repetive and b) error-prone as you would need to update
the URL everytime you move the route or change the host.

A more elegant solution is to use [matches](https://remix.run/docs/en/v1/api/remix#usematches)
and [handles](https://remix.run/docs/en/v1/api/conventions#handle).

The following example builds on our previous project with 
[mobile-friendly menus](/blog/creating-responsive-menu-with-remix-and-tailwind).
The code can be found on [github](https://github.com/bielern/remix-tailwind-mobile-menu.git).
```
git clone https://github.com/bielern/remix-tailwind-mobile-menu.git
```


First, create a function that can build a canonical URL based on the pathname. 
In `components.jsx`, add
```
// Replace the host with your "official" host
const host = "https://example.com"
export const canonicalLink = ({pathname}) => [{
  rel: 'canonical',
  href: `${host}${pathname}`
}]
```

Second, import the `canonicalLink` function in each route and export the `handle` 
with it. E.g. in `about.jsx`:
```
export const handle = {
  canonicalLink
}
```

Third and last, create a `CanonicalLinks` component in `root.jsx` that will add
the canonical URL to the HTML body.
```
function CanonicalLinks() {
  const matches = useMatches()
  return matches
    .filter(m => m?.handle?.canonicalLink)
    .flatMap(m => 
      m.handle.canonicalLink(m)
        .map(data => <link {...data} />)
    )
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <CanonicalLinks />
      </head>
      ...
    </html>
```

Now we can check the source that is sent to the browser and we see that
the canonical URL changes.

PICTURE FOR HOME

PICTURE FOR ABOUT


## Conclusion

So, with a handful of changes, we can create canconical URLs needed for SEO
in any Remix appliation that we have.
To create a sitemap or robots.txt, 
there are [packages available](https://github.com/balavishnuvj/remix-seo).

