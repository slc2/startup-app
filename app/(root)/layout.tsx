import NavBar from "@/app/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="font-work-sans">
            <NavBar></NavBar>
            {children}
        </main>
    )
}