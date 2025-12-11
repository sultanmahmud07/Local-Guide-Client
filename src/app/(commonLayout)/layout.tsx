import Footer from "@/components/shared/Footer";
import NavbarWrapper from "@/components/shared/Navbar/NavbarWrapper";
export const dynamic = "force-dynamic";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavbarWrapper />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayout;