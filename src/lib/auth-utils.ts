export type UserRole = "ADMIN" | "SUPER_ADMIN" | "GUIDE" | "TOURIST";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/registration", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/tour/booking-request", "/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
}

export const guideProtectedRoutes: RouteConfig = {
    patterns: [/^\/guide/], // Routes starting with /guide/* , /listing, /profile/*
    exact: [], // "/assistants"
}

export const touristProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/, /^\/message/], // Routes starting with /dashboard/*
    exact: [], // "/dashboard"
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
}

export const getRouteOwner = (pathname: string): "SUPER_ADMIN" | "ADMIN" | "GUIDE" | "TOURIST" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "SUPER_ADMIN";
    }
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, guideProtectedRoutes)) {
        return "GUIDE";
    }
    if (isRouteMatches(pathname, touristProtectedRoutes)) {
        return "TOURIST";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "GUIDE") {
        return "/guide/dashboard";
    }
    if (role === "TOURIST") {
        return "/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}