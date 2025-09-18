import z from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(500, { message: "Description cannot exceed 500 characters" }),

  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters long" })
    .max(20, { message: "Category cannot exceed 20 characters" }),

  link: z
    .string()
    .url({ message: "Please enter a valid URL (must start with http/https)" }),

  pitch: z
    .string()
    .min(10, { message: "Pitch must be at least 10 characters long" }),
});

// refine(async (url)=>{
//         try {
//             const res = await fetch(url, {method: 'HEAD' });
//             const contentType = res.headers.get("content-type");
//             return contentType?.startsWith("image/");
//         } catch (error) {
//             return false
//         }
//     }),