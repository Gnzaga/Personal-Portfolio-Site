export default {
    "slug": "kaiwa-world-view-maritime-anomaly-detection",
    "date": "May 2026",
    "title": "Real-time Geospatial + Maritime-Anomaly Intelligence at Home",
    "summary": "I added a live map to my homelab intelligence project that tracks every plane and ship in view in real time, then layered unsupervised ML on top to flag the ones behaving strangely.",
    "paragraphs": [
      "I added a live map to my homelab project that shows, in real time, roughly every aircraft and vessel in view, then built a layer on top that flags which ones are behaving strangely. Started as a curiosity, became one of the more interesting things I've built.",
      "Kaiwa began as a news aggregator, and the geospatial layer grew out of a simple observation: a lot of the news I track has a physical location attached, and I was throwing that away. If a story mentions a strait or a shipping lane, I want to see what's happening there, not just read about it after.",
      "Data comes from live feeds, AIS vessel positions over a persistent WebSocket, ADS-B for aircraft, mirrored into a dedicated PostGIS database every five minutes via batch upserts, kept separate from the main application database so traffic spikes never touch transactional data.",
      "Instead of querying PostGIS directly from the frontend, I run a small Rust tile server generating vector tiles from SQL functions with spatial indexes behind them, so the frontend just requests tiles for whatever's in view while the heavy lifting happens once, server-side, cached.",
      "Raw positions on a map are neat for about five minutes, then the interesting part is deciding which matter. So there's a two-tier detection pipeline: fast rule-based checks every five minutes (gaps in AIS transmission, speed and route deviations, unusual vessel density around chokepoints) feeding a slower ML pass, an ensemble of Isolation Forest for outlier scoring, DBSCAN for spatial clustering, LDA topic modeling against news in the same area, and time-series decomposition for trend breaks a point-in-time check would miss.",
      "A dozen maritime chokepoints, the major straits where shipping funnels through narrow geography, get defined as geofences, since that's where anomalous behavior is both more likely and more interesting. None of this sits in isolation, anomaly scores feed the same correlation engine that processes news, weather, and market signals, so a vessel anomaly near a chokepoint gets checked against whatever else was happening in the news.",
      "I learned more about spatial indexing and tile-generation performance than I expected. Mostly it's a reminder that \"intelligence\" is just careful data engineering: normalizing noisy feeds, deduplicating aggressively, not calling something an anomaly until you've ruled out the boring explanation.",
      "Still evolving: more geofences, better baselining for normal traffic per region, tighter integration with the research agent so a flagged anomaly can kick off its own investigation."
    ],
    "tags": [
        { label: "Geospatial", url: "/projects?filter=Geospatial" },
        { label: "Machine Learning", url: "/projects?filter=Machine Learning" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    "images": [],
    "links": []
};
