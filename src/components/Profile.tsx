import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="profile_box">
      <div className="flex_box-lg">
        <div className="profile_image" />
        <div>
          <div className="profile_email">test@test.com</div>
          <div className="profile_name">김유저</div>
        </div>
      </div>
      <Link to="/" className="profile_logout">
        로그아웃
      </Link>
    </div>
  );
}
