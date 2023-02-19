import styled from "@emotion/styled";
import { Loader } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
const Canvas = dynamic(() => import("../components/Canvas"), { ssr: false });
const IndexLayout = styled.div`
  section {
    width: 50%;
    height: 100%;
  }
`;

export default function Home() {
  // useQuery("https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list");
  // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const containerRef = useRef<any>();
  return (
    <IndexLayout
      className="content-container w-[100vw] h-[100vh] flex flex-col relative"
      ref={containerRef}
    >
      <Suspense fallback={null}>
        <Canvas containerRef={containerRef} />
      </Suspense>
      <Loader />
      {/* <div className="chat-container fixed flex flex-row items-center p-4 bg-transparent w-1/5 h-1/2 right-0 bottom-0 opacity-30 hover:opacity-100 transition-opacity duration-500">
        <ChatRoom />
      </div> */}
    </IndexLayout>
  );
}
