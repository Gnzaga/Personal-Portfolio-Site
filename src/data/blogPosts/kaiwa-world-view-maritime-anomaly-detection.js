export default {
    "slug": "kaiwa-world-view-maritime-anomaly-detection",
    "date": "May 2026",
    "title": "Real-time Geospatial + Maritime-Anomaly Intelligence at Home",
    "summary": "I added a live map to my homelab intelligence project that tracks every plane and ship in view in real time — then layered unsupervised ML on top to flag the ones behaving strangely.",
    "paragraphs": [
      "I added a live map to my homelab project that shows, in real time, roughly every aircraft and vessel in view — and then built a layer on top that flags which of them are behaving strangely. It started as a curiosity and turned into one of the more technically interesting things I've built.",
      "Kaiwa began as a news aggregator, and the geospatial layer grew out of a simple observation: a lot of the news I was tracking had a physical location, and I was throwing that information away. If a story mentions a strait, a border, or a shipping lane, I wanted to see what was actually happening there, not just read about it after the fact.",
      "The data comes from live feeds: AIS vessel positions over a persistent WebSocket connection, and ADS-B aircraft tracking. Positions get mirrored into a dedicated PostGIS database on a five-minute cycle via batch upserts, kept deliberately separate from the main application database so a spike in position updates never touches transactional data.",
      "Serving that data to a browser at interactive frame rates is its own problem. Rather than querying PostGIS directly from the frontend, I run a small Rust tile server that generates vector tiles straight from SQL functions with spatial indexes behind them. The frontend map just requests tiles for whatever's in view; the heavy lifting happens once, server-side, and gets cached.",
      "Raw positions on a map are neat for about five minutes. The interesting part is deciding which ones matter. So I built a two-tier detection pipeline: fast rule-based checks running every five minutes — gaps in AIS transmission (a classic \"going dark\" signature), speed and route deviations, and unusual vessel density around known chokepoints — feeding into a slower ML pass.",
      "The ML side runs an ensemble rather than a single model: Isolation Forest for general outlier scoring, DBSCAN for spatial clustering (are vessels bunching up somewhere they shouldn't?), LDA topic modeling against the news signals happening in the same area, and time-series decomposition to catch trend breaks that a point-in-time check would miss.",
      "A dozen maritime chokepoints — major straits where global shipping funnels through narrow geography — are defined as specific geofences, because that's where anomalous behavior is both more likely and more interesting. Vessel clustering or a sudden drop in expected traffic through one of these means something, even before you know what.",
      "None of this happens in isolation. Anomaly scores feed into the same correlation engine that processes news, weather, and market signals, so a vessel anomaly near a chokepoint can get automatically checked against whatever else was happening in the news at the same time. A cluster of unusual activity stops being a data point and starts being a lead.",
      "Building this taught me more about spatial indexing and tile-generation performance than I expected going in, but the bigger lesson was about the nature of the work itself: most of what looks like \"intelligence\" is really just disciplined data engineering — normalizing noisy real-time feeds, deduplicating aggressively, and being honest with yourself about false positives before you call something an anomaly.",
      "It's still evolving — more geofences, better baselining for what \"normal\" traffic looks like per region, and tighter integration with the research agent so a flagged anomaly can trigger its own investigation automatically."
    ],
    "tags": [
        { label: "Geospatial", url: "/projects?filter=Geospatial" },
        { label: "Machine Learning", url: "/projects?filter=Machine Learning" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    "images": [],
    "links": []
};
