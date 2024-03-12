"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push('/diary'); //접근 시 바로 /diary로 자동 라우팅
  return (
    <>
    </>
  );
}
