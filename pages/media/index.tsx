import Head from "next/head";
import React from "react";
import Img from "../../components/atoms/Img";
import Card from "../../components/molecules/Card";
import Container from "../../components/atoms/Container";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import { GetServerSideProps } from "next";
import ApolloClientInstance from "../../logic/database";
import { ApolloQueryResult, gql, useMutation } from "@apollo/client";
import { MediaType } from "../../@types/media";
import { useRouter } from "next/router";
import { decryptMedia, encryptMedia } from "../../logic/objectEncryption";
import { searchSlugify } from "../../logic/utils/search";
import { useDropzone } from "react-dropzone";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space}px;
  border: 1px dashed red;
`;

const CREATE_MEDIA = gql`
  mutation createMedia($data: MediaInput!) {
    createMedia(data: $data) {
      _id
      name
      sources {
        name
        url
        isLocal
      }
    }
  }
`;

interface Props {
  data?: Array<MediaType>;
  error?: string;
}

export default function Media(props: Props) {
  const { data: media } = props;
  console.log(media);
  const [createMedia, { data, loading, error }] = useMutation(CREATE_MEDIA);

  const onDrop = React.useCallback((files) => {
    // Do something with the files
    console.log(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [mediaInfo, setMediaInfo] = React.useState({
    name: "",
    url: "",
  });

  const nameRef = React.useRef<HTMLInputElement>(null);
  const urlRef = React.useRef<HTMLInputElement>(null);
  const isLocalRef = React.useRef<HTMLInputElement>(null);
  const idRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();
  const redirectTo = (href: string) => () => {
    router.push(href);
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current!.value;
    const urlInputValue = urlRef.current!.value;
    const isLocal = isLocalRef.current!.checked;

    let url = urlInputValue;

    if (isLocal && process.env.NEXT_PUBLIC_LOCAL_MEDIA_PATH) {
      if (urlInputValue.startsWith(process.env.NEXT_PUBLIC_LOCAL_MEDIA_PATH)) {
        url = urlInputValue.slice(
          process.env.NEXT_PUBLIC_LOCAL_MEDIA_PATH.length,
        );
      } else {
        urlRef.current!.setCustomValidity(
          "Has to start with: " + process.env.NEXT_PUBLIC_LOCAL_MEDIA_PATH,
        );
        urlRef.current!.reportValidity();
        return;
      }
    }

    const data = encryptMedia({
      name,
      search: searchSlugify(name),
      sources: [{ url, isLocal }],
    });

    createMedia({ variables: { data } }).then((res) => {
      console.log(res);
      refreshData();
    });
  };

  const testHandler = (e: Event) => {
    const name = nameRef.current!.value;
    const urlInputValue = urlRef.current!.value;
    const isLocal = isLocalRef.current!.checked;

    let url = urlInputValue;

    if (isLocal) {
      if (urlInputValue.startsWith(localMediaPath)) {
        url = urlInputValue.slice(localMediaPath.length);
      } else {
        urlRef.current!.setCustomValidity(
          "Has to start with: " + localMediaPath,
        );
        urlRef.current!.reportValidity();
        return;
      }
    } else if (urlInputValue.length < 1) {
      urlRef.current!.setCustomValidity("URL cannot be empty!");
      urlRef.current!.reportValidity();
      return;
    }

    const data = { name, url, isLocal };

    console.log(data);
  };

  const getHandler = (e: Event) => {
    const id = idRef.current!.value;
    //getPicture(name).then((res) => setData(res));
    fetch("/api/media/get/" + id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMediaInfo(res);
      });
  };

  const updateHandler = (e: Event) => {
    const id = idRef.current!.value;
    const name = nameRef.current!.value;
    const url = urlRef.current!.value;
    //getPicture(name).then((res) => setData(res));
    fetch("/api/media/update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sources: [{ name, url }] }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMediaInfo(res);
      })
      .catch((err) => console.error(err));
  };

  if (!media) return <pre>{JSON.stringify(props.error, null, 2)}</pre>;

  return (
    <div>
      <Head>
        <title>Media</title>
      </Head>
      <Container>
        <Grid>
          {media.map((s: MediaType) => {
            return (
              <Card
                key={s._id}
                onClick={redirectTo("/media/" + s._id)}
                height="128px"
                src={
                  s.sources[0].isLocal
                    ? process.env.NEXT_PUBLIC_LOCAL_MEDIA_PATH +
                      s.sources[0].url
                    : s.sources[0].url
                }
                title={s.name}
              />
            );
          })}
        </Grid>
        <Grid style={{ padding: "16px" }}>
          <form onSubmit={createHandler}>
            <label htmlFor="name">Name</label>
            <input ref={nameRef} name="Name" id="name" />
            <label htmlFor="url">URL</label>
            <input required ref={urlRef} type="url" name="url" id="url" />
            <label htmlFor="isLocal">Is Local</label>
            <input
              ref={isLocalRef}
              type="checkbox"
              defaultChecked={true}
              name="isLocal"
              id="isLocal"
            />
            <Button type="submit">Create</Button>
          </form>
          <Button onClick={testHandler}>Test</Button>
        </Grid>
        <Grid style={{ padding: "16px" }}>
          <form>
            <label htmlFor="id">ID</label>
            <input ref={idRef} name="Id" id="id" />
          </form>
          <Button onClick={getHandler}>Get</Button>
        </Grid>
        <Grid>
          <Button onClick={updateHandler}>Update</Button>
        </Grid>

        <Grid>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Click/drag&drop some files here</p>
            )}
          </div>
        </Grid>
        <Grid>
          <Img src={mediaInfo.url} />
        </Grid>
      </Container>
    </div>
  );
}

type Data = { allMedia: { data: Array<MediaType> } };

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const queryResult: ApolloQueryResult<Data> =
      await ApolloClientInstance.query({
        query: gql`
          {
            allMedia {
              data {
                name
                search
                sources {
                  name
                  url
                  isLocal
                }
                _id
              }
            }
          }
        `,
      });

    const data = [];

    for (const d of queryResult.data.allMedia.data) {
      data.push(decryptMedia(d));
    }

    return { props: { data } };
  } catch (err) {
    console.error(err);
    return { props: { error: err.message } };
  }
};
