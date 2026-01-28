import React from 'react';
import { CreateProduct } from '@/pages/ProductPage'

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>
};

async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <CreateProduct slug={slug} />
    </>
  );
}

export default Page;
