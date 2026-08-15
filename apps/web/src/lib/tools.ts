/** @format */

export interface Tool {
  id: string;
  title: string;
  header: string;
  description: string;
  status:
    | "Alpha 1"
    | "Alpha 2"
    | "Alpha 3"
    | "Alpha 4"
    | "Alpha 5"
    | "Alpha 6"
    | "Alpha 7"
    | "Planned"
    | "TBD - A wild dream";
  icon: string;
  released?: "new" | "yes";
  philosophy: string;
  features: string[];
  integrations: string[];
  category: "Generator" | "Management";
  order: number;
  url: string;
  /** Generator routes are not in the app yet. Default false. */
  available?: boolean;
}

export const tools: Tool[] = [
  {
    id: "world-management",
    title: "World Management",
    header: "My Worlds",
    description:
      "Create and organize campaign worlds, cities, and settings that power your generators.",
    status: "Alpha 1",
    icon: "Earth",
    released: "new",
    philosophy:
      "Before generating anything, I needed a place to keep the worlds and cities my other tools hang off of.",
    features: [
      "Custom world and city creation",
      "Campaign setting organization",
      "Shared data across generators",
      "Premade world library",
      "Data persistence (Premium)",
    ],
    integrations: [
      "world-generator",
      "party-management",
      "magic-shop-generator",
      "encounter-generator",
    ],
    category: "Management",
    order: 1,
    url: "/app/worlds",
  },
  {
    id: "party-management",
    title: "Party Management",
    header: "My Parties",
    description: "Manage party composition, balance, and progress tracking.",
    status: "Alpha 1",
    icon: "Users",
    released: "new",
    philosophy:
      "This is only here because I wanted to be able to generate balanced encounters and to track multiple parties on the same world.",
    features: [
      "Party composition tracking",
      "Level and character management",
      "Balance calculations",
      "Circular icon customization",
      "World view integration",
      "Encounter balancing",
    ],
    integrations: ["world-management", "encounter-generator"],
    category: "Management",
    order: 2,
    url: "/app/parties",
  },
  {
    id: "world-generator",
    title: "World Generator",
    header: "My World Maps",
    description:
      "Generate complete hex worlds with up to 24-mile hexes, weather simulation, fog of war, and party tracking.",
    status: "Alpha 2",
    icon: "Globe",
    philosophy:
      "When I started brainstorming for this after creating the above generators, I discovered HexRoll, which is an AMAZING tool.",
    features: [
      "Up to 24-mile hex-based world exploration",
      "Zoom into specific continents and regions to view those specific map scales",
      "Weather simulation",
      "Fog of war system",
      "Party tracking",
      "2D and 3D world views",
      "Automatic encounter generation",
    ],
    integrations: [
      "world-management",
      "continent-generator",
      "region-generator",
      "battle-map-generator",
      "encounter-generator",
      "party-management",
    ],
    category: "Generator",
    order: 3,
    url: "/app/world-generator",
  },
  {
    id: "battle-map-generator",
    title: "Battle Map Generator",
    header: "My Battle Maps",
    description:
      "Create battle maps with geographical features, weather, and customizable grid settings.",
    status: "Alpha 3",
    icon: "Map",
    philosophy: "I really enjoy making battle maps for bosses or mini-bosses.",
    features: [
      "Geographical feature generation",
      "Weather and lighting effects",
      "Customizable grid settings",
      "TV screen formatting",
      "Paint and stamp tools",
      "VTT export compatibility",
      "Automatic encounter mapping",
    ],
    integrations: ["encounter-generator", "region-generator"],
    category: "Generator",
    order: 4,
    url: "/app/battle-map-generator",
  },
  {
    id: "region-generator",
    title: "Region Generator",
    header: "My Regions",
    description:
      "Generate smaller hexcrawl regions with 1-mile hexes, like islands, peninsulas, bays, inland areas, and coastal regions.",
    status: "Alpha 4",
    icon: "MapPinned",
    philosophy:
      "I wanted a focused tool for compact hexcrawls that sit between a single encounter map and a full world hexmap.",
    features: [
      "1-mile hex-scale region generation",
      "Terrain and biome tiling",
      "Settlement and POI placement with descriptions",
      "Local weather and tide influences for coastal regions",
      "Encounter hooks & short story seeds",
      "VTT export and CSV of hex data",
      "Adjustable density and scale",
    ],
    integrations: [
      "world-generator",
      "battle-map-generator",
      "encounter-generator",
      "party-management",
    ],
    category: "Generator",
    order: 5,
    url: "/app/region-generator",
  },
  {
    id: "continent-generator",
    title: "Continent Generator",
    header: "My Continents",
    description:
      "Generate continent-scale hexcrawl maps with up to 3-mile hexes, featuring multiple regions, kingdoms, and large-scale terrain features.",
    status: "Alpha 4",
    icon: "Map",
    philosophy:
      "Between the focused detail of region maps and the grand scale of world maps, continents provide the perfect middle ground.",
    features: [
      "Up to 3-mile hex-scale continent generation",
      "Zoom into specific regions to view that specific map scale",
      "Multiple region and kingdom placement",
      "Large-scale terrain and biome generation",
      "Mountain ranges, river systems, and coastlines",
      "Settlement networks and trade routes",
      "Climate zones and weather patterns",
      "VTT export and CSV of hex data",
    ],
    integrations: [
      "world-generator",
      "region-generator",
      "battle-map-generator",
      "encounter-generator",
      "party-management",
    ],
    category: "Generator",
    order: 6,
    url: "/app/continent-generator",
  },
  {
    id: "encounter-generator",
    title: "Encounter Generator",
    header: "My Encounters",
    description:
      "Generate balanced encounters based on party composition, biome, and travel conditions.",
    status: "Alpha 5",
    icon: "Swords",
    philosophy: "A roguelite D&D campaign is not complete without random encounters.",
    features: [
      "Party composition balancing",
      "Biome-specific encounters",
      "Travel condition integration",
      "Season and time of day effects",
      "Multiple encounter generation",
      "Environmental storytelling",
    ],
    integrations: ["party-management", "battle-map-generator", "world-management"],
    category: "Generator",
    order: 7,
    url: "/app/encounter-generator",
  },
  {
    id: "magic-shop-generator",
    title: "Magic Shop Generator",
    header: "My Magic Shops",
    description: "Generate magic shops based on city population, wealth, and magicness.",
    status: "Alpha 6",
    icon: "Store",
    philosophy: "I love to run roguelite D&D campaigns, where everything is randomly generated.",
    features: [
      "Population-based inventory",
      "Wealth and magicness scaling",
      "Custom world and city creation",
      "CSV export",
      "Permalink generation (Premium)",
      "Data persistence (Premium)",
    ],
    integrations: ["world-management", "world-generator"],
    category: "Generator",
    order: 8,
    url: "/app/magic-shop-generator",
  },
  {
    id: "spellbook-generator",
    title: "Spellbook Generator",
    header: "My Spellbooks",
    description:
      "Create wizard spellbooks by selecting level, schools of magic, and probability settings.",
    status: "Alpha 6",
    icon: "BookOpen",
    philosophy:
      "One of my players was playing a wizard and was always asking about any spellbooks that they find when looting.",
    features: [
      "Level-based spell selection",
      "School of magic filtering",
      "Probability-based extra spells",
      "Wizard progression examples",
      "Educational tool for new players",
    ],
    integrations: [],
    category: "Generator",
    order: 9,
    url: "/app/spellbook-generator",
  },
  {
    id: "star-system-generator",
    title: "Star System Generator",
    header: "My Star Systems",
    description: "Create star systems with multiple worlds, planets, and celestial bodies.",
    status: "Alpha 7",
    icon: "Star",
    philosophy:
      "I haven't really thought much of this one other than it'd be super cool for those Spelljammer and sci-fi campaigns.",
    features: [
      "Multiple planets per system",
      "Celestial body generation",
      "Orbital mechanics",
      "System-wide exploration",
    ],
    integrations: ["world-generator", "galaxy-generator"],
    category: "Generator",
    order: 10,
    url: "/app/star-system-generator",
  },
  {
    id: "galaxy-generator",
    title: "Galaxy Generator",
    header: "My Galaxies",
    description: "Generate entire galaxies with multiple star systems and cosmic structures.",
    status: "TBD - A wild dream",
    icon: "Orbit",
    philosophy:
      "I just think it'd be super cool to make this with an awesome map that has a sort of super zoom from the galaxy to the star system to the planet to the continent to the region to the battle map / city / town / etc.",
    features: [
      "Multiple star systems per galaxy",
      "Cosmic structure generation",
      "Galaxy-wide exploration",
      "Interstellar travel mechanics",
    ],
    integrations: ["star-system-generator"],
    category: "Generator",
    order: 11,
    url: "/app/galaxy-generator",
  },
];

export const getToolById = (id: string): Tool | undefined => tools.find((tool) => tool.id === id);

export const getToolsByStatus = (status: Tool["status"]): Tool[] =>
  tools.filter((tool) => tool.status === status);

export const getToolsByCategory = (category: Tool["category"]): Tool[] =>
  tools.filter((tool) => tool.category === category);

export const isToolAvailable = (tool: Tool): boolean => tool.available === true;

export const getAvailableTools = (): Tool[] =>
  tools.filter((tool) => tool.status !== "TBD - A wild dream");

export const getToolsInOrder = (): Tool[] => [...tools].sort((a, b) => a.order - b.order);

type ToolTitleKey =
  | "worldManagementTitle"
  | "magicShopTitle"
  | "spellbookTitle"
  | "encounterTitle"
  | "partyTitle"
  | "battleMapTitle"
  | "regionTitle"
  | "continentTitle"
  | "worldTitle"
  | "starSystemTitle"
  | "galaxyTitle";

type ToolDescriptionKey =
  | "worldManagementDescription"
  | "magicShopDescription"
  | "spellbookDescription"
  | "encounterDescription"
  | "partyDescription"
  | "battleMapDescription"
  | "regionDescription"
  | "continentDescription"
  | "worldDescription"
  | "starSystemDescription"
  | "galaxyDescription";

type ToolPhilosophyKey =
  | "worldManagementPhilosophy"
  | "magicShopPhilosophy"
  | "spellbookPhilosophy"
  | "encounterPhilosophy"
  | "partyPhilosophy"
  | "battleMapPhilosophy"
  | "regionPhilosophy"
  | "continentPhilosophy"
  | "worldPhilosophy"
  | "starSystemPhilosophy"
  | "galaxyPhilosophy";

export const TOOL_TITLE_KEYS: Record<string, ToolTitleKey> = {
  "world-management": "worldManagementTitle",
  "magic-shop-generator": "magicShopTitle",
  "spellbook-generator": "spellbookTitle",
  "encounter-generator": "encounterTitle",
  "party-management": "partyTitle",
  "battle-map-generator": "battleMapTitle",
  "region-generator": "regionTitle",
  "continent-generator": "continentTitle",
  "world-generator": "worldTitle",
  "star-system-generator": "starSystemTitle",
  "galaxy-generator": "galaxyTitle",
};

export const TOOL_DESCRIPTION_KEYS: Record<string, ToolDescriptionKey> = {
  "world-management": "worldManagementDescription",
  "magic-shop-generator": "magicShopDescription",
  "spellbook-generator": "spellbookDescription",
  "encounter-generator": "encounterDescription",
  "party-management": "partyDescription",
  "battle-map-generator": "battleMapDescription",
  "region-generator": "regionDescription",
  "continent-generator": "continentDescription",
  "world-generator": "worldDescription",
  "star-system-generator": "starSystemDescription",
  "galaxy-generator": "galaxyDescription",
};

export const TOOL_PHILOSOPHY_KEYS: Record<string, ToolPhilosophyKey> = {
  "world-management": "worldManagementPhilosophy",
  "magic-shop-generator": "magicShopPhilosophy",
  "spellbook-generator": "spellbookPhilosophy",
  "encounter-generator": "encounterPhilosophy",
  "party-management": "partyPhilosophy",
  "battle-map-generator": "battleMapPhilosophy",
  "region-generator": "regionPhilosophy",
  "continent-generator": "continentPhilosophy",
  "world-generator": "worldPhilosophy",
  "star-system-generator": "starSystemPhilosophy",
  "galaxy-generator": "galaxyPhilosophy",
};

export const TOOL_STATUS_KEYS: Record<
  Tool["status"],
  | "statusAlpha1"
  | "statusAlpha2"
  | "statusAlpha3"
  | "statusAlpha4"
  | "statusAlpha5"
  | "statusAlpha6"
  | "statusAlpha7"
  | "statusPlanned"
  | "statusDream"
> = {
  "Alpha 1": "statusAlpha1",
  "Alpha 2": "statusAlpha2",
  "Alpha 3": "statusAlpha3",
  "Alpha 4": "statusAlpha4",
  "Alpha 5": "statusAlpha5",
  "Alpha 6": "statusAlpha6",
  "Alpha 7": "statusAlpha7",
  Planned: "statusPlanned",
  "TBD - A wild dream": "statusDream",
};
