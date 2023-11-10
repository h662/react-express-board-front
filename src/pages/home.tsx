import axios from "axios";
import { FC, useEffect, useState } from "react";

import Header from "../components/Header";
import { useMe } from "../hooks";
import PostCard from "../components/PostCard";

export interface IPost {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  user: {
    account: string;
  };
  userId: number;
}

const Home: FC = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { account, getMe } = useMe();

  const getPosts = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/post?page=${page}`
      );

      setPosts(response.data.posts);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const getCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/post/count`
      );

      if (response.status !== 200) return;

      setCount(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error(error);
    }
  };

  const pageComp = () => {
    let pageCompArray = [];

    for (let i = 0; i < count; i++) {
      pageCompArray.push(
        <li
          key={i}
          onClick={() => currentPage !== i && getPosts(i)}
          className={`cursor-pointer p-2 ${
            currentPage !== i
              ? "text-gray-300 hover:font-semibold hover:text-black"
              : "text-black"
          }`}
        >
          {i + 1}
        </li>
      );
    }

    return pageCompArray;
  };

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!account) return;

    getPosts(0);
    getCount();
  }, [account]);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto">
        <h1 className="mt-20 text-center font-bold text-2xl">h662's 게시판</h1>
        <ul className="mt-10 h-[440px]">
          <li className="flex justify-between border-b-2 font-semibold">
            <span className="w-2/12 p-2 text-center">아이디</span>
            <span className="w-6/12 p-2 text-center">제목</span>
            <span className="w-2/12 p-2 text-center">사용자</span>
            <span className="w-2/12 p-2 text-center">작성일</span>
          </li>
          {posts?.map((v, i) => {
            return <PostCard key={i} post={v} index={i} />;
          })}
        </ul>
        <ul className="flex text-lg justify-center">{count && pageComp()}</ul>
      </main>
    </>
  );
};

export default Home;
