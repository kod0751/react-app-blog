import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostProps } from './PostList';
import { db } from 'firebaseApp';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import Loader from './Loader';
import { toast } from 'react-toastify';
import Comments from './Comments';

export default function PostDetial() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, 'posts', post.id));
      toast.success('게시글을 삭제했습니다.');
      navigate('/');
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params.id]);

  return (
    <>
      <div className="post_detail">
        {post ? (
          <>
            <div className="post_box">
              <div className="post_title">{post?.title}</div>
              <div className="post_profile-box">
                <div className="post_profile" />
                <div className="post_author-name">{post?.email}</div>
                <div className="post_date">{post?.createdAt}</div>
              </div>
              <div className="post_utils-box">
                {post?.category && (
                  <div className="post_category">{post?.category}</div>
                )}

                <div
                  className="post_delete"
                  role="presentation"
                  onClick={handleDelete}
                >
                  삭제
                </div>
                <div className="post_edit">
                  <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                </div>
              </div>
              <div className="post_text post_text-pre-wrap">
                {post?.content}
              </div>
            </div>
            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
