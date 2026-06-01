export default function VideoSection() {
  return (
    <section id="video">
      <div className="wrap">
        <div className="divider"><span>05</span><span>En vidéo</span><span /></div>
        <div className="sec-head">
          <h2 className="h-display">Vu sur les <em>réseaux</em>.</h2>
        </div>
        <div className="video-stage">
          <div className="video-phone">
            <iframe
              src="https://www.youtube.com/embed/6ovQQHLqo24?rel=0&modestbranding=1"
              title="Coco Bonbons"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
