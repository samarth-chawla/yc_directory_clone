import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/queies";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStarups from "@/components/UserStarups";
import { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id.toString();
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_GITHUB_ID, { githubId: id });
  if (!user) return notFound();

  return (
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <h3 className="text-24-black uppercase text-center line-clamp-1">
            {user.name}
          </h3>
        </div>
        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="profile_image"
        />

        <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
        <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
      </div>
      <div className="flex-1 flex flex-col gap-5 lg:mt-5">
        <p className="text-30-bold">
          {session?.user?.id === id ? "Your" : `${user.name}'s`} Startups
        </p>
        <ul className="card_grid-sm">
          {/* Fetch and display user's startups here(PPR) */}
          <Suspense fallback={<p className="no-result">Loading...</p>}>
            <UserStarups id={id} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default page;
