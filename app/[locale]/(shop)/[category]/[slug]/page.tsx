import React from 'react';

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
    </>
  );
}

export default Page;
