""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TOURIST", "GUIDE", "ADMIN", "SUPER_ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN", "SUPER_ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["TOURIST"],
                },
            ],
        },
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "My Listing",
                href: "/guide/dashboard/my-listing",
                icon: "Calendar", // ✅ String
                badge: "3",
                roles: ["GUIDE"],
            },
            {
                title: "My Bookings",
                href: "/guide/dashboard/my-booking",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"],
            },
            {
                title: "Create Tour",
                href: "/guide/dashboard/add-listing",
                icon: "FileText", // ✅ String
                roles: ["GUIDE"],
            },
        ],
    }
]

export const touristNavItems: NavSection[] = [
    {
        title: "Booking",
        items: [
            {
                title: "My Booking",
                href: "/dashboard/my-booking",
                icon: "Calendar", // ✅ String
                roles: ["TOURIST"],
            },
            {
                title: "Explore Tours",
                href: "/explore",
                icon: "ClipboardList", // ✅ String
                roles: ["TOURIST"],
            },
        ],
    }

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "Stethoscope", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Tourist",
                href: "/admin/dashboard/patients-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Listing Management",
        items: [
            {
                title: "Bookings",
                href: "/admin/dashboard/booking-management",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Payment",
                href: "/admin/dashboard/payment-management",
                icon: "Hospital", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "SUPER_ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
}