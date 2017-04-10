// @flow
import React from 'react'
import Helmet from 'react-helmet'

type DefaultTagProps = {
  description: string,
  image: string,
  nextPage?: string | null,
  pathname: string,
  robots?: string | null,
  title: string,
  url: string,
}

export const DefaultTags = (props: DefaultTagProps) =>
  <Helmet>
    <title>{props.title}</title>,
    <meta name="apple-itunes-app" content="app-id=953614327" appArgument={props.pathname} />,
    <meta name="name" itemProp="name" content={props.title} />,
    <meta name="url" itemProp="url" content={props.url} />,
    <meta name="description" itemProp="description" content={props.description} />,
    <meta name="image" itemProp="image" content={props.image} />,
    <meta property="og:url" content={props.url} />,
    <meta property="og:title" content={props.title} />,
    <meta property="og:description" content={props.description} />,
    <meta property="og:image" content={props.image} />,
    <meta name="twitter:card" content="summary_large_image" />,
    {props.robots && <meta name="robots" content={props.robots} />}
    {props.nextPage && <link href={props.nextPage} rel="next" />}
  </Helmet>

DefaultTags.defaultProps = {
  nextPage: null,
  robots: null,
}

// -------------------------------------

type ImageTagProps = {
  openGraphImages: Array<Object>,
  schemaImages: Array<Object>,
}

type EmbedTagProps = {
  openGraphEmbeds: Array<Object>,
}

type PostDetailProps = {
  canonicalUrl?: string | null,
  card: string,
  description: string,
  embeds: EmbedTagProps,
  images: ImageTagProps,
  pathname: string,
  robots?: string | null,
  title: string,
  url: string,
}

export const PostDetailTags = (props: PostDetailProps) =>
  <Helmet>
    <title>{props.title}</title>
    <meta name="apple-itunes-app" content="app-id=953614327" appArgument={props.pathname} />
    <meta name="name" itemProp="name" content={props.title} />
    <meta name="url" itemProp="url" content={props.url} />
    <meta name="description" itemProp="description" content={props.description} />
    { props.images.schemaImages && props.images.schemaImages.map(image => (
      <meta property={image.property} content={image.content} key={`${image.property}_${image.content}`} />
    ))}
    <meta property="og:type" content="article" />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    { props.images.openGraphImages && props.images.openGraphImages.map(image => (
      <meta property={image.property} content={image.content} key={`${image.property}_${image.content}`} />
    ))}
    { props.embeds.openGraphEmbeds && props.embeds.openGraphEmbeds.map(embed => (
      <meta property={embed.property} content={embed.content} key={`${embed.property}_${embed.content}`} />
    ))}
    <meta name="twitter:card" content={props.card} />
    <meta name="robots" content={props.robots} />
    {props.canonicalUrl && <link href={props.canonicalUrl} rel="canonical" />}
  </Helmet>

PostDetailTags.defaultProps = {
  canonicalUrl: null,
  robots: null,
}

