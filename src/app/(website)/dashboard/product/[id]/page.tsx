const Page = ({ params }: { params: { id: string } }) => {
  return <div>Product with id: {params.id}</div>;
};

export default Page;
