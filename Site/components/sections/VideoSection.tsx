export default function VideoSection() {
  return (
    <section id="video">
      <div className="wrap">
        <div className="divider"><span>05</span><span>En vidéo</span><span /></div>
        <div className="video-grid">
          <div className="video-item">
            <span className="tag" style={{ position: "static", marginBottom: 12, display: "inline-block" }}>Réseaux sociaux</span>
            <div className="video-phone">
              <iframe
                src="https://www.youtube.com/embed/6ovQQHLqo24?rel=0&modestbranding=1"
                title="Coco Bonbons – réseaux"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </div>
          <div className="video-item">
            <span className="tag" style={{ position: "static", marginBottom: 12, display: "inline-block" }}>Assemblage SolidWorks</span>
            <div className="video-landscape">
              <iframe
                src="https://www.youtube.com/embed/QTWjUg1D_sI?rel=0&modestbranding=1"
                title="Coco Bonbons – assemblage SolidWorks"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
