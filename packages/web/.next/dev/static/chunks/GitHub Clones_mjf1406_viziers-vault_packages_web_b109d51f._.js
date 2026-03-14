(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "separator",
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
_c = Separator;
;
var _c;
__turbopack_context__.k.register(_c, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/features.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @format */ __turbopack_context__.s([
    "features",
    ()=>features
]);
const features = [
    {
        id: "customizable-settings",
        title: "Customizable Settings",
        description: "Adjust nearly everything related to generation across all tools.",
        minTier: "basic",
        tags: [
            "settings",
            "customization"
        ],
        service: true
    },
    {
        id: "data-persistence",
        title: "Data Persistence",
        description: "Keep your data safe and export it whenever you need.",
        minTier: "basic",
        tags: [
            "cloud",
            "export"
        ],
        service: false
    },
    {
        id: "permalinks",
        title: "Permalink Generation",
        description: "Create shareable links to your generated content.",
        minTier: "basic",
        tags: [
            "share"
        ],
        service: false
    },
    {
        id: "image-export",
        title: "Image Export",
        description: "Export generated maps as images.",
        minTier: "free",
        tags: [
            "export"
        ],
        service: false
    },
    {
        id: "csv-export",
        title: "CSV Export",
        description: "Export generations as CSV files.",
        minTier: "free",
        tags: [
            "export"
        ],
        service: false
    },
    {
        id: "vtt-export",
        title: "VTT Export",
        description: "Export generated maps as VTT files where possible.",
        minTier: "free",
        tags: [
            "export",
            "maps"
        ],
        service: false
    },
    {
        id: "community-support",
        title: "Community support on Discord",
        minTier: "free",
        tags: [
            "community"
        ],
        service: false
    },
    {
        id: "custom-worlds-and-cities",
        title: "Custom Worlds and Cities",
        description: "Create and customize your own worlds and cities for use in the Magic Shop Generator, World Generator, and Encounter Generator.",
        minTier: "basic",
        tags: [
            "worlds",
            "builder"
        ],
        service: false
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/plans.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @format */ __turbopack_context__.s([
    "plans",
    ()=>plans
]);
const plans = [
    {
        id: "free",
        title: "Free",
        priceMonthly: 0,
        description: "Basic access to core generators with limited features and no data persistence.",
        ctaText: "Start Using Free",
        ctaHref: "/app/account"
    },
    {
        id: "basic",
        title: "Basic",
        priceMonthly: 3,
        priceYearly: 30,
        description: "Full access to all features with data persistence and advanced capabilities.",
        ctaText: "Sign up for Basic",
        ctaHref: "/app/account",
        popular: true,
        footnote: "No credit card required"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PricingSection",
    ()=>PricingSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$features$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/features.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/plans.ts [app-client] (ecmascript)");
/** @format */ "use client";
;
;
;
;
;
;
;
const PricingSection = ()=>{
    const tierOrder = {
        free: 0,
        basic: 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pricing",
        className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg text-primary text-center mb-2 tracking-wider",
                children: "Pricing"
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl md:text-4xl text-center font-bold mb-4",
                children: "Simple, transparent pricing"
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14",
                children: "Choose the plan that fits your D&D campaign needs."
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 gap-8 lg:gap-4 max-w-4xl mx-auto",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["plans"].map((plan)=>{
                    const included = __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$features$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["features"].filter((f)=>f.minTier === plan.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: [
                            plan.popular ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1] transform-gpu transition-all" : ""
                        ].join(" "),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "flex items-center gap-2",
                                            children: plan.title
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                            lineNumber: 59,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 58,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: plan.description
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 63,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                lineNumber: 57,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    plan.id === "basic" && plan.priceYearly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl font-semibold",
                                                        children: [
                                                            "$",
                                                            plan.priceYearly
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: "/year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                lineNumber: 71,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-muted-foreground",
                                                children: [
                                                    "$",
                                                    plan.priceMonthly,
                                                    "/month"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                lineNumber: 79,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 70,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-semibold",
                                                children: [
                                                    "$",
                                                    plan.priceMonthly
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                lineNumber: 85,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-muted-foreground",
                                                children: "/month"
                                            }, void 0, false, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                lineNumber: 88,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 84,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: [
                                            tierOrder[plan.id] > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "mt-0.5 h-4 w-4 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm",
                                                        children: [
                                                            "Everything in",
                                                            " ",
                                                            Object.keys(tierOrder)[tierOrder[plan.id] - 1],
                                                            " ",
                                                            "and..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                lineNumber: 96,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            included.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "mt-0.5 h-4 w-4 text-green-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: f.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, f.id, true, {
                                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 94,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                lineNumber: 68,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                                className: "flex flex-col w-full gap-2 justify-center items-center",
                                children: [
                                    plan.id === "basic" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full",
                                        variant: "default",
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/app/account",
                                            children: plan.ctaText
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                            lineNumber: 131,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 126,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    plan.id === "free" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full",
                                        variant: "outline",
                                        children: plan.ctaText
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 137,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    plan.id !== "free" && plan.id !== "basic" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full",
                                        variant: "outline",
                                        children: plan.ctaText
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                        lineNumber: 145,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                                lineNumber: 124,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, plan.id, true, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                        lineNumber: 49,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/pricing.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PricingSection;
var _c;
__turbopack_context__.k.register(_c, "PricingSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=GitHub%20Clones_mjf1406_viziers-vault_packages_web_b109d51f._.js.map