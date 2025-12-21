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
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN", "SUPER_ADMIN"],
                },
            ],
        },
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Booking Management",
        items: [
            {
                title: "Upcoming Bookings",
                href: "/guide/dashboard/upcoming-booking",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"],
            },
            {
                title: "My Bookings",
                href: "/guide/dashboard/my-booking",
                icon: "BookOpenText", // ✅ String
                roles: ["GUIDE"],
            },
            {
                title: "Requested Bookings",
                href: "/guide/dashboard/request-booking",
                icon: "ShieldQuestionMark", // ✅ String
                roles: ["GUIDE"],
            }
        ],
    },
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
                title: "Users",
                href: "/admin/dashboard/user-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Admins",
                href: "/admin/dashboard/admin-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Make admin",
                href: "/admin/dashboard/add-admin",
                icon: "Plus", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Booking Management",
        items: [
            {
                title: "All Bookings",
                href: "/admin/dashboard/booking-management",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Pending Bookings",
                href: "/admin/dashboard/pending-booking",
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
    } ,
    {
        title: "Tour Management",
        items: [
            {
                title: "All Listings",
                href: "/admin/dashboard/all-listing",
                icon: "Calendar", // ✅ String
                badge: "3",
                roles: ["ADMIN"],
            }
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