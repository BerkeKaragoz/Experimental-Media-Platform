import Head from "next/head";
import React from "react";
import Img from "../../components/atoms/Img";
import styled from "styled-components";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Text from "../../components/atoms/Text";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MediaType } from "../../@types/media";

const Picture = styled(Img)`
  height: 100%;
  max-height: 100vh;
  margin: auto;
`;

const Header = styled.header`
  position: fixed;
  color: white;
  background-color: #4a4a4a;
  padding: 2px ${(props) => props.theme.space}px;
  border-radius: 0 0 ${(props) => props.theme.space}px 0;
  z-index: 1;
`;

const Background = styled.div`
  background-color: #333;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
`;

const rootStyle: React.CSSProperties = {
  position: "relative",
  height: "100vh",
  overflow: "hidden",
};

interface Props {
  data?: MediaType;
  error?: string;
}

export default function Media(props: Props) {
  console.log("Props", props);

  const [data, setData] = React.useState(props.data);
  const [currentSource, setCurrentSource] = React.useState<number>(0);

  const router = useRouter();
  const { id } = router.query;

  if (!data) {
    return <pre>{JSON.stringify(props.error, null, 2)}</pre>;
  }

  return (
    <main style={rootStyle}>
      <div
        style={{
          position: "absolute",
          overflowY: "scroll",
          top: 0,
          bottom: 0,
          left: 0,
          right: "-17px",
        }}
      >
        <Head>
          <title>Media {id}</title>
        </Head>
        <Background />
        <Header>
          <Text caption>{id}</Text>
        </Header>
        <TransformWrapper centerOnInit doubleClick={{ mode: "reset" }}>
          <TransformComponent
            contentStyle={{ width: "100vw" }}
            wrapperStyle={{ height: "100%" }}
          >
            <Picture
              src={
                data.sources[currentSource].isLocal
                  ? process.env.NEXT_PUBLIC_LOCAL_MEDIA_PATH +
                    data.sources[currentSource].url
                  : data.sources[currentSource].url
              }
              alt={data.name}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  try {
    const res = await fetch(process.env.HOST + "/api/media/get/" + id); //TODO
    const data = await res.json();
    return { props: { data } };
  } catch (err) {
    console.error(err);
    return { props: { error: err.message } };
  }
};
