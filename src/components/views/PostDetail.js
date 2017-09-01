import React from 'react'
import PropTypes from 'prop-types'
import Editor from '../editor/Editor'
import PostContainer from '../../containers/PostContainer'
import StreamContainer from '../../containers/StreamContainer'
import { MainView } from '../views/MainView'
import { loadRelatedPosts } from '../../actions/posts'
import { LaunchCommentEditorButton, RelatedPostsButton } from '../posts/PostRenderables'
import { TabListButtons } from '../tabs/TabList'
import { css, hover, media, modifier, parent, select } from '../../styles/jss'
import * as s from '../../styles/jso'
import * as ElloAndroidInterface from '../../lib/android_interface'

const postDetailStyle = css(
  s.relative,
  media(
    s.minBreak2,
    select('& .PostList .Post .PostHeader', s.displayNone),
    select('& .PostList .Post .PostTools', s.displayNone),
  ),
)

const navStyle = css(
  s.relative,
  { marginBottom: -10 },
)

const streamStyle = css(
  s.px10,
  media(
    s.minBreak2,
    s.px20,
    { width: 'calc(100vw - 420px)' },
    select('& .PostHeader', s.absolute, { top: 0, right: 'calc(100vw - 420px)' }),
  ),
)

const asideCommentStyle = css(
  s.absolute,
  s.fullHeight,
  { width: 420, borderLeft: '1px solid #f2f2f2', top: 0, right: 0, overflowY: 'scroll' },
  select('& .ViewsTool.isPill > a', s.colorA, { backgroundColor: 'transparent' }, hover({ backgroundColor: 'transparent' })),
  select('& .CommentContent', s.m20),
  select('.PostDetails & .TabListStreamContainer', s.px0),
  select('& .PostTools', s.flex, s.justifySpaceBetween, s.itemsCenter, s.p0),
  select('& .PostTool .SVGIcon + .PostToolValue', s.fontSize18, { marginLeft: 15 }),
  select('& .PostToolValue', s.fontSize18, s.ml10),
  parent('.PostDetail .Posts.asList',
    select('& .TimeAgoTool', s.displayNone),
  ),
  select('& .asideTopPost',
    select('& .SVGIcon', { transform: 'scale(1.5)' }),
    select('& .PostBody', s.displayNone),
    select('& .PostHeader', s.px20, { borderBottom: '1px solid #f2f2f2' }),
    select('& .PostTools', s.px20, { borderBottom: '1px solid #f2f2f2' }),
    select('& .CommentTool', s.displayNone),
    select('& .WatchTool', s.displayNone),
    select('& .FlagTool', s.displayNone),
    select('& .ViewsTool', s.pointerNone, modifier('.isPill', { marginRight: '0 !important' })),
  ),
  select('& .asideBottomPost',
    select('& .PostBody', s.displayNone),
    select('& .PostHeader', s.displayNone),
    select('& .PostTools', s.px20),
    select('& .PostTool', s.displayNone,
      modifier('.WatchTool', s.block),
      modifier('.FlagTool', s.block),
    ),
  ),
)

const CommentContent = (
  { activeType, avatar, hasEditor, hasRelatedPostsButton, isLoggedIn, post, streamAction, tabs },
  { onClickDetailTab }) => (
    <div className="CommentContent">
      {tabs && tabs.length > 0 &&
        <div className={navStyle}>
          <TabListButtons
            activeType={activeType}
            className="SearchTabList"
            key={`TabListButtons_${activeType}`}
            onTabClick={onClickDetailTab}
            tabClasses="LabelTab SearchLabelTab"
            tabs={tabs}
          />
          {hasRelatedPostsButton && <RelatedPostsButton />}
        </div>
      }
      {hasEditor && activeType === 'comments' && !ElloAndroidInterface.supportsNativeEditor() && <Editor post={post} isComment />}
      {isLoggedIn && ElloAndroidInterface.supportsNativeEditor() &&
        <LaunchCommentEditorButton avatar={avatar} post={post} />
      }
      {streamAction && tabs && tabs.length > 0 &&
        <StreamContainer
          action={streamAction}
          className="TabListStreamContainer"
          key={`TabListStreamContainer_${activeType}`}
          paginatorText="Load More"
          paginatorCentered={activeType === 'loves' || activeType === 'reposts'}
          shouldInfiniteScroll={false}
        />
      }
    </div>
  )
CommentContent.propTypes = {
  activeType: PropTypes.string.isRequired,
  avatar: PropTypes.object,
  hasEditor: PropTypes.bool.isRequired,
  hasRelatedPostsButton: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  streamAction: PropTypes.object,
  tabs: PropTypes.array.isRequired,
}
CommentContent.defaultProps = {
  avatar: null,
  streamAction: null,
}
CommentContent.contextTypes = {
  onClickDetailTab: PropTypes.func.isRequired,
}

// TODO: Remove references to the PostDetailStreamContainer styles
export const PostDetail = (props) => {
  const { columnCount, deviceSize, post } = props
  return (
    <MainView className={`PostDetail ${postDetailStyle}`}>
      <div className="PostDetails Posts asList">
        <article className={`PostList ${streamStyle}`} id={`Post_${post.get('id')}`}>
          <PostContainer postId={post.get('id')} />
          {deviceSize === 'mobile' && <CommentContent {...props} />}
          <StreamContainer
            action={loadRelatedPosts(`~${post.get('token')}`, columnCount)}
            className="RelatedPostsStreamContainer"
            shouldInfiniteScroll={false}
          />
        </article>
        {deviceSize !== 'mobile' &&
          <aside className={asideCommentStyle}>
            <PostContainer className="asideTopPost" postId={post.get('id')} />
            <CommentContent {...props} />
            <PostContainer className="asideBottomPost" postId={post.get('id')} />
          </aside>
        }
      </div>
    </MainView>
  )
}
PostDetail.propTypes = {
  columnCount: PropTypes.number.isRequired,
  deviceSize: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
}
PostDetail.contextTypes = {
  onLaunchNativeEditor: PropTypes.func.isRequired,
}

export const PostDetailError = ({ children }) =>
  (<MainView className="PostDetail">
    <section className="StreamContainer isError">
      {children}
    </section>
  </MainView>)
PostDetailError.propTypes = {
  children: PropTypes.node.isRequired,
}

