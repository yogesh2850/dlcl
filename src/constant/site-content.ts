export const siteContent = {
  name: 'DLCL',
  title:
    'DLCL: Deep Learning-enabled Cooperative Localization for UAV-UGV Team with Adaptive Perception Recovery',
  titleHighlights: [
    { text: 'DLCL', highlight: true },
    {
      text: ': Deep Learning-enabled Cooperative Localization for UAV-UGV Team with Adaptive Perception Recovery',
      highlight: false,
    },
  ] as { text: string; highlight: boolean }[],

  authors: [
    {
      name: 'Veera Venkata Ram Murali Krishna Rao Muvva',
      url: 'https://krishnamuvva.com/',
      affiliations: '1,2',
      corresponding: true,
    },
    {
      name: 'Yogesh Chawla',
      url: 'http://yogesh-chawla.com/',
      affiliations: '2',
    },
    {
      name: 'Kunjan Theodore Joseph',
      url: 'https://www.linkedin.com/in/k-theo-joseph/',
      affiliations: '2',
    },
    {
      name: 'Ankita Kalra',
      url: 'http://ankitakalra.com/',
      affiliations: '1,2',
    },
    {
      name: 'Marilyn Wolf',
      url: 'https://computing.unl.edu/person/marilyn-wolf/',
      affiliations: '1',
    },
    {
      name: 'Santosh Pitla',
      url: 'https://bse.unl.edu/person/santosh-pitla/',
      affiliations: '2',
    },
  ],

  authorBreakAfter: 'Kunjan Theodore Joseph',

  affiliations: [
    {
      id: '1',
      label: 'School of Computing, University of Nebraska–Lincoln',
      logo: '/images/unl_logo.png',
    },
    {
      id: '2',
      label: 'Biological Systems Engineering, University of Nebraska–Lincoln',
      logo: '/images/unl_logo.png',
    },
  ],

  links: [
    {
      href: '/paper/dlcl.pdf',
      label: 'Paper (IJCV, under review)',
      live: true,
    },
    {
      href: '',
      label: 'Dataset — coming on acceptance',
      live: false,
    },
    {
      href: 'mailto:krishna@huskers.unl.edu?subject=DLCL%20code%20request',
      label: 'Code — available on request',
      live: true,
    },
  ],

  tldr: `DLCL fuses GNSS with deep-learning vision across a three-robot team — two UAVs ("Alpha," "Bravo") and one UGV ("Charlie") — and adds an LSTM-based Perception Recovery module that forecasts detector confidence a few frames ahead so the system can raise or relax its detection threshold before it fails. The result: up to 50% higher frame-level detection accuracy under low light, ~1 m tighter XY and ~1.5 m tighter Z localization versus GNSS alone, and a GNSS-prior cropping strategy that cuts inference compute by 54% and latency by 40% for real-time embedded deployment.`,

  introduction: [
    `Multi-robot teams that pair aerial and ground vehicles are attractive for disaster response, search-and-rescue, and precision agriculture — UAVs give rapid aerial coverage, UGVs handle payload and ground-level work. The bottleneck is localization: consumer GNSS is only accurate to roughly 2.5 m, and RTK correction (which fixes that) needs an hours-long base-station setup and continuous communication with it, which doesn't scale to remote or fast-moving deployments.`,
    `Vision offers a cheap, lightweight complement — but perception pipelines treat each frame independently. A single missed detection weakens a measurement update, inflates covariance, and raises the odds of the next frame also failing — a cascade that's especially punishing for the lightweight nano/small detectors that are actually deployable on embedded UAV hardware. DLCL's core idea is to stop treating detection confidence as memoryless: model it as a time series, forecast where it's heading, and adapt the detector before it breaks.`,
  ],

  contributions: [
    {
      title: 'A new UAV–UGV dataset',
      body: 'Roughly 22,000 static images (12,000 UAV + 10,000 UGV) across diverse vehicle types, backgrounds, and lighting, plus a 7,500-frame sequential dataset purpose-built for training temporal/recurrent failure-recovery models — around 30,000 images in total.',
    },
    {
      title: 'Cooperative GNSS–vision localization',
      body: "A Kalman-fusion framework where each robot's absolute GNSS fix is coupled with relative vision detections of teammates, cutting positional uncertainty by ~1 m in X-Y and ~1.5 m in Z versus GNSS alone.",
    },
    {
      title: 'Adaptive Perception Recovery (PR)',
      body: "An LSTM that reads the last 10 confidence scores and forecasts the next 3, dynamically retuning the detector's confidence threshold. Validated across YOLOv8/v9/v10/v11 (nano and small variants) and shown to be robust regardless of the underlying detector.",
    },
  ],

  methodology: {
    hardware: `Alpha is a Wispr Ranger Pro quadcopter (KDE motors/18" props, Cube Blue flight controller, Here 3 GNSS, Intel Core i5, three cameras — two forward-facing stereo, one downward). Bravo is an in-house hexacopter (ReadyToSky motors/props, Cube Blue, Here4 GNSS, Intel Celeron, same three-camera layout). Charlie is a shaft-drive 4WD UGV (Velineon motors, composite-nylon chassis, Intel Pentium, Here4 GNSS, two upward-facing cameras). All run ROS 2 Humble with MAVROS. Detection cameras are NexiGo N660 1080p webcams (110° diagonal FOV). A second, RTK-paired GNSS/flight-controller stack rides along on each vehicle purely to log ground truth — it's never in the control loop.`,
    perception: `Downward cameras on Alpha/Bravo spot Charlie on the ground; Charlie's upward cameras spot the UAVs; Alpha and Bravo triangulate each other via stereo disparity. Detections come from YOLO (v8–v11, nano/small), converted from image coordinates to 3D relative position via calibrated camera intrinsics/extrinsics.`,
    recovery: `Framed as time-series prediction rather than per-frame classification: an LSTM trained on the 7.5k-frame sequential dataset takes confidence scores cₜ₋₉ … cₜ and predicts cₜ₊₁, cₜ₊₂, cₜ₊₃, capping any predicted threshold above 0.5. That prediction sets next frame's detection threshold, paired with an image-space Kalman filter whose gating radius grows with consecutive misses, and a "search mode" that temporarily relaxes the threshold to reacquire a target after too many misses.`,
    localization: `A 9-dimensional stacked state (positions of Alpha, Bravo, Charlie) is updated in two stages: a GNSS update (identity observation matrix, per-vehicle GNSS noise) followed by relative vision updates for every observed pair. Because vision constraints are off-diagonal (they tie robot i's position to robot j's), they shrink the whole team's joint covariance — even for a robot that isn't being directly observed at that instant.`,
    simToReal: `Cosys-AirSim (an Unreal Engine 5 fork of Microsoft's discontinued AirSim) + ROS 2 Humble + ArduCopter SITL, so scripts transfer from simulation to physical hardware with only a port change.`,
  },

  stats: [
    {
      value: '50%',
      label: 'Peak detection-accuracy gain',
      sub: 'Perception Recovery across real UAV trajectories',
    },
    {
      value: '1 m / 1.5 m',
      label: 'X-Y / Z uncertainty reduction',
      sub: 'GNSS+vision fusion vs. GNSS alone',
    },
    {
      value: '54% / 40%',
      label: 'GFLOPs / latency reduction',
      sub: 'GNSS-prior adaptive cropping (4.04→1.85 GFLOPs, 36.74→21.86 ms)',
    },
    {
      value: '82.0',
      label: 'mAP50-95',
      sub: 'Best detector: YOLOv11-small on the UAV–UGV benchmark',
    },
  ],

  results: {
    detection: `Across YOLOv8n/s, YOLOv9-tiny/s, YOLOv10n/s, YOLOv11n/s, YOLOv11-small tops out at 82.0 mAP50-95 (9.4M params, 21.5 GFLOPs); YOLOv11-nano gets 80.5 mAP50-95 at the lowest compute in the field (6.5 GFLOPs) — evidence that the newer architecture's C3K2/C2PSA blocks help even at nano scale.`,
    recovery: `On real twilight trajectories, PR turns some genuinely broken baselines into usable ones — e.g., YOLOv9-Tiny goes from 17.8% to 68.9% frame accuracy on one trajectory, and from consistently failing every frame (Charlie's low-light trajectory) to reliable detection once PR is active. Tested against a public multi-camera drone-tracking benchmark too (four trajectories, iPhone 6 and Sony NEX-5N footage): raw YOLOv8x — a heavier model — still snaps to false positives on trees and clouds, while PR-corrected YOLOv8s produces a smooth trajectory that tracks ground truth, meaning a small model with PR can match or beat a much larger one.`,
    localization: `3-sigma uncertainty ellipsoids shrink noticeably after fusion for all three robots; Alpha benefits most because it's the only vehicle that detects both teammates, giving it two independent vision updates per cycle versus one for Bravo and Charlie.`,
    teamSize: `In simulation, RMSE for the GNSS+vision estimator drops steadily as the number of cooperating agents grows from 2 to 10 (GNSS-only RMSE stays essentially flat), and the 3σ uncertainty circle keeps contracting — cooperation pays off monotonically.`,
    crop: `Sweeping UAV altitude (2–15 m) against input resolution (32–640 px) shows detection fails almost everywhere below ~96 px and becomes reliably solid at 256 px+, largely independent of altitude; compute scales roughly quadratically with resolution (32 px ≈ 0.01 GFLOPs/3–4 ms vs. 640 px ≈ 4 GFLOPs/35–40 ms). That's the basis for cropping to a GNSS-prior-predicted region at a 192 px floor instead of always running full 640 px frames.`,
  },

  detectorTable: {
    caption: 'Performance of trained YOLO models on the UAV–UGV dataset',
    headers: ['Model', 'mAP50-95', 'Params (M)', 'FLOPs (B)'],
    rows: [
      ['YOLOv8 nano', '79.2', '3.2', '8.7'],
      ['YOLOv8 small', '80.9', '11.2', '28.6'],
      ['YOLOv9 tiny', '80.1', '2.0', '7.7'],
      ['YOLOv9 small', '81.5', '7.2', '26.7'],
      ['YOLOv10 nano', '79.9', '2.3', '6.7'],
      ['YOLOv10 small', '81.6', '7.2', '21.6'],
      ['YOLOv11 nano', '80.5', '2.6', '6.5'],
      ['YOLOv11 small', '82.0', '9.4', '21.5'],
    ],
  },

  recoveryTable: {
    caption: 'Frame accuracy with and without Perception Recovery',
    headers: ['Model', 'Traj. 1', 'Traj. 2', 'Traj. 3'],
    rows: [
      ['YOLOv8-Nano', '66.7%', '35.2%', '85.0%'],
      ['YOLOv8-Nano-PR', '86.8%', '87.6%', '92.4%'],
      ['YOLOv9-Tiny', '63.0%', '17.8%', '91.8%'],
      ['YOLOv9-Tiny-PR', '86.8%', '68.9%', '93.6%'],
      ['YOLOv10-Nano', '77.5%', '57.6%', '72.6%'],
      ['YOLOv10-Nano-PR', '86.1%', '85.1%', '90.3%'],
      ['YOLOv11-Nano', '65.1%', '23.5%', '72.9%'],
      ['YOLOv11-Nano-PR', '81.1%', '60.1%', '93.6%'],
      ['YOLOv8-Small', '70.7%', '36.4%', '77.2%'],
      ['YOLOv8-Small-PR', '84.2%', '78.9%', '88.0%'],
      ['YOLOv9-Small', '78.8%', '16.9%', '92.3%'],
      ['YOLOv9-Small-PR', '89.1%', '80.2%', '95.6%'],
      ['YOLOv10-Small', '74.3%', '47.3%', '51.6%'],
      ['YOLOv10-Small-PR', '85.4%', '80.6%', '74.3%'],
      ['YOLOv11-Small', '64.1%', '16.4%', '90.6%'],
      ['YOLOv11-Small-PR', '78.9%', '60.1%', '93.6%'],
    ],
  },

  qa: [
    {
      q: 'Why not just use RTK GNSS instead of adding vision at all?',
      a: "RTK gets you centimeter accuracy, but the base station typically takes hours to install and calibrate, needs continuous communication with the rover, and its accuracy degrades with distance — so it's impractical to stand up fresh at every field site or in remote terrain. GNSS+vision fusion gets a meaningful chunk of that accuracy back without any of that infrastructure.",
    },
    {
      q: 'Why does a single missed detection matter so much?',
      a: "In a Kalman-style pipeline, a miss means no measurement update that frame, which inflates the covariance and — because frames are sequential, not independent — makes the next miss more likely too. Standard object-tracker mAP evaluation doesn't capture this because it scores frames independently; it's exactly the failure mode PR was built to interrupt.",
    },
    {
      q: 'How is Perception Recovery different from just running a tracker?',
      a: "Trackers help bridge occasional gaps, but their effectiveness is capped by the base detector's reliability — if the detector fails for several frames in a row, tracking alone doesn't save you. PR instead treats confidence itself as a forecastable signal and preemptively adjusts the detection threshold before the failure happens, rather than compensating after the fact.",
    },
    {
      q: 'Does adding more robots always help, or does it saturate?',
      a: "In the tested range (2–10 agents, simulation), it doesn't saturate — RMSE keeps falling and the uncertainty bound keeps tightening as agents are added, because each new pairwise vision constraint couples into the shared covariance for the whole team, not just the two robots directly involved.",
    },
    {
      q: "What's the catch with adaptive cropping?",
      a: 'It trades a small amount of the highest-altitude/farthest-distance robustness for a large compute win — detection does start to degrade at very small crop sizes when the target occupies very few pixels, which is why the 192 px floor was chosen empirically rather than pushing lower.',
    },
    {
      q: "What doesn't DLCL demonstrate yet?",
      a: 'The team-size ablation beyond three agents is simulation-only — the physical validation used exactly Alpha, Bravo, and Charlie. And the framework fuses GNSS with vision rather than replacing it outright, so fully GNSS-denied operation isn\'t shown; it assumes GNSS is at least intermittently available at baseline accuracy.',
    },
  ],

  citation: `@article{muvva2026dlcl,
  title   = {DLCL: Deep Learning-enabled Cooperative Localization for UAV-UGV
             Team with Adaptive Perception Recovery},
  author  = {Muvva, Veera Venkata Ram Murali Krishna Rao and Chawla, Yogesh and
             Joseph, Kunjan Theodore and Kalra, Ankita and Wolf, Marilyn and
             Pitla, Santosh},
  journal = {International Journal of Computer Vision},
  note    = {Under review},
  year    = {2026}
}`,

  contact: {
    corresponding: 'Krishna Muvva',
    email: 'krishna@huskers.unl.edu',
    notes: [
      'Dataset release planned via UNL library / Springer Nature upon acceptance.',
      'Code available on reasonable request (funding-constrained private repo).',
    ],
  },
};
