import Image from "next/image";
import { ImageZoom } from "@/components/blog/image-zoom";

type MdxImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  zoom?: boolean;
};

export function MdxImage({
  src,
  alt,
  caption,
  width = 1280,
  height = 720,
  zoom = true,
}: MdxImageProps) {
  const image = (
    <ImageZoom enabled={zoom}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 720px"
        loading="lazy"
        className={caption ? "w-full rounded-xl" : "my-8 w-full rounded-xl"}
        style={{ width: "100%", height: "auto" }}
      />
    </ImageZoom>
  );

  if (caption) {
    return (
      <figure className="my-8">
        {image}
        <figcaption className="mt-3 text-center font-mono text-[13px] text-text-muted">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return image;
}
