import { Button } from '@/components/ui/button'
import FileUpload from '@/components/FileUpload'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

export default async function Home() {
  const { userId } : { userId: string | null } = await auth()
  const isAuth = !!userId

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-4xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl='/' />
          </div>
          <div className="flex- mt-2">
            {isAuth && (<Button>Go to Chat</Button>)}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">Ask AI questions about your PDF.</p>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/signin">
                <Button>
                  Login to get started
                  <LogInIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
