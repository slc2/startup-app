import Link from 'next/link'
import Image from 'next/image'
import {auth, signIn, signOut} from '@/auth'

// this is a server rendered component so we can make it async
const NavBar = async () => {
    const session = await auth()
    return (
        <header className="px-5 py-3 bg-white shadow-dm font-work-sans">
            <nav className="flex items-center justify-between">
            <Link href="/">
                <Image src="/logo.png" alt="logo"
                width={50} height={50} />
            </Link>
            <div className="flex items-center gap-5 text-black">
                {(session && session?.user) ? (
                    <>
                        <Link href="/startup/create">
                            <span>Create</span>
                        </Link>
                        <form action={
                            async () => {
                                "use server";
                                await signOut({redirectTo: "/", redirect: true})
                            }
                        }>
                            <button type={"submit"}>
                                Logout
                            </button>
                        </form>
                        <Link href={`/user/${session?.user?.id}`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                    </>
                ) : (
                    <>
                    <form action={async () => {
                        "use server";
                        await signIn("github")
                    }} >
                        <button type={"submit"}>
                            Login
                        </button>
                    </form>
                    </>
                )}
            </div>
            </nav>
        </header>
    )
}

export default NavBar;