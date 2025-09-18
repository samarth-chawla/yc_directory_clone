import React from "react";
import { cn, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity.types";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  return (
    <li className="startup-card group list-none">
        <div className="flex-between">
            <p className="startup-card_date">
                {formatDate(post._createdAt)}
            </p>
            <div className="flex gap-1.5 items-center">
                <Eye className="size-5 text-primary" />
                <p className="text-16-medium">{post.views}</p>
            </div>
        </div>
        <div className="flex-between mt-5 items-center">
            <div>
                <Link href={`/user/${post.author?._id}`}>
                    <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
                </Link>
                <Link href={`/startup/${post._id}`}>
                    <p className="font-semibold text-xl line-clamp-1">{post.title}</p>
                </Link>
            </div>
            <Link href={`/user/${post.author?._id}`} className="size-8">
                <Image
                    src={post?.author?.image ?? "/default-avatar.png"}
                    alt={post.title ?? "Startup image"}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full size-12"
                />
            </Link>
        </div>
        <Link href={`/startup/${post._id}`} className="text-primary">
            <p className="startup-card_desc ">{post.description}</p>
            <Image src={post.image ?? "/default-image.png"} alt={post.title ?? "Startup image"} height={164} width={164} className="startup-card_img"/>
        </Link>
        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${post.category}`} className="text-primary">
                <p className="text-16-medium">{post.category}</p>
            </Link>
            <Button className="startup-card_btn" asChild>
                <Link href={`/startup/${post._id}`}>
                    <span>Read More</span>
                </Link>
            </Button>
        </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0,1,2,3,4].map((i) => (
      <li key={cn("skeleton", i)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);


export default StartupCard;
