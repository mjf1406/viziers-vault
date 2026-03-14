module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/button.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
}
;
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
CardFooter.displayName = "CardFooter";
;
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/icon.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/node_modules/lucide-react/dist/esm/icons/index.js [app-rsc] (ecmascript) <export * as icons>");
;
;
const Icon = ({ name, color, size, className })=>{
    const LucideIcon = __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"][name] ?? __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"].Circle;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(LucideIcon, {
        color: color,
        size: size,
        className: className
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/icon.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BenefitsSection",
    ()=>BenefitsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ /* components/BenefitsSection.tsx */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$icon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/icon.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
const BenefitsSection = ()=>{
    const benefits = [
        {
            id: "save-prep-time",
            title: "Save Hours of Prep",
            description: "Spin up encounters, loot, and maps in minutes so you can spend " + "more time on story and play.",
            icon: "Clock"
        },
        {
            id: "balanced-content",
            title: "Balanced, Ready-to-Run Content",
            description: "Auto-tuned difficulty and scalable recommendations reduce " + "guesswork and keep sessions flowing.",
            icon: "Scale"
        },
        {
            id: "seamless-ux",
            title: "Frictionless Session Flow",
            description: "Fast, clean UI and smart defaults minimize clicks and context " + "switching during the game.",
            icon: "Sparkles"
        },
        {
            id: "share-and-reuse",
            title: "Share and Reuse Easily",
            description: "One-click links and exports let you hand off content to players " + "or reuse across campaigns.",
            icon: "Share2"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "benefits",
        className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-2 place-items-center lg:gap-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg text-primary mb-2 tracking-wider",
                                children: "Benefits"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-bold mb-4",
                                children: "Streamline Your D&D Campaign"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-muted-foreground mb-8",
                                children: "Focus on storytelling and player engagement while our tools handle the mechanical aspects of preparation and play."
                            }, void 0, false, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid lg:grid-cols-2 gap-4 w-full",
                        children: benefits.map((b, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                className: "bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    b.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$icon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Icon"], {
                                                        name: b.icon,
                                                        size: 32,
                                                        color: "var(--primary)",
                                                        className: "mb-6 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30",
                                                        children: [
                                                            "0",
                                                            index + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                                lineNumber: 81,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                children: b.title
                                            }, void 0, false, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                                lineNumber: 97,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                        lineNumber: 80,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "text-muted-foreground",
                                        children: b.description
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                        lineNumber: 100,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, b.id, true, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full mx-auto flex justify-center mt-10 space-x-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/app/account",
                            children: "Sign up now"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/app/dashboard",
                            children: "Go to the app"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                            lineNumber: 116,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/badge.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
;
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/features.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturesSection",
    ()=>FeaturesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ /* components/ServicesSection.tsx */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$features$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/features.ts [app-rsc] (ecmascript)");
;
;
;
;
const serviceCardFeatureIds = [
    "customizable-settings",
    "permalinks",
    "image-export",
    "vtt-export",
    "csv-export",
    "custom-worlds-and-cities"
];
const FeaturesSection = ()=>{
    const cards = serviceCardFeatureIds.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$features$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["features"].find((f)=>f.id === id)).filter((f)=>Boolean(f));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "services",
        className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg text-primary text-center mb-2 tracking-wider",
                children: "Features"
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl md:text-4xl text-center font-bold mb-4",
                children: "Vizier's Vault Capabilities"
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8",
                children: "Features designed to streamline your D&D campaign preparation and management."
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto",
                children: cards.map((f)=>{
                    const isPremiumOrHigher = f.minTier !== "free";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-muted/60 dark:bg-card h-full relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: f.title
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                                        lineNumber: 53,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: f.description
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                                        lineNumber: 54,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                                lineNumber: 52,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                "data-pro": f.minTier,
                                variant: "secondary",
                                className: "absolute -top-2 -right-3 data-[pro=false]:hidden",
                                children: f.minTier.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                                lineNumber: 59,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, f.id, true, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                        lineNumber: 48,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Separator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Separator() from the server but Separator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx <module evaluation>", "Separator");
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Separator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Separator() from the server but Separator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx", "Separator");
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/tools.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @format */ __turbopack_context__.s([
    "getAvailableTools",
    ()=>getAvailableTools,
    "getToolById",
    ()=>getToolById,
    "getToolsByCategory",
    ()=>getToolsByCategory,
    "getToolsByStatus",
    ()=>getToolsByStatus,
    "getToolsInOrder",
    ()=>getToolsInOrder,
    "tools",
    ()=>tools
]);
const tools = [
    {
        id: "magic-shop-generator",
        title: "Magic Shop Generator",
        header: "My Magic Shops",
        description: "Generate magic shops based on city population, wealth, and magicness.",
        status: "Alpha 1",
        icon: "Store",
        released: "new",
        philosophy: "I love to run roguelite D&D campaigns, where everything is randomly generated.",
        features: [
            "Population-based inventory",
            "Wealth and magicness scaling",
            "Custom world and city creation",
            "CSV export",
            "Permalink generation (Premium)",
            "Data persistence (Premium)"
        ],
        integrations: [
            "World Generator"
        ],
        category: "Generator",
        order: 1,
        url: "/app/magic-shop-generator"
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
        features: [
            "Level-based spell selection",
            "School of magic filtering",
            "Probability-based extra spells",
            "Wizard progression examples",
            "Educational tool for new players"
        ],
        integrations: [],
        category: "Generator",
        order: 2,
        url: "/app/spellbook-generator"
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
        features: [
            "Party composition balancing",
            "Biome-specific encounters",
            "Travel condition integration",
            "Season and time of day effects",
            "Multiple encounter generation",
            "Environmental storytelling"
        ],
        integrations: [
            "Party Management",
            "Battle Map Generator"
        ],
        category: "Generator",
        order: 3,
        url: "/app/encounter-generator"
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
        features: [
            "Party composition tracking",
            "Level and character management",
            "Balance calculations",
            "Circular icon customization",
            "World view integration",
            "Encounter balancing"
        ],
        integrations: [],
        category: "Management",
        order: 4,
        url: "/app/parties"
    },
    {
        id: "battle-map-generator",
        title: "Battle Map Generator",
        header: "My Battle Maps",
        description: "Create battle maps with geographical features, weather, and customizable grid settings.",
        status: "Alpha 4",
        icon: "Map",
        philosophy: "I really enjoy making battle maps for bosses or mini-bosses.",
        features: [
            "Geographical feature generation",
            "Weather and lighting effects",
            "Customizable grid settings",
            "TV screen formatting",
            "Paint and stamp tools",
            "VTT export compatibility",
            "Automatic encounter mapping"
        ],
        integrations: [],
        category: "Generator",
        order: 6,
        url: "/app/battle-map-generator"
    },
    {
        id: "region-generator",
        title: "Region Generator",
        header: "My Regions",
        description: "Generate smaller hexcrawl regions with 1-mile hexes, like islands, peninsulas, bays, inland areas, and coastal regions.",
        status: "Alpha 3",
        icon: "MapPinned",
        philosophy: "I wanted a focused tool for compact hexcrawls that sit between a single encounter map and a full world hexmap.",
        features: [
            "1-mile hex-scale region generation",
            "Terrain and biome tiling",
            "Settlement and POI placement with descriptions",
            "Local weather and tide influences for coastal regions",
            "Encounter hooks & short story seeds",
            "VTT export and CSV of hex data",
            "Adjustable density and scale"
        ],
        integrations: [
            "Battle Map Generator",
            "Encounter Generator",
            "Party Management"
        ],
        category: "Generator",
        order: 5,
        url: "/app/region-generator"
    },
    {
        id: "continent-generator",
        title: "Continent Generator",
        header: "My Continents",
        description: "Generate continent-scale hexcrawl maps with up to 3-mile hexes, featuring multiple regions, kingdoms, and large-scale terrain features.",
        status: "Alpha 4",
        icon: "Map",
        philosophy: "Between the focused detail of region maps and the grand scale of world maps, continents provide the perfect middle ground.",
        features: [
            "Up to 3-mile hex-scale continent generation",
            "Zoom into specific regions to view that specific map scale",
            "Multiple region and kingdom placement",
            "Large-scale terrain and biome generation",
            "Mountain ranges, river systems, and coastlines",
            "Settlement networks and trade routes",
            "Climate zones and weather patterns",
            "VTT export and CSV of hex data"
        ],
        integrations: [
            "Region Generator",
            "Battle Map Generator",
            "Encounter Generator",
            "Party Management"
        ],
        category: "Generator",
        order: 6,
        url: "/app/continent-generator"
    },
    {
        id: "world-generator",
        title: "World Generator",
        header: "My Worlds",
        description: "Generate complete hex worlds with up to 24-mile hexes, weather simulation, fog of war, and party tracking.",
        status: "Alpha 5",
        icon: "Globe",
        philosophy: "When I started brainstorming for this after creating the above generators, I discovered HexRoll, which is an AMAZING tool.",
        features: [
            "Up to 24-mile hex-based world exploration",
            "Zoom into specific continents and regions to view those specific map scales",
            "Weather simulation",
            "Fog of war system",
            "Party tracking",
            "2D and 3D world views",
            "Automatic encounter generation"
        ],
        integrations: [
            "Continent Generator",
            "Region Generator",
            "Battle Map Generator",
            "Encounter Generator",
            "Magic Shop Generator",
            "Party Management"
        ],
        category: "Generator",
        order: 7,
        url: "/app/world-generator"
    },
    {
        id: "star-system-generator",
        title: "Star System Generator",
        header: "My Star Systems",
        description: "Create star systems with multiple worlds, planets, and celestial bodies.",
        status: "Alpha 6",
        icon: "Star",
        philosophy: "I haven't really thought much of this one other than it'd be super cool for those Spelljammer and sci-fi campaigns.",
        features: [
            "Multiple planets per system",
            "Celestial body generation",
            "Orbital mechanics",
            "System-wide exploration"
        ],
        integrations: [
            "World Generator"
        ],
        category: "Generator",
        order: 7,
        url: "/app/star-system-generator"
    },
    {
        id: "galaxy-generator",
        title: "Galaxy Generator",
        header: "My Galaxies",
        description: "Generate entire galaxies with multiple star systems and cosmic structures.",
        status: "Alpha 7",
        icon: "Orbit",
        philosophy: "I just think it'd be super cool to make this with an awesome map that has a sort of super zoom from the galaxy to the star system to the planet to the continent to the region to the battle map / city / town / etc.",
        features: [
            "Multiple star systems per galaxy",
            "Cosmic structure generation",
            "Galaxy-wide exploration",
            "Interstellar travel mechanics"
        ],
        integrations: [
            "Star System Generator"
        ],
        category: "Generator",
        order: 8,
        url: "/app/galaxy-generator"
    }
];
const getToolById = (id)=>tools.find((tool)=>tool.id === id);
const getToolsByStatus = (status)=>tools.filter((tool)=>tool.status === status);
const getToolsByCategory = (category)=>tools.filter((tool)=>tool.category === category);
const getAvailableTools = ()=>tools.filter((tool)=>tool.status !== "TBD - A wild dream");
const getToolsInOrder = ()=>[
        ...tools
    ].sort((a, b)=>a.order - b.order);
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/logo.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogoTextOnly",
    ()=>LogoTextOnly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
function LogoTextOnly(_props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: "/",
        className: "text-lg font-bold text-primary hover:text-primary/80 transition-colors",
        children: "Vizier's Vault"
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/logo.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Discord",
    ()=>Discord,
    "DiscordIcon",
    ()=>DiscordIcon,
    "JoinTheDiscord",
    ()=>JoinTheDiscord
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandDiscord$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandDiscord$3e$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/@tabler/icons-react/dist/esm/icons/IconBrandDiscord.mjs [app-rsc] (ecmascript) <export default as IconBrandDiscord>");
;
;
;
;
const discordURL = "#";
function JoinTheDiscord() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
        asChild: true,
        variant: "outline",
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            href: discordURL,
            rel: "noopener noreferrer",
            target: "_blank",
            prefetch: false,
            children: "Join the Discord"
        }, void 0, false, {
            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx",
            lineNumber: 12,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
function DiscordIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
        variant: "ghost",
        asChild: true,
        size: "icon",
        className: "hidden sm:flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            href: discordURL,
            rel: "noopener noreferrer",
            target: "_blank",
            prefetch: false,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandDiscord$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandDiscord$3e$__["IconBrandDiscord"], {}, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx",
                lineNumber: 23,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
function Discord() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: discordURL,
        rel: "noopener noreferrer",
        target: "_blank",
        prefetch: false,
        children: "Join the Discord"
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterSection",
    ()=>FooterSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/separator.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$tools$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/tools.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$brand$2f$logo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/logo.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$brand$2f$discord$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/brand/discord.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const FooterSection = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        id: "footer",
        className: "w-full px-4 xl:px-10 mx-auto pt-24 sm:pt-32 pb-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-10 bg-card border border-secondary rounded-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-full xl:col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$brand$2f$logo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LogoTextOnly"], {}, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 18,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground mt-2",
                                    children: "D&D 5e content generators for game masters and players."
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 19,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 17,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "Tools"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 26,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$tools$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAvailableTools"])().map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: tool.url,
                                            prefetch: false,
                                            className: "opacity-60 hover:opacity-100",
                                            children: tool.title
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                            lineNumber: 29,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, tool.id, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 28,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 25,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "Resources"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 41,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 43,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 42,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/docs",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Docs"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 54,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 53,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/blog",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Blog"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 65,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "Support"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 78,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/web/contact",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Contact Us"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 80,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 79,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/web/faq",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "FAQ"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 90,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 89,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/web/contact",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Feedback"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 99,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "Community"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "https://github.com/mjf1406/viziers-vault-app",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "GitHub"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 113,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 112,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$brand$2f$discord$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Discord"], {}, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 125,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "#",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Reddit"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 129,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 128,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "Legal"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 140,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/web/privacy-policy",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Privacy Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 142,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 141,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/web/terms-of-service",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Terms of Service"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 152,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/web/cookie-policy",
                                        prefetch: false,
                                        className: "opacity-60 hover:opacity-100",
                                        children: "Cookie Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 161,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 139,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                    lineNumber: 16,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Separator"], {
                    className: "my-8"
                }, void 0, false, {
                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                    lineNumber: 173,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-between items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: "© 2024 Vizier's Vault. Built for the TTRPG community."
                        }, void 0, false, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 176,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://shadcn-landing-page-livid.vercel.app/",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    prefetch: false,
                                    className: "opacity-60 hover:opacity-100",
                                    children: "Landing Page Template"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 182,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/web/privacy-policy",
                                    prefetch: false,
                                    className: "opacity-60 hover:opacity-100",
                                    children: "Privacy Policy"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 191,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/web/terms-of-service",
                                    prefetch: false,
                                    className: "opacity-60 hover:opacity-100",
                                    children: "Terms of Service"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                                    lineNumber: 198,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                            lineNumber: 181,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
                    lineNumber: 175,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
            lineNumber: 15,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroSection() from the server but HeroSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx <module evaluation>", "HeroSection");
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroSection() from the server but HeroSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx", "HeroSection");
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolsSection",
    ()=>ToolsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$icon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/components/ui/icon.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$tools$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/lib/tools.ts [app-rsc] (ecmascript)");
;
;
;
;
const ToolsSection = ()=>{
    const tools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$lib$2f$tools$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getToolsInOrder"])();
    // Build a lookup by title so we can link integrations to their tool url
    const toolsByTitle = Object.fromEntries(tools.map((t)=>[
            t.title,
            t
        ]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "features",
        className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg text-primary text-center mb-2 tracking-wider",
                children: "Tools"
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl md:text-4xl text-center font-bold mb-4",
                children: "D&D 5e Content Generators"
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8",
                children: "Tools for game masters to generate various things in their D&D 5e 2024 campaigns and then to share with their players."
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: tools.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            className: "h-full border-0 shadow-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "flex justify-center items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$icon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Icon"], {
                                                name: tool.icon,
                                                size: 24,
                                                color: "var(--primary)",
                                                className: "text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                                lineNumber: 40,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                            lineNumber: 39,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    children: tool.title
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                                    lineNumber: 49,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-primary font-medium",
                                                    children: tool.status
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                            lineNumber: 48,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                    lineNumber: 38,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "text-muted-foreground text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-3",
                                            children: tool.description
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                            lineNumber: 57,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        tool.integrations?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap justify-center gap-2",
                                                children: tool.integrations.map((intName)=>{
                                                    const integrated = toolsByTitle[intName];
                                                    return integrated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: integrated.url,
                                                        className: "inline-block   text-xs px-2 py-1   rounded-full   bg-muted text-muted-foreground   hover:underline",
                                                        children: intName
                                                    }, intName, false, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-block   text-xs px-2 py-1   rounded-full   bg-muted text-muted-foreground",
                                                        children: intName
                                                    }, intName, false, {
                                                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                                lineNumber: 61,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                            lineNumber: 60,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                                    lineNumber: 56,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                            lineNumber: 37,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, tool.id, false, {
                        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                        lineNumber: 36,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/** @format */ var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$benefits$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/benefits.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$features$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/features.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/footer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/hero.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$tools$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/_components/layout/sections/tools.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const metadata = {
    title: "Vizier's Vault - D&D 5e Tools",
    description: "Generate magic shops, encounters, spellbooks, battle maps, and worlds for D&D 5e 2024"
};
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HeroSection"], {}, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$tools$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ToolsSection"], {}, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$features$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FeaturesSection"], {}, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$benefits$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BenefitsSection"], {}, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Clones$2f$mjf1406$2f$viziers$2d$vault$2f$packages$2f$web$2f$app$2f28$home$292f$_components$2f$layout$2f$sections$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FooterSection"], {}, void 0, false, {
                fileName: "[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/GitHub Clones/mjf1406/viziers-vault/packages/web/app/(home)/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18d3007e._.js.map