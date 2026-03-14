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
}

export const tools: Tool[] = [
    {
        id: "magic-shop-generator",
        title: "Magic Shop Generator",
        header: "My Magic Shops",
        description: "Generate magic shops based on city population, wealth, and magicness.",
        status: "Alpha 1",
        icon: "Store",
        released: "new",
        philosophy: "I love to run roguelite D&D campaigns, where everything is randomly generated.",
        features: ["Population-based inventory", "Wealth and magicness scaling", "Custom world and city creation", "CSV export", "Permalink generation (Premium)", "Data persistence (Premium)"],
        integrations: ["World Generator"],
        category: "Generator",
        order: 1,
        url: "/app/magic-shop-generator",
    },
    {
        id: "spellbook-generator",
        title: "Spellbook Generator",
        header: "My Spellbooks",
        description: "Create wizard spellbooks by selecting level, schools of magic, and probability settings.",
        status: "Alpha 1",
        icon: "BookOpen",
        released: "new",
        philosophy: "One of my players was playing a wizard and was always asking about any spellbooks that they find when looting.",
        features: ["Level-based spell selection", "School of magic filtering", "Probability-based extra spells", "Wizard progression examples", "Educational tool for new players"],
        integrations: [],
        category: "Generator",
        order: 2,
        url: "/app/spellbook-generator",
    },
    {
        id: "encounter-generator",
        title: "Encounter Generator",
        header: "My Encounters",
        description: "Generate balanced encounters based on party composition, biome, and travel conditions.",
        status: "Alpha 2",
        icon: "Swords",
        released: "new",
        philosophy: "A roguelite D&D campaign is not complete without random encounters.",
        features: ["Party composition balancing", "Biome-specific encounters", "Travel condition integration", "Season and time of day effects", "Multiple encounter generation", "Environmental storytelling"],
        integrations: ["Party Management", "Battle Map Generator"],
        category: "Generator",
        order: 3,
        url: "/app/encounter-generator",
    },
    {
        id: "party-management",
        title: "Party Management",
        header: "My Parties",
        description: "Manage party composition, balance, and progress tracking.",
        status: "Alpha 2",
        icon: "Users",
        released: "new",
        philosophy: "This is only here because I wanted to be able to generate balanced encounters and to track multiple parties on the same world.",
        features: ["Party composition tracking", "Level and character management", "Balance calculations", "Circular icon customization", "World view integration", "Encounter balancing"],
        integrations: [],
        category: "Management",
        order: 4,
        url: "/app/parties",
    },
    {
        id: "battle-map-generator",
        title: "Battle Map Generator",
        header: "My Battle Maps",
        description: "Create battle maps with geographical features, weather, and customizable grid settings.",
        status: "Alpha 4",
        icon: "Map",
        philosophy: "I really enjoy making battle maps for bosses or mini-bosses.",
        features: ["Geographical feature generation", "Weather and lighting effects", "Customizable grid settings", "TV screen formatting", "Paint and stamp tools", "VTT export compatibility", "Automatic encounter mapping"],
        integrations: [],
        category: "Generator",
        order: 6,
        url: "/app/battle-map-generator",
    },
    {
        id: "region-generator",
        title: "Region Generator",
        header: "My Regions",
        description: "Generate smaller hexcrawl regions with 1-mile hexes, like islands, peninsulas, bays, inland areas, and coastal regions.",
        status: "Alpha 3",
        icon: "MapPinned",
        philosophy: "I wanted a focused tool for compact hexcrawls that sit between a single encounter map and a full world hexmap.",
        features: ["1-mile hex-scale region generation", "Terrain and biome tiling", "Settlement and POI placement with descriptions", "Local weather and tide influences for coastal regions", "Encounter hooks & short story seeds", "VTT export and CSV of hex data", "Adjustable density and scale"],
        integrations: ["Battle Map Generator", "Encounter Generator", "Party Management"],
        category: "Generator",
        order: 5,
        url: "/app/region-generator",
    },
    {
        id: "continent-generator",
        title: "Continent Generator",
        header: "My Continents",
        description: "Generate continent-scale hexcrawl maps with up to 3-mile hexes, featuring multiple regions, kingdoms, and large-scale terrain features.",
        status: "Alpha 4",
        icon: "Map",
        philosophy: "Between the focused detail of region maps and the grand scale of world maps, continents provide the perfect middle ground.",
        features: ["Up to 3-mile hex-scale continent generation", "Zoom into specific regions to view that specific map scale", "Multiple region and kingdom placement", "Large-scale terrain and biome generation", "Mountain ranges, river systems, and coastlines", "Settlement networks and trade routes", "Climate zones and weather patterns", "VTT export and CSV of hex data"],
        integrations: ["Region Generator", "Battle Map Generator", "Encounter Generator", "Party Management"],
        category: "Generator",
        order: 6,
        url: "/app/continent-generator",
    },
    {
        id: "world-generator",
        title: "World Generator",
        header: "My Worlds",
        description: "Generate complete hex worlds with up to 24-mile hexes, weather simulation, fog of war, and party tracking.",
        status: "Alpha 5",
        icon: "Globe",
        philosophy: "When I started brainstorming for this after creating the above generators, I discovered HexRoll, which is an AMAZING tool.",
        features: ["Up to 24-mile hex-based world exploration", "Zoom into specific continents and regions to view those specific map scales", "Weather simulation", "Fog of war system", "Party tracking", "2D and 3D world views", "Automatic encounter generation"],
        integrations: ["Continent Generator", "Region Generator", "Battle Map Generator", "Encounter Generator", "Magic Shop Generator", "Party Management"],
        category: "Generator",
        order: 7,
        url: "/app/world-generator",
    },
    {
        id: "star-system-generator",
        title: "Star System Generator",
        header: "My Star Systems",
        description: "Create star systems with multiple worlds, planets, and celestial bodies.",
        status: "Alpha 6",
        icon: "Star",
        philosophy: "I haven't really thought much of this one other than it'd be super cool for those Spelljammer and sci-fi campaigns.",
        features: ["Multiple planets per system", "Celestial body generation", "Orbital mechanics", "System-wide exploration"],
        integrations: ["World Generator"],
        category: "Generator",
        order: 7,
        url: "/app/star-system-generator",
    },
    {
        id: "galaxy-generator",
        title: "Galaxy Generator",
        header: "My Galaxies",
        description: "Generate entire galaxies with multiple star systems and cosmic structures.",
        status: "Alpha 7",
        icon: "Orbit",
        philosophy: "I just think it'd be super cool to make this with an awesome map that has a sort of super zoom from the galaxy to the star system to the planet to the continent to the region to the battle map / city / town / etc.",
        features: ["Multiple star systems per galaxy", "Cosmic structure generation", "Galaxy-wide exploration", "Interstellar travel mechanics"],
        integrations: ["Star System Generator"],
        category: "Generator",
        order: 8,
        url: "/app/galaxy-generator",
    },
];

export const getToolById = (id: string): Tool | undefined =>
    tools.find((tool) => tool.id === id);

export const getToolsByStatus = (status: Tool["status"]): Tool[] =>
    tools.filter((tool) => tool.status === status);

export const getToolsByCategory = (category: Tool["category"]): Tool[] =>
    tools.filter((tool) => tool.category === category);

export const getAvailableTools = (): Tool[] =>
    tools.filter((tool) => tool.status !== "TBD - A wild dream");

export const getToolsInOrder = (): Tool[] =>
    [...tools].sort((a, b) => a.order - b.order);
