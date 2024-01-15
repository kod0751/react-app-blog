import React from 'react';
import { Link } from 'react-router-dom';

interface PostListProps {
  hasNavigation?: boolean;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  return (
    <>
      {hasNavigation && (
        <div className="post_navi">
          <div className="post_navi-active">전체</div>
          <div>나의 글</div>
        </div>
      )}
      <div className="post_list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post_box">
            <Link to={`/posts/${index}`}>
              <div className="post_profile-box">
                <div className="post_profile" />
                <div className="post_author-name">일이삼</div>
                <div className="post_date">2024.01.13 토요일</div>
              </div>
              <div className="post_title">게시글 {index}</div>
              <div className="post_text">ㅁㄴㅇㄹ</div>
              <div className="post_utils-box">
                <div className="post_delete">삭제</div>
                <div className="post_edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
