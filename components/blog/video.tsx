type VideoProps = {
  src: string;
  poster?: string;
  caption?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
};

export function Video({
  src,
  poster,
  caption,
  controls = true,
  loop = false,
  muted = false,
  autoPlay = false,
}: VideoProps) {
  const video = (
    <video
      className="my-8 w-full rounded-xl"
      preload="none"
      controls={controls}
      poster={poster}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
      playsInline
    >
      <source src={src} />
    </video>
  );

  if (caption) {
    return (
      <figure className="my-8">
        {video}
        <figcaption className="mt-3 text-center font-mono text-[13px] text-text-muted">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return video;
}
