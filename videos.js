// Auto-synced from https://www.youtube.com/@BattleKingPC/streams
// Run "node sync-videos.js" to pull in new streams automatically.
// To feature a video, add ", featured: true" after its game (keep it to a handful).
// To change a game/category, just edit the "game" text - new values get their own filter tab.

const VIDEOS = [
  { id: "yI48cPT6Ec0", title: "PETROL STATION DISASTER | The Last Caretaker | Hindi Live Stream", game: "The Last Caretaker", featured: true },
  { id: "pId5-0oCs_I", title: "KINGDOM STORE ROBBERY | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP", featured: true },
  { id: "ZC-WXziB7qU", title: "UNREAL CONTAINER LUCK | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP", featured: true },
  { id: "EKN406npZGg", title: "NEW SECRET CONTAINERS | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP" },
  { id: "6y3nNf2IDNE", title: "BEST DEPUTIES : BIGGEST REWARDS | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "q4MLucoyY8c", title: "GRAND PRIZE EVENT | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "vYqoXZeCu5Y", title: "GRAND ARMOR DEAL | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "qizokPXmDn8", title: "KINGDOM STANDS STRONG | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "_JZ-aPrHU0U", title: "NEW PAYMENT SYSTEM | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "aOQ7x-N6aIQ", title: "HIGH RISK PAYOUT | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "9OaMYBxQvPY", title: "THE UNOFFICIAL KINGDOM | Grand RP Live Stream🔥| Hindi", game: "Grand RP" },
  { id: "TFUj8ovJWXU", title: "ULTIMATE HEIST PLANNING | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "OMAeTBbrwD0", title: "KINGDOM FAMILY : BIG REWARDS | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "u4flzGEmd3U", title: "MONEY GONE WRONG | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "DjSvkBGs41g", title: "TRYING PARKOUR RACE | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "xy2OwLxWJas", title: "REALISTIC JOB UPDATE | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "5PH7mitMNxc", title: "DOUBLE REWARDS BATTLEPASS | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "6sV0o0wGAe0", title: "ULTIMATE ROBBERY | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "8Sc3Y5uPPwo", title: "THE BOSS LADY | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "LzSeIj1HO2I", title: "ROBBERY CHAOS | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "Q9FlMyVxRzg", title: "SELLING 1000 CARS | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "3XzCLEI19SU", title: "ANANYA: THE REAL TURFER | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "9oAq6PvLVtg", title: "GRAND HOUSE UPDATE | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "O3PmMl4WMbs", title: "THE KINGDOM REFORM | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "NQUUyDpLFbI", title: "NEW CAR DELIVERY | Grand RP | Hindi Live Stream🔥", game: "Grand RP" },
  { id: "IpvD9Su73SE", title: "FAMILY BUSINESS DEAL | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP" },
  { id: "NIxLUjkW0_c", title: "GRAND RACE EVENT | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP" },
  { id: "AH7HYYC4tX4", title: "CRAFTING RARE ITEMS | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP" },
  { id: "r-OZqkUw1jk", title: "HUNT ME And GET RICH | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP" },
  { id: "Xc10Ji0qayw", title: "SECRET LOOT REVEALED | Grand RP Live Stream🔥| Hindi Multiplayer", game: "Grand RP" }
];
