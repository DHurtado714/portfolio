import { MdxImage } from "@/components/blog/mdx-image";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type GalleryProps = {
  images: GalleryImage[];
  columns?: 2 | 3;
};

export function Gallery({ images, columns = 2 }: GalleryProps) {
  return (
    <div
      className={`my-8 grid grid-cols-1 gap-4 ${
        columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {images.map((image, index) => (
        <MdxImage
          key={`${image.src}-${index}`}
          src={image.src}
          alt={image.alt}
          caption={image.caption}
          zoom
        />
      ))}
    </div>
  );
}
