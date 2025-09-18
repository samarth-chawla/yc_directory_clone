import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY_BY_ID, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queies";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdown from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

export const experimental_ppr = true;
const md = markdown();
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // Parallel Fetching
  const [post, {select: editorsPicks}] = await Promise.all([
    client.fetch(STARTUPS_QUERY_BY_ID, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-s-pick"})
  ]);

  // Sequential Fetching (Time Taking)
  // const post = await client.fetch(STARTUPS_QUERY_BY_ID, { id });
  // const { select : editorsPicks } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-s-pick"});
  const parsedContent = md.render(post?.pitch || "");

  if (!post) {
    return notFound();
  }

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h3 className="heading">{post.title}</h3>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post.image}
          alt="{post.title}"
          className="w-full h-auto rounded-xl sha"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex items-center gap-2 mb-3"
            >
              <Image
                src={post.author?.image}
                alt={post?.author?.name}
                width={64}
                height={64}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">
            Pitch Details
          </h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No pitch details available.</p>
            )}
          
        </div>
        <hr className="divider" />
        {/* EDITOR SELECT STARTUPs (Dynamic Part of Component(PPR Page)) */}
        {editorsPicks.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editors Pick</p>
            <ul className="mt-7 card_grid-sm">
              {editorsPicks.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
