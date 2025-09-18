
import SearchForm from "../../components/SearchForm";
import { auth } from "@/auth";
import { Startup } from "@/sanity.types";
import { Author } from "@/sanity.types";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queies";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search : query || null };
  const session = await auth();
  console.log(session?.user?.id)

  // Fetch startups from Sanity (not live, static fetch at build time)
  // const posts = await client.fetch(STARTUPS_QUERY);

  // Fetch startups with live updates
  const {data : posts} = await sanityFetch({query: STARTUPS_QUERY, params});
  // const posts = [
  //   {
  //     createdAt: new Date(),
  //     views: 100,
  //     author: { name: "John Doe", id: 1 },
  //     id: 1,
  //     description: "This is a sample startup pitch.",
  //     image:
  //       "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Tech",
  //     title: "Innovative Tech Startup",
  //   },
  // ];
  return (
    <>
      <section className="pink_container pattern">
        <div className="tag">
          <p>Pitch, Vote, and Grow</p>
        </div>
        <h1 className="heading max-sm:!text-xl max-sm:!leading-tight">
          Pitch Your Startup <br /> Connect with Enterpreneurs{" "}
        </h1>
        <p className="subheading !max-w-3xl text-white">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual{" "}
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">{query ? `You searched for: ${query}` : "All Startups"}</p>
        <section className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard post={post} key={index} />
            ))
          ) : (
            <p className="no-results">No startups found.</p>
          )}
        </section>
      </section>

      <SanityLive/>
    </>
  );
};

export default page;
