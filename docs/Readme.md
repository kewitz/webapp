# Ello webapp

## Architecture

The Ello webapp is a [React](https://facebook.github.io/react/docs/hello-world.html) application that uses [Redux](http://redux.js.org/) for [unidirectional data flow](http://redux.js.org/docs/basics/DataFlow.html) and [`react-router`](https://github.com/ReactTraining/react-router/tree/v3/docs) for client side routing.

### React

We have mostly adhered to a pattern of `Container` > `Renderables` > `Parts`.

An example for us us is users: [`UserContainer`](https://github.com/ello/webapp/blob/master/src/containers/UserContainer.js) > [`UserRenderables`](https://github.com/ello/webapp/blob/master/src/components/users/UserRenderables.js) > [`UserParts`](https://github.com/ello/webapp/blob/master/src/components/users/UserParts.js)

#### Container

The `Container` is a [`Component`](https://facebook.github.io/react/docs/react-api.html#react.component) connected to the redux store using [`react-redux`](https://github.com/reactjs/react-redux)'s `connect` method. This gives us the ability to define a `mapStateToProps` function that utilizes selectors from [`reselect`](https://github.com/reactjs/reselect) to grab [immutable objects](https://facebook.github.io/immutable-js/docs/#/) from the redux store to map back on to the react component.

Using immutable objects is important here since it allows us to prevent react from calling `render` too often by hooking into the `shouldComponentUpdate` [lifecycle method](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate).

#### Renderables

These are mostly high level like how a user is rendered in different cases such as compact, invitee, cards, and even the user detail page. (see [UserRenderables](https://github.com/ello/webapp/blob/master/src/components/users/UserRenderables.js))

We use [functional components](https://facebook.github.io/react/docs/components-and-props.html) as much as possible since they are stateless and will just render if the container allows it to. In cases where we need a bit more control over the props or lifecycle methods we would use a [`PureComponent`](https://facebook.github.io/react/docs/react-api.html#react.purecomponent).

#### Parts

These would be pieces that are reused in more than one `Renderable` such as username, links, location, etc. (see [`UserParts`](https://github.com/ello/webapp/blob/master/src/components/users/UserParts.js))

#### StreamContainer

The [`StreamContainer`](https://github.com/ello/webapp/blob/master/src/containers/StreamContainer.js) is one of the key `Containers` in the webapp. This container is able to take a redux [action](http://redux.js.org/docs/basics/Actions.html) that defines where the data should be fetched and how it should be rendered for list, grid, error or zero states like in [`loadUserDrawer`](https://github.com/ello/webapp/blob/master/src/actions/user.js#L89).

### Reducers

#### json

This is where all of the data from api requests gets stored. Here is the basic format:

```
{
  assets: {
    1: { id: 1, hdpi: ..., ... },
    2: { id: 2, hdpi: ..., ... }    
  },
  pages: {
    "/discover/recent": {
      ids: ["3", "2", "1"],
      pagination: {
        next: "https://ello.co/api/v2/discover/posts/recent?before=something&per_page=25",
        totalCount: NaN,
        totalPages: NaN,
        totalPagesRemaining: 0
      },
      type: "posts"
    },
  },
  posts: {
    1: { id: 1, token: "my-post-token-1", ... },
    2: { id: 2, token: "my-post-token-2", ... }    
  },
  profile: { ...currentUser },
  users: {
    1: { id: 1, username: "one", ... },
    2: { id: 2, username: "two", ... }    
  }
}
```

The keys within the `json` reducer are [`mappingTypes`](https://github.com/ello/webapp/blob/master/src/constants/mapping_types.js) which match with the top level node of an api response so that they can be parsed dynamically. The only exception to this is the `pages` key which stores the results of a page with information on how to get to the next page of content. 

##### pages

Pages are typically tied directly to the pathname of the page ie: `/discover/recent`. But you can configure an action to have a `resultKey` which would override this default behavior for cases where more than one `StreamContainer` are on a page. Post detail pages are a good example of this since they have comments/lovers/reposters. If you store each of those with their own `resultKey` you will be able to switch between them without the need to refetch the data each time. The `type` property of a page is the collection that the `ids` will be pulled from and the `pagination` object contains how to get to the next page and page counts.


## Helpful links:

- [React Docs](https://facebook.github.io/react/docs/hello-world.html)
- [React Component Lifecycle](https://facebook.github.io/react/docs/react-component.html)
- [Redux](http://redux.js.org/)
- [React Router v3](https://github.com/ReactTraining/react-router/tree/v3/docs) *good candidate to update to v4
- [`react-redux`](https://github.com/reactjs/react-redux)
- [`reselect`](https://github.com/reactjs/reselect)
- [Immutable Docs](https://facebook.github.io/immutable-js/docs/#/)

# Other

## Emoji autocompleter in dev
To get the emojis.json file run:
`curl -o public/static/emojis.json https://ello.co/emojis.json`
To turn it on add this to your `.env`:
`USE_LOCAL_EMOJI=true`

:metal::skull::metal:



