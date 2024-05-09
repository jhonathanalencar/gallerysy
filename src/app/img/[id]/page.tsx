interface ImgPageProps {
  params: {
    id: string;
  };
}

export default function ImgPage({ params }: ImgPageProps) {
  return <h1>Img Page 2 {params.id}</h1>;
}
